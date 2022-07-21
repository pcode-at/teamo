import React from "react";
import { useQuery } from "react-query";
import { styled } from "../../../stitches.config";
import { getSkills } from "../../../utils/requests/skills";
import {
  H2BoldTabletAndUpStyle,
  H3BoldTabletAndUpStyle,
} from "../../../utils/StyledParagraph";
import { InputField } from "../../atoms/InputField/InputField";

type Props = {
  addSearchSkill: (skill: string, id) => void;
  items: {
    name: string;
    id: string;
  }[];
};

const HeaderLayout = styled("div", {
  width: "100%",
});

const Headline = styled("h1", {
  ...H3BoldTabletAndUpStyle,
  padding: "0 0 $2x 0",
});

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
  flexDirection: "column",
  width: "100%",
});

const SkillListLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "left",
  width: "100%",
  flexWrap: "wrap",
  gap: "$2x",
  padding: "$1x 0",
  borderRadius: "$2x",
  backgroundColor: "$neutral-100",
  marginTop: "$2x",
  overflow: "auto",
});

const SkillListItemLayout = styled("button", {
  display: "flex",
  width: "fit-content",
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

const SearchLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$3x",
});

export const AddSkill: React.FC<Props> = ({ addSearchSkill, items }) => {
  const [skill, setSkill] = React.useState("");
  const { data: skills, status } = useQuery("skills", getSkills);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Error</p>;
  }

  return (
    <>
      <SearchLayout>
        <SearchAddSkillLayout>
          <AddSkillInfoLayout>
            <HeaderLayout>
              <Headline>Search for a skill</Headline>
            </HeaderLayout>

            <InputField
              inputType={"text"}
              value={skill}
              onChange={(value) => {
                setSkill(value);
              }}
              label={"Name of skill"}
              showLabel={true}
              size="fitParent"
            ></InputField>
          </AddSkillInfoLayout>
        </SearchAddSkillLayout>
        <SkillListLayout>
          {skills
            .filter(
              (element) =>
                element.name.toLowerCase().includes(skill.toLowerCase()) &&
                !items.find((item) => item.name === element.name)
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
      </SearchLayout>
    </>
  );
};
