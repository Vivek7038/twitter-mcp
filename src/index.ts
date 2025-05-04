#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ListToolsRequestSchema, CallToolRequestSchema, Tool, ErrorCode, McpError, TextContent } from '@modelcontextprotocol/sdk/types.js';
import { TwitterClient } from './twitter-api.js';
import { PostTweetSchema } from './types.js';
import dotenv from 'dotenv';

dotenv.config();

interface TwitterConfig {
  apiKey: string;
  apiSecretKey: string;
  accessToken: string;
  accessTokenSecret: string;
}

const config: TwitterConfig = {
  apiKey: process.env.API_KEY!,
  apiSecretKey: process.env.API_SECRET_KEY!,
  accessToken: process.env.ACCESS_TOKEN!,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!
};

const server = new Server({
  name: 'twitter-mcp',
  version:"0.1.0"
}, {
  capabilities: { tools: {} }
});

const client = new TwitterClient(config);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'post_tweet',
      description: 'Post a new tweet to Twitter',
      inputSchema: {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            description: 'The content of your tweet',
            maxLength: 280
          }
        },
        required: ['text']
      }
    } as Tool
  ]
}));

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  if (name !== 'post_tweet') {
    throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
  }

  const result = PostTweetSchema.safeParse(args);
  if (!result.success) {
    throw new McpError(ErrorCode.InvalidParams, `Invalid parameters: ${result.error.message}`);
  }

  try {
    const tweet = await client.postTweet(result.data.text);
    return {
      content: [{
        type: 'text',
        text: `Tweet posted successfully! URL: https://twitter.com/status/${tweet.id}`
      }] as TextContent[]
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [{
        type: 'text',
        text: `Twitter API error: ${errorMessage}`,
        isError: true
      }] as TextContent[]
    };
  }
});

// Error handling
server.onerror = (error) => {
  console.error('[MCP Error]:', error);
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.error('Shutting down server...');
  await server.close();
  process.exit(0);
});

// Start the server
const start = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Twitter MCP server running on stdio');
};

start().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
