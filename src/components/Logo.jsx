import React from "react";

function Logo({ width = "100px" }) {
  return (
    <div
      style={{ width }}
      className="font-bold text-xl text-gray-900 tracking-tight select-none"
    >
      <span className="text-blue-600">Blog</span>Hub
    </div>
  );
}

export default Logo;