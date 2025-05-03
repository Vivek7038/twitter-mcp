import { TwitterApi } from 'twitter-api-v2';

export class TwitterClient {
  private client: TwitterApi;

  constructor(config: { apiKey: string; apiSecretKey: string; accessToken: string; accessTokenSecret: string }) {
    this.client = new TwitterApi({
      appKey: config.apiKey,
      appSecret: config.apiSecretKey,
      accessToken: config.accessToken,
      accessSecret: config.accessTokenSecret,
    });
  }

  async postTweet(text: string) {
    try {
      const tweet = await this.client.v2.tweet(text);
      return tweet.data;
    } catch (error) {
      console.error('Error posting tweet:', error);
      throw error;
    }
  }
}
