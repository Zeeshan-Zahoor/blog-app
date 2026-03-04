import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featureImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition duration-200">

        {/* Image */}
        {featureImage && (
          <div className="w-full max-h-100 overflow-hidden">
            <img
              src={service.getFilePreview(featureImage)}
              alt={title}
              className="w-full h-full object-cover hover:scale-105 transition duration-300"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  )
}

export default PostCard