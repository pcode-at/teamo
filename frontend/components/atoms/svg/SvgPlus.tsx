import * as React from "react";

const SvgPlus = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-plus"
    {...props}
  >
    <title>{props?.title || "plus icon"}</title>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export default SvgPlus;
