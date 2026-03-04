import React from "react";

function PostCardSkeleton() {
  return (
    <div className="w-full bg-white rounded-xl p-4 shadow animate-pulse">

      {/* Image  */}
      <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>

      {/* Title  */}
      <div className="h-5 bg-gray-200 rounded w-3/4"></div>

    </div>
  );
}

export default PostCardSkeleton;