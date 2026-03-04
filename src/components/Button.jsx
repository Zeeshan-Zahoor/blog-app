import React from 'react'

function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
  return (
    <button
      type={type}
      className={`
        px-4 py-2
        rounded-lg
        font-medium
        ${bgColor}
        ${textColor}
        transition
        duration-200
        hover:opacity-90
        active:scale-95
        focus:outline-none
        focus:ring-2
        focus:ring-blue-400
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button