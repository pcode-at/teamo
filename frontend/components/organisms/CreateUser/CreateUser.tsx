import { useRouter } from "next/router";
import React, { useState } from "react";
import { styled } from "../../../stitches.config";
import { createUser } from "../../../utils/requests/user";
import {
  H2BoldTabletAndUpStyle,
} from "../../../utils/StyledParagraph";
import { Button } from "../../atoms/Button/Button";
import { InputField } from "../../atoms/InputField/InputField";
import { Separator } from "../../atoms/Separator/Separator";
import { AddSkill } from "../../molecules/AddSkill/AddSkill";
import { BackLink } from "../../molecules/BackLink/BackLink";
import { EditableSkill } from "../../molecules/EditableSkill/EditableSkill";
import { LocationInput } from "../../molecules/LocationInput/LocationInput";
import { ToggleGroup } from "../../molecules/ToggleGroup/ToggleGroup";

type Props = {};

const HeaderLayout = styled("div", {
  width: "100%",
  padding: "$4x $6x $2x $6x",
});

const Headline = styled("h1", {
  ...H2BoldTabletAndUpStyle,
});

const InputFieldLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr",
  gap: "$5x",
  padding: "$2x $6x $2x $6x",
});

const RightColumnLayout = styled("div", {
  gridColumn: "span 2",
});

const SeparatorLayout = styled("div", {
  gridColumn: "span 3",
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

export const CreateUser: React.FC<Props> = ({}) => {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    name: "",
    birthdate: "",
    location: "",
    gender: "",
    identifier: "",
    email: "",
    phoneNumber: "",
    skills: [],
  });

  console.log(inputs);

  return (
    <>
      <HeaderLayout>
        <BackLink href="/admin/user" label="Back to users"></BackLink>
        <Headline>Create a user</Headline>
      </HeaderLayout>

      <InputFieldLayout>
        <InputField
          // icon={SvgUser}
          inputType={"text"}
          onChange={(value) => {
            setInputs({ ...inputs, name: value });
          }}
          value={inputs.name}
          label="Name"
          required={true}
        ></InputField>

        <RightColumnLayout>
          <InputField
            // icon={SvgUser}
            inputType={"text"}
            onChange={(value) => {
              setInputs({ ...inputs, identifier: value });
            }}
            value={inputs.identifier}
            label="Identifier"
            required={true}
          ></InputField>
        </RightColumnLayout>

        {/* Location */}
        <LocationInput
          value={inputs.location}
          onChange={(value) => {
            setInputs({ ...inputs, location: value });
          }}
        ></LocationInput>

        {/* Gender */}
        <ToggleGroup
          elements={[
            {
              value: "m",
              label: "M",
            },
            {
              value: "f",
              label: "F",
            },
            {
              value: "v",
              label: "V",
            },
          ]}
          label="Gender"
        ></ToggleGroup>

        <InputField
          // icon={SvgCalendar}
          inputType={"date"}
          onChange={(value) => {
            setInputs({ ...inputs, birthdate: value });
          }}
          value={inputs.birthdate}
          label="Birthdate"
        ></InputField>

        <InputField
          // icon={SvgMail}
          inputType={"email"}
          onChange={(value) => {
            setInputs({ ...inputs, email: value });
          }}
          value={inputs.email}
          label="E-Mail"
          required={true}
        ></InputField>

        <RightColumnLayout>
          <InputField
            // icon={SvgPhone}
            inputType={"tel"}
            onChange={(value) => {
              setInputs({ ...inputs, phoneNumber: value });
            }}
            value={inputs.phoneNumber}
            label="Phone number"
          ></InputField>
        </RightColumnLayout>

        {/*  <LocationInput></LocationInput> */}

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
                  rating: 5,
                  id,
                },
              ],
            });
          }}
          items={inputs.skills}
        ></AddSkill>

        <RightColumnLayout>
          <SkillListLayout>
            {inputs.skills.map((skill) => (
              <EditableSkill
                key={skill.id}
                rating={skill.rating}
                editRating={(rating) => {
                  if (rating == "" || (rating >= 1 && rating <= 9)) {
                    setInputs({
                      ...inputs,
                      skills: inputs.skills.map((s) => {
                        if (s.id === skill.id) {
                          return {
                            ...s,
                            rating,
                          };
                        }
                        return s;
                      }),
                    });
                  }
                }}
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
              </EditableSkill>
            ))}
          </SkillListLayout>
        </RightColumnLayout>

        <Button
          onClick={() => {
            try {
              createUser({
                identifier: inputs.identifier,
                password: "",
                name: inputs.name,
                email: inputs.email,
                phoneNumber: inputs.phoneNumber,
                birthdate: inputs.birthdate,
                gender: inputs.gender,
                photo: "",
                roles: [""],
                departments: [""],
                loation: inputs.location,
              });

              router.push("/admin/user");
            } catch (exception) {
              alert("Error creating user");
            }
          }}
          disabled={isDisabled(inputs)}
        >
          Create User
        </Button>
      </InputFieldLayout>
    </>
  );
};

function isDisabled(input): boolean {
  // return true if any of the inputs is empty or the rating of the skill is empty except for gender, birthdate, phonenumber
  /* const [inputs, setInputs] = useState({
    name: "",
    birthdate: "",
    location: "",
    gender: "",
    identifier: "",
    email: "",
    phoneNumber: "",
    skills: [],
  }); */

  let skillDisabled = false;
  input.skills.forEach((skill) => {
    if (skill.rating == "") {
      skillDisabled = true;
    }
  });

  return (
    input.name == "" ||
    input.location == "" ||
    input.identifier == "" ||
    input.email == "" ||
    skillDisabled
  );
}
