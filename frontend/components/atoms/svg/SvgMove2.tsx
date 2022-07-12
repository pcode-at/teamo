import * as React from "react";

const SvgMove2 = (props) => (
  <svg
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>{props?.title || "move icon"}</title>
    <path
      d="M8.25 4.583 11 1.833l2.75 2.75M13.75 17.417 11 20.167l-2.75-2.75M11 1.833v18.334"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgMove2;
