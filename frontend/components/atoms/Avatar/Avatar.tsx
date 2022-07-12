import React from "react";
import { styled } from "@stitches/react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

type Props = {
  src?: string;
  name: string;
};

const StyledAvatar = styled(AvatarPrimitive.Root, {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  verticalAlign: "middle",
  overflow: "hidden",
  userSelect: "none",
  width: 250,
  height: 250,
  borderRadius: "100%",
  backgroundColor: "$brand-300",
});

const StyledImage = styled(AvatarPrimitive.Image, {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
});

const StyledFallback = styled(AvatarPrimitive.Fallback, {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "$brand-300",
  color: "$neutral-100",
  fontSize: 45,
  lineHeight: 1,
  fontWeight: 500,
});

export const Avatar: React.FC<Props> = ({ src, name }) => (
  <StyledAvatar>
    <StyledImage src={src} alt={name} />
    <StyledFallback delayMs={600}>
      {name
        .split(" ")
        .map((word) => word[0])
        .join("")}
    </StyledFallback>
  </StyledAvatar>
);
