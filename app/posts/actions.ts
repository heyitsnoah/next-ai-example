'use server'

import { OpenAIResponse } from '@/types/posts'
import { openai } from '@/utils/ai'
import prismaClient from '@/utils/prisma'
const prisma = prismaClient()
export async function createPost(title: string) {
  console.log('Creating post with title:', title)
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'You will be given a title for a blog post. Please return a post of no more than 500 words in plain text (not markdown). Return the post in the following JSON format: {body: string}',
      },
      {
        role: 'user',
        content: `Title: ${title}`,
      },
    ],
    response_format: { type: 'json_object' },
  })
  if (!response || !response.choices[0].message.content) {
    return null
  }
  let generatedPost
  try {
    generatedPost = OpenAIResponse.parse(
      JSON.parse(response.choices[0].message.content),
    )
  } catch (error) {
    console.error(error)
    return null
  }
  const post = await prisma.post.create({
    data: {
      title: title,
      content: generatedPost.body,
    },
  })
  return post
}
