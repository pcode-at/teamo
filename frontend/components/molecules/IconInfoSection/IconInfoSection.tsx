import Link from "next/link";
import React from "react";
import { styled } from "../../../stitches.config";

type Props = {
  icon: any;
  label: string;
  href?: string;
  size?: "small" | "medium";
};

const IconInfoLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "$3x",

  variants: {
    size: {
      small: {
        gap: "$1x",
      },
      medium: {
        gap: "$3x",
      },
    },
  },
});

const IconLayout = styled("div", {
  display: "flex",
  width: "25px",
  height: "25px",

  variants: {
    size: {
      small: {
        width: "15px",
        height: "15px",
      },
      medium: {
        width: "25px",
        height: "25px",
      },
    },
  },
});

const InfoText = styled("p", {
  fontSize: "1.3rem",

  variants: {
    size: {
      small: {
        fontSize: "1.2rem",
      },
      medium: {
        fontSize: "1.3rem",
      },
    },
  },
});

const StyledLink = styled("a", {
  color: "$neutral-800",
  textDecoration: "none",
});

export const IconInfoSection: React.FC<Props> = ({
  icon,
  label,
  href,
  size = "medium",
}) => {
  const Icon = icon;
  return (
    <>
      <IconInfoLayout size={size}>
        <IconLayout size={size}>
          <Icon></Icon>
        </IconLayout>
        <InfoText>
          {href ? (
            <Link href={href} passHref>
              <StyledLink>
                <InfoText size={size}>{label}</InfoText>
              </StyledLink>
            </Link>
          ) : (
            <InfoText size={size}>{label}</InfoText>
          )}
        </InfoText>
      </IconInfoLayout>
    </>
  );
};
