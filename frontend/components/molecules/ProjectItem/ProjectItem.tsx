import React from "react";
import { styled } from "../../../stitches.config";
import { BodySmallTabletAndUpStyle, H3BoldTabletAndUpStyle } from "../../../utils/StyledParagraph";

type Props = {
  title: string;
  subtitle: string;
};

const ItemLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "$1x",
  padding: "$3x",
  backgroundColor: "$neutral-200",
  borderRadius: "$3x",
  transition: "all 0.2s",

  "&:hover": {
    backgroundColor: "$neutral-300",
  }
});

const ItemTitle = styled("span", {
  ...H3BoldTabletAndUpStyle
});

const ItemSubtitle = styled("span", {
  ...BodySmallTabletAndUpStyle
});

export const ProjectItem: React.FC<Props> = ({
  title,
  subtitle,
}) => {
  return (
    <>
      <ItemLayout>
        <ItemTitle>{title}</ItemTitle>
        <ItemSubtitle>{subtitle}</ItemSubtitle>
      </ItemLayout>
    </>
  );
};
