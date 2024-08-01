import PostForm from '@/components/posts/post-form'
import prismaClient from '@/utils/prisma'
import Link from 'next/link'

const prisma = prismaClient()
export default async function Page() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
  await prisma.$disconnect()
  return (
    <>
      <div className="prose">
        <PostForm />
        <h1>Posts</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
