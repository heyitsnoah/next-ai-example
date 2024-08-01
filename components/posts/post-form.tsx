'use client'
// Server Actions: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { createPost } from '@/app/posts/actions'
import LoadingSpinner from '../ui/loading-spinner'

export default function PostForm() {
  const [isLoading, setIsLoading] = useState(false)
  async function formSubmit(formdata: FormData) {
    setIsLoading(true)
    const response = await createPost(formdata.get('title') as string)
    console.log(response)
    setIsLoading(false)
  }
  return (
    <div className="mb-5">
      <h2>Create Post</h2>
      <form action={formSubmit} className="flex gap-3">
        <Input required placeholder="title of post" name="title" />
        <Button disabled={isLoading} type="submit">
          {isLoading ? <LoadingSpinner /> : 'Create Post'}
        </Button>
      </form>
    </div>
  )
}
