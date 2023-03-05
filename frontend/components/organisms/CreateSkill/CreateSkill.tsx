import { Separator } from "@radix-ui/react-separator";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { styled } from "../../../stitches.config";
import { createSkill, getSkills } from "../../../utils/requests/skills";
import {
  H2BoldTabletAndUpStyle,
  H3BoldTabletAndUpStyle,
} from "../../../utils/StyledParagraph";
import { Button } from "../../atoms/Button/Button";
import { InputField } from "../../atoms/InputField/InputField";
import { SubHeading } from "../../atoms/SubHeading/SubHeading";
import { BackLink } from "../../molecules/BackLink/BackLink";
import { Skill } from "../../molecules/Skill/Skill";

type Props = {
  addSearchSkill: (skill: string, id) => void;
  items: {
    name: string;
    id: string;
  }[];
};

const HeaderLayout = styled("div", {
  width: "100%",
  padding: "$4x $6x $2x $6x",
});

const Headline = styled("h1", {
  ...H2BoldTabletAndUpStyle,
});

const InputFieldLayout = styled("div", {
  gap: "$5x",
  padding: "$2x $6x $2x $6x",
});

const SeparatorLayout = styled("div", {
  gridColumn: "span 3",
});

const ManageLayout = styled("div", {
  gap: "$5x",
  padding: "$2x $6x $2x $6x",
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

const SkillListLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "left",
  width: "100%",
  flexWrap: "wrap",
  gap: "$2x",
  height: "fit-content",
});

export const CreateSkill: React.FC<Props> = ({}) => {
  const [skill, setSkill] = React.useState("");
  const { data: skills, status, refetch } = useQuery("skills", getSkills);

  const [inputs, setInputs] = useState({
    name: "",
    skills: [],
  });

  return (
    <>
      <HeaderLayout>
        <BackLink href="/admin/user" label="Back to admin settings"></BackLink>
        <Headline>Skills</Headline>
      </HeaderLayout>

      <InputFieldLayout>
        <SubHeading>Add a new skill</SubHeading>

        <InputField
          inputType={"text"}
          value={inputs.name}
          onChange={(value) => {
            setInputs({ ...inputs, name: value });
          }}
          label={"Name of skill"}
          showLabel={false}
          size="fitParent"
        ></InputField>

        <Button
          onClick={() => {
            try {
              createSkill({
                name: inputs.name,
              });
              setInputs({ ...inputs, name: "" });
              refetch();
            } catch (exception) {
              console.log(exception);
            }
          }}
          size={"small"}
          disabled={isDisabled(inputs)}
        >
          Add skill
        </Button>

        <SeparatorLayout>
          <Separator width={"big"} alignment={"left"}></Separator>
        </SeparatorLayout>
      </InputFieldLayout>

      <ManageLayout>
        <SubHeading>Manage skills</SubHeading>

        <SkillListLayout>
          {skills?.map((skill) => (
            <Skill
              key={skill.id}
              deleteSkill={() => {
                setInputs({
                  ...inputs,
                  skills: inputs.skills.filter((item) => item.id !== skill.id),
                });
              }}
            >
              {skill.name}
            </Skill>
          ))}
        </SkillListLayout>

        {/* <SkillListLayout>
          {skills?.map((skill) => {
            // list all skills
            return (
              <>
                <SkillListItemLayout>{skill.name}</SkillListItemLayout>
              </>
            );
          })}
        </SkillListLayout> */}
      </ManageLayout>
    </>
  );
};

function isDisabled(input): boolean {
  let skillDisabled = false;
  input.skills.forEach((skill) => {
    if (skill.name == "") {
      skillDisabled = true;
    }
  });

  return input.name == "" || skillDisabled;
}
