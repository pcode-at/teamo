import React, { useEffect } from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/InputField/InputField";
import SvgCross from "../../atoms/svg/SvgCross";
import SvgMove2 from "../../atoms/svg/SvgMove2";
import { ProfilePageSkill } from "../ProfilePageSkill/ProfilePageSkill";

type Props = {
  user: {
    birthDate: Date;
    departments: string[];
    email: string;
    gender: string;
    identifier: string;
    location: string;
    phoneNumber: string;
    name: string;
    photo: string;
    roles: string[];
    projectIds: string[];
    bookmarkedInIds: string[];
    projectsIds: string[];
    score?: number;
    skills: {
      rating: string;
      skill: {
        name: string;
      };
    }[];
  };
};

const SearchResultItemLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "$2x",
  borderRadius: "$2x",
  backgroundColor: "$brand-100",
  padding: "$2x",
  boxShadow: "$shadow-1",
  border: "$border-1",
  cursor: "pointer",
  transition: "all 0.2s",
  "&:hover": {
    backgroundColor: "$brand-200",
  },
});

const SearchResultItemSkillsLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  flexFlow: "row wrap",
  width: "100%",
  gap: "$2x",
});

export const SearchResultItem: React.FC<Props> = ({ user }) => {
  console.log(user);
  return (
    <>
      <SearchResultItemLayout>
        {user.name}
        <br />

        <SearchResultItemSkillsLayout>
          {user.skills.map((skill, index) => (
            <ProfilePageSkill key={index} rating={Number(skill.rating)}>
              {skill.skill.name}
            </ProfilePageSkill>
          ))}
        </SearchResultItemSkillsLayout>
      </SearchResultItemLayout>
    </>
  );
};
