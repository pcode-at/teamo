import * as React from "react"

const SvgArrowLeft = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-arrow-left"
    {...props}
  >    
    <title>{props?.title || "arrow left icon"}</title>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
)

export default SvgArrowLeft
