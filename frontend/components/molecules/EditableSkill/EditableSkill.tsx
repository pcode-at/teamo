import React from "react";
import { styled } from "../../../stitches.config";
import type * as Stitches from "@stitches/react";
import { Separator } from "../../atoms/Separator/Separator";
import {
  BodyDefaultTabletAndUpStyle,
  BodyMediumTabletAndUpStyle,
  H3BoldTabletAndUpStyle,
} from "../../../utils/StyledParagraph";
import SvgCross from "../../atoms/svg/SvgCross";

type Props = {
  rating?: number;
  deleteSkill?: Function;
  children: React.ReactNode;
  editRating?: Function;
};

const HeaderLayout = styled("div", {
  width: "100%",
});

const Headline = styled("h1", {
  ...H3BoldTabletAndUpStyle,
  padding: "0 0 $2x 0",
});

const SkillLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "fit-content",
  gap: "$2x",
  padding: "$1x $2x",
  backgroundColor: "$brand-200",
  borderRadius: "$1x",
  color: "$neutral-700",
  height: "fit-content",
  marginTop: "$2x",
});

const SkillName = styled("p", {
  ...BodyDefaultTabletAndUpStyle,
});

const SkillRating = styled("input", {
  ...BodyMediumTabletAndUpStyle,
  border: "none",
  height: "2.25rem",
  textAlign: "center",
  padding: "0 $1x 0 $1x",
  borderRadius: "$1x",
  backgroundColor: "$brand-100",
  color: "$neutral-700",
  fontSize: "1rem",

  "&:focus": {
    border: "$brand-200",
  },
});

const DeleteSkillLayout = styled("button", {
  display: "flex",
  width: "18px",
  height: "18px",
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
});

export const EditableSkill: React.FC<Props> = ({
  rating,
  deleteSkill,
  children,
  editRating,
}) => {
  return (
    <>
      <SkillLayout>
        <SkillName>{children}</SkillName>
        <SkillRating
          value={rating}
          onChange={(e) => {
            editRating(e.target.value);
          }}
          min={1}
          max={9}
          type={"number"}
        ></SkillRating>
        <DeleteSkillLayout
          onClick={(e) => {
            deleteSkill();
          }}
        >
          <SvgCross></SvgCross>
        </DeleteSkillLayout>
      </SkillLayout>
    </>
  );
};
