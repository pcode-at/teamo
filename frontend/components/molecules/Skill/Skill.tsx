import React from "react";
import { styled } from "../../../stitches.config";
import type * as Stitches from "@stitches/react";
import { Separator } from "../../atoms/Separator/Separator";
import { BodyDefaultTabletAndUpStyle } from "../../../utils/StyledParagraph";
import SvgCross from "../../atoms/svg/SvgCross";

type Props = {
  rating?: number;
  opacity?: number;
  deleteSkill?: Function;
  children: React.ReactNode;
};

const SkillLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "fit-content",
  gap: "$2x",
  padding: "$1x $2x",
  backgroundColor: "$brand-300",
  borderRadius: "$1x",
  color: "$neutral-700",
  height: "fit-content",

  variants: {
    type: {
      none: {
        backgroundColor: "$neutral-300",
      },
      half: {
        backgroundColor: "$brand-200",
      },
      full: {
        backgroundColor: "$brand-400",
        color: "$brand-100",
      },
    },
  },
});

const SkillName = styled("p", {
  ...BodyDefaultTabletAndUpStyle,
});

const SkillRating = styled("p", {
  padding: "0 $1x",
  borderRadius: "$1x",

  backgroundColor: "$brand-100",
  color: "$neutral-700",
  fontSize: "1rem",
});

const DeleteSkillLayout = styled("button", {
  display: "flex",
  width: "22px",
  height: "22px",
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
});

export const Skill: React.FC<Props> = ({
  rating,
  opacity,
  deleteSkill,
  children,
}) => {
  let type: "none" | "half" | "full" = "half";
  if (opacity === 0) {
    type = "none";
  } else if (opacity === 1) {
    type = "full";
  }
  return (
    <>
      <SkillLayout type={type}>
        <SkillName>{children}</SkillName>
        {rating && <SkillRating>{rating}</SkillRating>}
        {deleteSkill && (
          <DeleteSkillLayout
            onClick={(e) => {
              deleteSkill();
            }}
          >
            <SvgCross></SvgCross>
          </DeleteSkillLayout>
        )}
      </SkillLayout>
    </>
  );
};
