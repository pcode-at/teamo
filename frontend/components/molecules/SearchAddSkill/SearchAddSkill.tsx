import React from "react";
import { useQuery } from "react-query";
import { styled } from "../../../stitches.config";
import { getSkills } from "../../../utils/requests/skills";
import { InputField } from "../../atoms/InputField/InputField";
import { Item } from "../../organisms/SearchBar/SearchBar";

type Props = {
  addSearchSkill: (skill: string, id: string) => void;
  items: {
    required: Item[];
    should: Item[];
    optional: Item[];
  };
};

const SearchAddSkillLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  borderRadius: "$2x",
  marginTop: "$2x",

  backgroundColor: "$neutral-100",
});

const AddSkillInfoLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
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
  marginTop: "$2x",
  overflow: "auto",
});

const SkillListItemLayout = styled("button", {
  display: "flex",
  width: "100%",

  borderRadius: "$1x",
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
              !items.required.find(
                (item) => item.content.title === element.name
              ) &&
              !items.should.find(
                (item) => item.content.title === element.name
              ) &&
              !items.optional.find(
                (item) => item.content.title === element.name
              )
          )
          .map((currentSkill) => (
            <SkillListItemLayout
              key={currentSkill.id}
              onClick={() => {
                addSearchSkill(currentSkill.name, currentSkill.id);
                setSkill("");
              }}
            >
              {currentSkill.name}
            </SkillListItemLayout>
          ))}
      </SkillListLayout>
    </>
  );
};
