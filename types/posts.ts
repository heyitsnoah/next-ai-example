import { z } from 'zod'

export const OpenAIResponse = z.object({
  body: z.string(),
})
