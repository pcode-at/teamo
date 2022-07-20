import { useRouter } from "next/router";
import React, { useState } from "react";
import { styled } from "../../../stitches.config";
import { H1BoldTabletAndUpStyle, H2BoldTabletAndUpStyle } from "../../../utils/StyledParagraph";
import { Button } from "../../atoms/Button/Button";
import { InputField } from "../../atoms/InputField/InputField";
import { LocationInput } from "../../molecules/LocationInput/LocationInput";

type Props = {
};

const HeaderLayout = styled("div", {
    width: "100%"
});

const Headline = styled("h1", {
    ...H2BoldTabletAndUpStyle
});

const InputFieldLayout = styled("div", {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr",
    gap: "$9x",
    padding: "$2x"
});

const RightColumnLayout = styled("div", {
    gridColumn: "span 2"
})

export const CreateUser: React.FC<Props> = ({ }) => {
    const router = useRouter();
    const[inputs, setInputs] = useState({
        name: "",
        description: "",
        skills: [],
    });

  return (
    <>
        <HeaderLayout>
            <Headline>Create a user</Headline>
        </HeaderLayout>
        <InputFieldLayout>
            <InputField inputType={"text"} onChange={ (value) => {
                setInputs({ ...inputs, name:value })
            }} value={ inputs.name } label="Name" required={true}></InputField>

            <RightColumnLayout>
                <InputField inputType={"date"} onChange={ (value) => {
                    setInputs({ ...inputs, birthdate:value })
                }} value={ inputs.birthdate } label="Birthdate"></InputField>
            </RightColumnLayout>

            { /* Location */ }
            <InputField inputType={"date"} onChange={ (value) => {
                setInputs({ ...inputs, birthdate:value })
            }} value={ inputs.birthdate } label="Location"></InputField>

            { /* Gender */ }
            <InputField inputType={"text"} onChange={ (value) => {
                setInputs({ ...inputs, birthdate:value })
            }} value={ inputs.birthdate } label="Gender"></InputField>

            <InputField inputType={"text"} onChange={ (value) => {
                setInputs({ ...inputs, identifier:value })
            }} value={ inputs.identifier } label="Identifier" required={true}></InputField>

            <InputField inputType={"email"} onChange={ (value) => {
                setInputs({ ...inputs, email:value })
            }} value={ inputs.email } label="E-Mail" required={true}></InputField>

            <RightColumnLayout>
                <InputField inputType={"tel"} onChange={ (value) => {
                    setInputs({ ...inputs, phoneNumber:value })
                }} value={ inputs.phoneNumber } label="Phone-Number"></InputField>
            </RightColumnLayout>

           {/*  <LocationInput></LocationInput> */}

           <Button onClick={() => {
            router.push("/admin/user")
           }}>Create User</Button>
        </InputFieldLayout>
    </>
  );
};
