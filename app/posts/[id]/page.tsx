import prismaClient from '@/utils/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const prisma = prismaClient()
export default async function Page({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      Author: true,
    },
  })
  if (!post) notFound()

  return (
    <>
      <div className="prose">
        <h1>{post.title}</h1>
        {post.Author && (
          <p>
            By{' '}
            <Link href={`/authors/${post.Author.id}`}> {post.Author.name}</Link>
          </p>
        )}
        <p className="whitespace-pre-line">{post.content}</p>
      </div>
    </>
  )
}
