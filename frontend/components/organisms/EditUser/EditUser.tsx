import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { styled } from "../../../stitches.config";
import {
  getUser,
  replaceSkills,
  updateUser,
} from "../../../utils/requests/user";
import { H2BoldTabletAndUpStyle } from "../../../utils/StyledParagraph";
import { Button } from "../../atoms/Button/Button";
import { InputField } from "../../atoms/InputField/InputField";
import { Separator } from "../../atoms/Separator/Separator";
import SvgCross from "../../atoms/svg/SvgCross";
import { AddSkill } from "../../molecules/AddSkill/AddSkill";
import { BackLink } from "../../molecules/BackLink/BackLink";
import { EditableSkill } from "../../molecules/EditableSkill/EditableSkill";
import { LocationInput } from "../../molecules/LocationInput/LocationInput";
import { ToggleGroup } from "../../molecules/ToggleGroup/ToggleGroup";
import { PersonalInfoTextTitle } from "../ProfilePageInfoSection/ProfilePageInfoSection";

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
  gap: "$3x",
  padding: "0 $6x $4x",
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

const ProfilePageSkillsLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  width: "100%",
  flexWrap: "wrap",
  gap: "$3x",
});

const HoursLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "3fr 1fr 1fr",
  gap: "$5x",
  padding: "$1x 0",
});

const DeleteHoursLayout = styled("button", {
  display: "flex",
  width: "18px",
  height: "18px",
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  alignSelf: "center",
});

export const EditUser: React.FC<Props> = ({}) => {
  const router = useRouter();
  const userUUID = router.query.userUUID as string;
  const [inputs, setInputs] = useState({
    name: "",
    birthDate: "",
    location: "",
    gender: "",
    identifier: "",
    email: "",
    phoneNumber: "",
    skills: [],
    workHourChanges: [],
    defaultWorkHours: "",
  });
  const { status } = useQuery(["user", userUUID], () => getUser(userUUID), {
    onSuccess: (data) => {
      console.log(data);
      setInputs({
        name: data.name,
        birthDate: data.birthDate,
        location: data.location,
        gender: data.gender,
        identifier: data.identifier,
        email: data.email,
        phoneNumber: data.phoneNumber,
        skills: data.skills,
        workHourChanges: data.workHourChanges,
        defaultWorkHours: data.defaultWorkHours,
      });
    },
  });

  console.log(inputs);

  return (
    <>
      <HeaderLayout>
        <BackLink href="/admin/user" label="Back to users"></BackLink>
        <Headline>Edit user</Headline>
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
          value={inputs.gender}
          onValueChange={(value) => {
            setInputs({
              ...inputs,
              gender: value,
            });
          }}
        ></ToggleGroup>

        <InputField
          // icon={SvgCalendar}
          inputType={"date"}
          onChange={(value) => {
            setInputs({ ...inputs, birthDate: value });
          }}
          value={inputs.birthDate}
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
                {skill.skill ? skill.skill.name : skill.name}
              </EditableSkill>
            ))}
          </SkillListLayout>
        </RightColumnLayout>

        <SeparatorLayout>
          <Separator width={"big"} alignment={"left"}></Separator>
        </SeparatorLayout>

        <ProfilePageSkillsLayout>
          <PersonalInfoTextTitle>Available hours</PersonalInfoTextTitle>
          <Button
            onClick={() => {
              setInputs({
                ...inputs,
                workHourChanges: [
                  ...inputs.workHourChanges,
                  {
                    date: new Date().toISOString(),
                    hours: 0,
                  },
                ],
              });
            }}
          >
            Add hour change
          </Button>
          <HoursLayout>
            <b>Date</b>
            <b>Hours/Week</b>
            <b>Remove Change</b>
            {inputs.workHourChanges.map((hour) => (
              <>
                <InputField
                  // icon={SvgMail}
                  inputType={"date"}
                  onChange={(value) => {
                    let correctedWorkHours = inputs.workHourChanges.map(
                      (workHour) => {
                        if (workHour.date === hour.date) {
                          return {
                            ...workHour,
                            date: new Date(value).toISOString(),
                          };
                        }
                        return workHour;
                      }
                    );
                    setInputs({
                      ...inputs,
                      workHourChanges: correctedWorkHours,
                    });
                  }}
                  value={new Date(hour.date).toISOString().slice(0, 10)}
                  required={true}
                ></InputField>
                <InputField
                  // icon={SvgMail}
                  inputType={"number"}
                  onChange={(value) => {
                    let correctedWorkHours = inputs.workHourChanges.map(
                      (workHour) => {
                        if (workHour.date === hour.date) {
                          return {
                            ...workHour,
                            hours: Number(value),
                          };
                        }
                        return workHour;
                      }
                    );
                    setInputs({
                      ...inputs,
                      workHourChanges: correctedWorkHours,
                    });
                  }}
                  value={hour.hours}
                  required={true}
                ></InputField>
                <DeleteHoursLayout
                  onClick={(e) => {
                    setInputs({
                      ...inputs,
                      workHourChanges: inputs.workHourChanges.filter(
                        (item) => item.date !== hour.date
                      ),
                    });
                  }}
                >
                  <SvgCross></SvgCross>
                </DeleteHoursLayout>
              </>
            ))}
          </HoursLayout>
        </ProfilePageSkillsLayout>

        <RightColumnLayout>
          <InputField
            inputType={"number"}
            onChange={(value) => {
              setInputs({ ...inputs, defaultWorkHours: value });
            }}
            value={inputs.defaultWorkHours}
            label="Default work hours per week"
            min="0"
            max="200"
          ></InputField>
        </RightColumnLayout>

        <SeparatorLayout>
          <Separator width={"big"} alignment={"left"}></Separator>
        </SeparatorLayout>
        <Button
          onClick={() => {
            try {
              updateUser({
                identifier: inputs.identifier,
                password: "",
                name: inputs.name,
                email: inputs.email,
                phoneNumber: inputs.phoneNumber,
                birthDate: inputs.birthDate,
                gender: inputs.gender,
                photo: "",
                roles: [""],
                departments: [""],
                location: inputs.location,
                workHourChanges: inputs.workHourChanges,
                defaultWorkHours: Number(inputs.defaultWorkHours),
              }).then((data) => {
                replaceSkills(
                  inputs.skills.map((skill) => {
                    console.log(skill);
                    return {
                      skill: skill.skill ? skill.skill.id : skill.id,
                      rating: Number(skill.rating),
                      identifier: inputs.identifier,
                    };
                  })
                );
              });

              router.push("/admin/user");
            } catch (exception) {
              alert("Error creating user");
            }
          }}
          disabled={isDisabled(inputs)}
        >
          Edit user
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
