import { useRouter } from "next/router";
import React, { useState } from "react";
import { styled } from "../../../stitches.config";
import {
  H2BoldTabletAndUpStyle,
  Typography,
} from "../../../utils/StyledParagraph";
import { Button } from "../../atoms/Button/Button";
import { InputField } from "../../atoms/InputField/InputField";
import { Separator } from "../../atoms/Separator/Separator";
import { TextArea } from "../../atoms/TextArea/TextArea";
import { AddSkill } from "../../molecules/AddSkill/AddSkill";
import { BackLink } from "../../molecules/BackLink/BackLink";
import { Skill } from "../../molecules/Skill/Skill";

type Props = {
  saveFunction: (project: any) => void;
  defaultInput: {
    name: string;
    description: string;
    skills: {
      name: string;
      id: string;
    }[];
  };
  siteName: string;
};

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

  "@tabletAndDown": {
    gridTemplateColumns: "1fr",
  },
});

const SeparatorLayout = styled("div", {
  gridColumn: "span 2",

  "@tabletAndDown": {
    gridColumn: "span 1",
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

const GridItemLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$2x",
});

export const ProjectForm: React.FC<Props> = ({
  saveFunction,
  defaultInput = { name: "", description: "", skills: [] },
  siteName,
}) => {
  const router = useRouter();
  const [inputs, setInputs] = useState(defaultInput);
  console.log(inputs);
  return (
    <>
      <BackLink href="/project" label="Back to projects"></BackLink>
      <HeaderLayout>
        <Headline>{siteName}</Headline>
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
          value={inputs.description}
        ></TextArea>
        <SeparatorLayout>
          <Separator width={"big"} alignment={"left"}></Separator>
        </SeparatorLayout>
        <GridItemLayout>
          <Typography variant="h3-bold-tablet-and-up">
            Available skills
          </Typography>
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
        </GridItemLayout>
        <GridItemLayout>
          <Typography variant="h3-bold-tablet-and-up">Added skills</Typography>
          <SkillListLayout>
            {inputs.skills.map((skill) => (
              <Skill
                key={skill.id}
                deleteSkill={() => {
                  setInputs({
                    ...inputs,
                    skills: inputs.skills.filter(
                      (item) => item.id !== skill.id
                    ),
                  });
                }}
              >
                {skill.name}
              </Skill>
            ))}
          </SkillListLayout>
        </GridItemLayout>
        <SeparatorLayout>
          <Separator width={"big"} alignment={"left"}></Separator>
        </SeparatorLayout>
        <Button
          onClick={() => {
            saveFunction({
              name: inputs.name,
              description: inputs.description,
              skills: inputs.skills.map((skill) => skill.id),
            });
            router.push("/project");
          }}
          size="small"
          disabled={!inputs.name}
        >
          {siteName}
        </Button>
      </InputFieldLayout>
    </>
  );
};
