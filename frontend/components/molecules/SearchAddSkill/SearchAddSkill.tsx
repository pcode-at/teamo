import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { styled } from "../../../stitches.config";
import { getSkills } from "../../../utils/requests/skills";
import { InputField } from "../../atoms/InputField/InputField";
import SvgMove2 from "../../atoms/svg/SvgMove2";
import SvgPlus from "../../atoms/svg/SvgPlus";

type Props = {
  addSearchSkill: (skill: string, rating: string, id: string) => void;
  items: {
    id: string;
    content: {
      title: string;
      skillId: string;
      rating: string;
    };
  }[];
};

const SearchAddSkillLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  borderRadius: "$2x",

  backgroundColor: "$neutral-100",
});

const AddSkillInfoLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
});

const AddIconLayout = styled("button", {
  display: "block",
  width: "22px",
  height: "22px",
  border: "none",
  padding: "0",

  backgroundColor: "transparent",
  color: "$brand-500",
  cursor: "pointer",
});

const InputLayout = styled("div", {
  width: "fit-content",
});

const SkillListLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  width: "100%",
  gap: "$2x",
  padding: "$1x 0",
  borderRadius: "$2x",
  backgroundColor: "$neutral-100",
  overflow: "auto",
});

const SkillListItemLayout = styled("button", {
  display: "flex",
  width: "100%",

  borderRadius: "$2x",
  backgroundColor: "$brand-100",
  cursor: "pointer",
  padding: "$1x $2x",
  border: "none",
  color: "$brand-500",
  fontSize: "1rem",
  fontWeight: "bold",
  textAlign: "left",
  textDecoration: "none",
  transition: "all 0.2s",

  "&:hover": {
    backgroundColor: "$brand-200",
  },
});

export const SearchAddSkill: React.FC<Props> = ({ addSearchSkill, items }) => {
  const [rating, setRating] = React.useState("");
  const [skill, setSkill] = React.useState("");
  const { data: skills, status } = useQuery("skills", getSkills);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <>
      <SearchAddSkillLayout>
        <AddSkillInfoLayout>
          <InputField
            inputType={"text"}
            value={skill}
            onChange={(value) => {
              setSkill(value);
            }}
            label={"Search skill"}
            showLabel={false}
            size="fitParent"
          ></InputField>
        </AddSkillInfoLayout>
      </SearchAddSkillLayout>
      <SkillListLayout>
        {skills
          .filter(
            (element) =>
              (element.name.includes(skill) ||
                element.name.toLowerCase().includes(skill.toLowerCase())) &&
              !items.find((item) => item.content.title === element.name)
          )
          .map((skill) => (
            <SkillListItemLayout
              key={skill.id}
              onClick={() => {
                addSearchSkill(skill.name, rating, skill.id);
                setSkill("");
                setRating("");
              }}
            >
              {skill.name}
            </SkillListItemLayout>
          ))}
      </SkillListLayout>
    </>
  );
};
