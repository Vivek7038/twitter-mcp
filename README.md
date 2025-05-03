# Twitter MCP Server

A simple Model Context Protocol (MCP) server for posting tweets via the Twitter/X API.

## Features

Currently supports:
- Tweet posting tool

## Prerequisites

- Node.js (latest LTS version recommended)
- npm (comes with Node.js)
- Twitter/X Developer Account with API access

## Setup

A reference blog 
https://medium.com/@nathaly12toledo/steps-to-create-a-single-tweet-with-a-free-account-and-the-twitter-api-via-postman-bc3ac8a2fd3e

### 1. Get Twitter/X API Keys

1. Go to [Twitter Developer Portal](https://developer.x.com/en/portal/projects)
2. Sign in with your Twitter/X account
3. Create a new project or select an existing one
4. Generate the following keys:
   - API Key (Consumer Key)
   - API Secret (Consumer Secret)
   - Access Token
   - Access Token Secret

### 2. Configure Environment Variables

1. Copy the example environment file:
   ```
   cp .env.example .env
   ```
2. Open the `.env` file and add your Twitter API credentials:
   ```
   API_KEY=your_api_key
   API_SECRET_KEY=your_api_secret
   ACCESS_TOKEN=your_access_token
   ACCESS_TOKEN_SECRET=your_access_token_secret
   ```

### 3. Install Dependencies

```
npm install
```

### 4. Build the Project

```
npm run build
```

## Running the Server

### Standard Mode

```
npm start
```

### Inspect Mode

To run the MCP server in inspect mode (allows detailed monitoring and debugging):

```
npm run inspect
```

After running this command, open the URL displayed in your terminal to access the MCP Inspector interface.

## Development

- Source code is located in the `src` directory
- Built JavaScript files are output to the `dist` directory

## License

ISC

## Contributing

Feel free to submit issues or pull requests if you'd like to contribute to this project.
