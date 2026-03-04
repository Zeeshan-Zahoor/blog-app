import React from 'react'
import { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import service from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post)
        } else {
          navigate("/")
        }
      })
    } else {
      navigate("/")
    }
  }, [slug, navigate])

  return post ? (
    <div className="w-full py-12 bg-gray-50 min-h-screen">

      <Container>

        {/* Page Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Edit Post
          </h1>
          <p className="text-gray-500">
            Update your article and keep your content fresh.
          </p>
        </div>

        {/* Post Form */}
        <PostForm post={post} />

      </Container>

    </div>
  ) : null
}

export default EditPost