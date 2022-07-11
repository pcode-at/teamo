import React from "react";
import { styled } from "../../../stitches.config";
import type * as Stitches from "@stitches/react";
import { ProfilePageSkill } from "../../molecules/ProfilePageSkill/ProfilePageSkill";

type Props = {
  profileId?: string;
};

const ProfilePageSkillsLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  flexWrap: "wrap",
  gap: "$3x",
});

export const ProfilePageSkills: React.FC<Props> = ({ profileId }) => {
  return (
    <>
      <ProfilePageSkillsLayout>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
        <ProfilePageSkill rating={8}>Ich bin Grogorrrrrr</ProfilePageSkill>
      </ProfilePageSkillsLayout>
    </>
  );
};
