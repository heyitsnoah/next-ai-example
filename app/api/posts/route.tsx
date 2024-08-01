import { OpenAIResponse } from '@/types/posts'
import { openai } from '@/utils/ai'
import prismaClient from '@/utils/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
const prisma = prismaClient()
const PostSchema = z.object({
  title: z.string(),
})

export async function POST(req: NextRequest, res: NextResponse) {
  let body
  try {
    body = PostSchema.parse(await req.json())
  } catch (error) {
    console.error(error)
    return new Response('Invalid request body', { status: 400 })
  }
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
        content: `Title: ${body.title}`,
      },
    ],
    response_format: { type: 'json_object' },
  })
  if (!response || !response.choices[0].message.content) {
    return new Response('Failed to generate post', { status: 500 })
  }
  let generatedPost
  try {
    generatedPost = OpenAIResponse.parse(
      JSON.parse(response.choices[0].message.content),
    )
  } catch (error) {
    console.error(error)
    return new Response('Failed to generate post', { status: 500 })
  }
  await prisma.post.create({
    data: {
      title: body.title,
      content: generatedPost.body,
    },
  })
  return new Response('ok', { status: 200 })
}
