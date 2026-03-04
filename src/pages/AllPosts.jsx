import React from 'react'
import { useState, useEffect } from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../components'

function AllPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  return (
    <div className="w-full py-12 bg-gray-50">

      {/* PAGE TITLE */}
      <Container>
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            All Blog Posts
          </h1>
          <p className="text-gray-500">
            Explore every article published on the platform
          </p>
        </div>
      </Container>

      {/* POSTS GRID */}
      <Container>
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              No posts available
            </h2>
            <p className="text-gray-500">
              Be the first one to publish an article.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>

    </div>
  )
}

export default AllPosts