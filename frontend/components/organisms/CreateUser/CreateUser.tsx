import { useRouter } from "next/router";
import React, { useState } from "react";
import { styled } from "../../../stitches.config";
import {
  H1BoldTabletAndUpStyle,
  H2BoldTabletAndUpStyle,
} from "../../../utils/StyledParagraph";
import { Button } from "../../atoms/Button/Button";
import { InputField } from "../../atoms/InputField/InputField";
import { Separator } from "../../atoms/Separator/Separator";
import SvgCalendar from "../../atoms/svg/SvgCalendar";
import SvgMail from "../../atoms/svg/SvgMail";
import SvgPhone from "../../atoms/svg/SvgPhone";
import SvgUser from "../../atoms/svg/SvgUser";
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
  });

  return (
    <>
      <HeaderLayout>
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
        <LocationInput></LocationInput>

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

        {/* <Separator width={"big"} alignment={"left"}></Separator> */}

        <Button
          onClick={() => {
            router.push("/admin/user");
          }}
        >
          Create User
        </Button>
      </InputFieldLayout>
    </>
  );
};
