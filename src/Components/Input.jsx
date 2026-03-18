import { useId, forwardRef } from "react"

import React from 'react'

const Input = ( { label, type = "text", className = "", ...props },
  ref,) => {
     const id = useId();

  return (
    <>
      <div className="w-100">
      {label && (
        <label htmlFor={id} className="form-label mb-1 ps-1">
          {label}
        </label>
      )}

      <input
        id={id}
        ref={ref}
        type={type}
        className={`form-control ${className}`}
        {...props}
      />
    </div>
    </>
  )
}

export default forwardRef(Input)
