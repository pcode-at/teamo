import React from "react";
import { styled } from "../../../stitches.config";
import type * as Stitches from "@stitches/react";
import { Skill } from "../../molecules/Skill/Skill";
import { useQuery } from "react-query";
import { getUser } from "../../../utils/requests/user";
import { PersonalInfoTextTitle } from "../ProfilePageInfoSection/ProfilePageInfoSection";

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
  const { data: profile, status } = useQuery(["profile", profileId], () =>
    getUser(profileId)
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <>
      <ProfilePageSkillsLayout>
        <PersonalInfoTextTitle>Skills</PersonalInfoTextTitle>
        {profile.skills.map((skill) => (
          <Skill key={skill.id} rating={skill.rating}>
            {skill.skill.name}
          </Skill>
        ))}
      </ProfilePageSkillsLayout>
    </>
  );
};
