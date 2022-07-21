import React from "react";
import { styled } from "../../../stitches.config";
import type * as Stitches from "@stitches/react";
import Link from "next/link";

type Props = {
  size?: Stitches.VariantProps<typeof StyledLink>["size"];
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  target?: "_blank" | "_self" | "_parent" | "_top";
  href: string;
  children: React.ReactNode;
};

const StyledLink = styled("a", {
  width: "fit-content",
  
  color: "$neutral-700",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  textDecoration: "none",

  "&:hover": {
    textDecoration: "underline",
  },

  "&:focus": {
    outline: "none",
    border: "$brand-400 $borderWidths$medium solid",
  },

  variants: {
    size: {
      medium: {},
      small: {},
    },
  },
});

export const TeamoLink: React.FC<Props> = ({
  size = "medium",
  leftIcon,
  rightIcon,
  target = "_self",
  href,
  children,
}) => {
  return (
    <>
      <Link href={href} target={target} passHref>
        <StyledLink size={size}>{children}</StyledLink>
      </Link>
    </>
  );
};
