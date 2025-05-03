import { z } from 'zod';

export const PostTweetSchema = z.object({
  text: z.string().max(280).describe('The content of your tweet')
});
