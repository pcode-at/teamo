import Link from "next/link";
import React from "react";
import { styled } from "../../../stitches.config";
import {
  BodyDefaultTabletAndUpStyle,
  BodySmallTabletAndUpStyle,
} from "../../../utils/StyledParagraph";

type Props = {
  icon: any;
  label: string;
  href?: string;
  size?: "small" | "medium" | "large";
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
      large: {
        width: "100px",
        height: "100px",
      },
    },
  },
});

const InfoText = styled("p", {
  variants: {
    size: {
      small: {
        ...BodySmallTabletAndUpStyle,
      },
      medium: {
        ...BodyDefaultTabletAndUpStyle,
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
          <Icon strokeWidth={1}></Icon>
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
