import React from "react";
import { styled } from "../../../stitches.config";
import {
  BodyDefaultTabletAndUpStyle,
  H1BoldTabletAndUpStyle,
} from "../../../utils/StyledParagraph";

type Props = {
  title: string;
  subtitle: string;
  icon?: any;
  iconOnClick?: Function;
};

const TitleButtonLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "$3x",
  color: "$neutral-700",
});

const StyledTitle = styled("h1", {
  ...H1BoldTabletAndUpStyle,
});

const IconLayout = styled("button", {
  display: "flex",
  width: "30px",
  height: "30px",
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  outline: "none",
});

const StyledSubtitle = styled("div", {
  ...BodyDefaultTabletAndUpStyle,
});

export const HeaderLink: React.FC<Props> = ({
  title,
  subtitle,
  icon,
  iconOnClick,
}) => {
  
  const Icon = icon;

  return (
    <>
      <TitleButtonLayout>
        <StyledTitle>{title}</StyledTitle>
        {icon && (
          <IconLayout
            onClick={() => {
              iconOnClick();
            }}
          >
            <Icon></Icon>
          </IconLayout>
        )}
      </TitleButtonLayout>
      <StyledSubtitle>{subtitle}</StyledSubtitle>
    </>
  );
};
