import React, { useEffect } from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/InputField/InputField";
import SvgCross from "../../atoms/svg/SvgCross";
import SvgMove2 from "../../atoms/svg/SvgMove2";
import * as SliderPrimitive from "@radix-ui/react-slider";

const StyledSlider = styled(SliderPrimitive.Root, {
  position: "relative",
  display: "flex",
  alignItems: "center",
  userSelect: "none",
  touchAction: "none",
  width: 110,

  '&[data-orientation="horizontal"]': {
    height: 20,
  },

  '&[data-orientation="vertical"]': {
    flexDirection: "column",
    width: 20,
    height: 100,
  },
});

const StyledTrack = styled(SliderPrimitive.Track, {
  backgroundColor: "$brand-400",
  position: "relative",
  flexGrow: 1,
  borderRadius: "9999px",

  '&[data-orientation="horizontal"]': { height: 3 },
  '&[data-orientation="vertical"]': { width: 3 },
});

const StyledRange = styled(SliderPrimitive.Range, {
  position: "absolute",
  backgroundColor: "$brand-400",
  borderRadius: "9999px",
  height: "100%",
});

const StyledThumb = styled(SliderPrimitive.Thumb, {
  all: "unset",
  display: "block",
  width: 20,
  height: 20,
  backgroundColor: "$brand-400",
  boxShadow: `0 2px 10px $neutral-800`,
  borderRadius: 10,
  "&:hover": { backgroundColor: "$neutral-700" },
  "&:focus": { boxShadow: `0 0 0 5px $neutral-600` },
});

type Props = {
  item: {
    id: string;
    content: {
      title: string;
      rating: number;
    };
  };
  updateSkillRating: (id: string, rating: number) => void;
  deleteSkill: (id: string) => void;
};

const ListItemLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "$1x",
  margin: "$1x",

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
  padding: "$2x",
  gap: "$2x",
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

const SliderInfoLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$1x",
});

export const SearchListItem: React.FC<Props> = ({
  item,
  updateSkillRating,
  deleteSkill,
}) => {
  const [rating, setRating] = React.useState(item.content.rating);
  const [name, setName] = React.useState(getNameForRating(rating));

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
          <SliderInfoLayout>
            {name}
            <StyledSlider
              defaultValue={[formatRatingForSlider(rating)]}
              max={10}
              step={5}
              aria-label="Volume"
              onValueChange={(value) => {
                setRating(formatRatingForInput(value[0]));
                setName(getNameForRating(formatRatingForInput(value[0])));
                updateSkillRating(item.id, formatRatingForInput(value[0]));
              }}
            >
              <StyledTrack>
                <StyledRange />
              </StyledTrack>
              <StyledThumb />
            </StyledSlider>
          </SliderInfoLayout>

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

function getNameForRating(rating: number) {
  switch (formatRatingForSlider(rating)) {
    case 0:
      return "Beginner";
    case 5:
      return "Intermediate";
    default:
      return "Expert";
  }
}

function formatRatingForSlider(rating: number) {
  if (rating < 3.5) {
    return 0;
  } else if (rating < 7.5) {
    return 5;
  }
  return 10;
}

function formatRatingForInput(rating: number) {
  if (rating == 0) {
    return 3;
  } else if (rating == 5) {
    return 6;
  }
  return 9;
}
