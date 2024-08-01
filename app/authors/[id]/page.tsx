import prismaClient from '@/utils/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const prisma = prismaClient()
export default async function Page({ params }: { params: { id: string } }) {
  const author = await prisma.author.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      posts: true,
    },
  })
  if (!author) notFound()
  return (
    <>
      <div className="prose">
        <h1>{author.name}</h1>
        <ul>
          {author.posts.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
