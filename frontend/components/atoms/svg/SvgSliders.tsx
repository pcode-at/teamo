import * as React from "react"

const SvgSliders = (props) => (
  <svg
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.75 5h8.75M17.5 5h8.75M3.75 15H15M20 15h6.25M3.75 25H10M15 25h11.25M12.5 1.25v7.5M20 11.25v7.5M10 21.25v7.5"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default SvgSliders
