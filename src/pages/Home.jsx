import React from 'react'
import { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../components'
import PostCardSkeleton from "../components/PostCardSkeleton";

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
      setLoading(false)
    })
  }, [])

  if (posts.length === 0) {
    return (
      <div className="w-full py-20 bg-gray-50">
        <Container>
          <div className="text-center max-w-xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to the Blog
            </h1>
            <p className="text-gray-500 mb-6">
              Discover amazing articles written by our community.  
              Sign in to start reading and publishing posts.
            </p>

            <a
              href="/login"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Login to Explore
            </a>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="w-full py-12 bg-gray-50">

      {/* HERO SECTION */}
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Explore Latest Posts
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Read articles from our community and share your own ideas with the world.
          </p>
        </div>
      </Container>

      {/* POSTS GRID */}
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>

    </div>
  )
}

export default Home