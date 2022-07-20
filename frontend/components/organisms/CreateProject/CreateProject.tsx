import { useRouter } from "next/router";
import React, { useState } from "react";
import { styled } from "../../../stitches.config";
import { H2BoldTabletAndUpStyle } from "../../../utils/StyledParagraph";
import { Button } from "../../atoms/Button/Button";
import { InputField } from "../../atoms/InputField/InputField";
import { Separator } from "../../atoms/Separator/Separator";
import { TextArea } from "../../atoms/TextArea/TextArea";
import { AddSkill } from "../../molecules/AddSkill/AddSkill";
import { BackLink } from "../../molecules/BackLink/BackLink";

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
          addSearchSkill={(value, id) => {
            setInputs({
              ...inputs,
              skills: [
                ...inputs.skills,
                {
                  name: value,
                  id,
                },
              ],
            });
          }}
          items={...inputs.skills}
        ></AddSkill>
        <SeparatorLayout></SeparatorLayout>
        <SeparatorLayout>
          <Separator width={"big"} alignment={"left"}></Separator>
        </SeparatorLayout>
        <Button
          onClick={() => {
            router.push("/project");
          }}
        >
          Create project
        </Button>
      </InputFieldLayout>
    </>
  );
};
