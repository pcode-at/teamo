import { useRouter } from "next/router";
import React, { useState } from "react";
import { styled } from "../../../stitches.config";
import { createProject } from "../../../utils/requests/project";
import { H2BoldTabletAndUpStyle } from "../../../utils/StyledParagraph";
import { Button } from "../../atoms/Button/Button";
import { InputField } from "../../atoms/InputField/InputField";
import { Separator } from "../../atoms/Separator/Separator";
import { TextArea } from "../../atoms/TextArea/TextArea";
import { AddSkill } from "../../molecules/AddSkill/AddSkill";
import { BackLink } from "../../molecules/BackLink/BackLink";
import { Skill } from "../../molecules/Skill/Skill";

type Props = {};

const HeaderLayout = styled("div", {
  width: "100%",
});

const Headline = styled("h1", {
  ...H2BoldTabletAndUpStyle,
});

const InputFieldLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "$5x",
  padding: "$2x 0",
});

const SeparatorLayout = styled("div", {
  gridColumn: "span 2",
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

export const CreateProject: React.FC<Props> = ({}) => {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    skills: [],
  });

  return (
    <>
      <BackLink href="/project" label="Back to projects"></BackLink>
      <HeaderLayout>
        <Headline>Create a project</Headline>
      </HeaderLayout>
      <InputFieldLayout>
        <InputField
          inputType={"text"}
          onChange={(value) => {
            setInputs({ ...inputs, name: value });
          }}
          value={inputs.name}
          label="Name"
          required={true}
        ></InputField>
        <SeparatorLayout></SeparatorLayout>
        <TextArea
          onChange={(value) => {
            setInputs({ ...inputs, description: value });
          }}
          label="Description"
        ></TextArea>
        <SeparatorLayout>
          <Separator width={"big"} alignment={"left"}></Separator>
        </SeparatorLayout>
        <AddSkill
          addSearchSkill={(skill, id) => {
            setInputs({
              ...inputs,
              skills: [
                ...inputs.skills,
                {
                  name: skill,
                  id,
                },
              ],
            });
          }}
          items={inputs.skills}
        ></AddSkill>
        <SkillListLayout>
          {inputs.skills.map((skill) => (
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
        <SeparatorLayout>
          <Separator width={"big"} alignment={"left"}></Separator>
        </SeparatorLayout>
        <Button
          onClick={() => {
            try {
              createProject({
                name: inputs.name,
                description: inputs.description,
                skills: inputs.skills.map((skill) => skill.id),
              });
            } catch (e) {
              alert("something went wrong");
            }
          }}
          size="small"
        >
          Create project
        </Button>
      </InputFieldLayout>
    </>
  );
};
