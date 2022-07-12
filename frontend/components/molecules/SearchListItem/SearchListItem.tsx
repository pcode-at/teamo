import React, { useEffect } from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/InputField/InputField";
import SvgCross from "../../atoms/svg/SvgCross";
import SvgMove2 from "../../atoms/svg/SvgMove2";

type Props = {
  item: {
    id: string;
    content: {
      title: string;
      rating: string;
    };
  };
  updateSkillRating: (id: string, rating: string) => void;
  deleteSkill: (id: string) => void;
};

const ListItemLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  borderRadius: "$2x",

  backgroundColor: "$neutral-100",
});

const TitleMoveLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "$2x",
});

const MoveIconLayout = styled("div", {
  display: "flex",
  width: "22px",
  height: "22px",
  color: "$brand-500",
});

const TitleLayout = styled("div", {
  display: "flex",
  fontSize: "1rem",
});

const InputLayout = styled("div", {
  width: "fit-content",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
});

const RemoveIconLayout = styled("button", {
  display: "flex",
  width: "22px",
  height: "22px",
  border: "none",
  backgroundColor: "transparent",
  color: "$brand-500",
  cursor: "pointer",
});

export const SearchListItem: React.FC<Props> = ({
  item,
  updateSkillRating,
  deleteSkill,
}) => {
  const [rating, setRating] = React.useState(item.content.rating);
  return (
    <>
      <ListItemLayout>
        <TitleMoveLayout>
          <MoveIconLayout>
            <SvgMove2></SvgMove2>
          </MoveIconLayout>
          <TitleLayout>{item.content.title}</TitleLayout>
        </TitleMoveLayout>
        <InputLayout>
          <InputField
            inputType={"number"}
            min={"0"}
            max={"9"}
            value={rating}
            onChange={(value) => {
              setRating(value);
              updateSkillRating(item.id, value);
            }}
            size="small"
          ></InputField>
          <RemoveIconLayout
            onClick={() => {
              deleteSkill(item.id);
            }}
          >
            <SvgCross></SvgCross>
          </RemoveIconLayout>
        </InputLayout>
      </ListItemLayout>
    </>
  );
};
