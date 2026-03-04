import { useId } from "react"
import React from "react"

function Select(
  {
    options,
    label,
    className = "",
    ...props
  },
  ref
) {
  const id = useId()

  return (
    <div className="w-full">
      
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1 text-left pl-1"
        >
          {label}
        </label>
      )}

      <select
        id={id}
        ref={ref}
        {...props}
        className={`
          w-full
          px-3 py-2
          rounded-lg
          border
          border-gray-300
          bg-white
          text-gray-900
          outline-none
          transition
          duration-200
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          ${className}
        `}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

    </div>
  )
}

export default React.forwardRef(Select)