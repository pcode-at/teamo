import React from "react";
import { styled } from "../../../stitches.config";
import type * as Stitches from "@stitches/react";
import { Skill } from "../../molecules/Skill/Skill";
import { useQuery } from "react-query";
import { getUser } from "../../../utils/requests/user";

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
  const { data: profile, status } = useQuery("profile", getUser);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }
  /* {
    "id": "62d00aa0ba7c01082ad3ecd4",
    "rating": "9",
    "skillsId": "62ce771df6b3d5251eb5ab6b",
    "identifier": "62ce7e03f6b3d5251eb5ab8e",
    "skill": {
        "id": "62ce771df6b3d5251eb5ab6b",
        "name": "Java",
    }
}*/
  return (
    <>
      <ProfilePageSkillsLayout>
        {profile.skills.map((skill) => (
          <Skill key={skill.id} rating={skill.rating}>
            {skill.skill.name}
          </Skill>
        ))}
      </ProfilePageSkillsLayout>
    </>
  );
};
