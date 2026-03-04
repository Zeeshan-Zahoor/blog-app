import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className="w-full py-12 bg-gray-50 min-h-screen">

      <Container>

        {/* Page Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Create New Post
          </h1>
          <p className="text-gray-500">
            Share your ideas and publish a new article.
          </p>
        </div>

        {/* Post Form */}
        <PostForm />

      </Container>

    </div>
  )
}

export default AddPost