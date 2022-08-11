import React, { useEffect } from "react";
import { styled } from "../../../stitches.config";
import { BookMarkDropDown } from "../../atoms/BookMarkDropDown/BookMarkDropDown";
import { InputField } from "../../atoms/InputField/InputField";
import { Separator } from "../../atoms/Separator/Separator";
import SvgBookmark from "../../atoms/svg/SvgBookmark";
import SvgBriefcase from "../../atoms/svg/SvgBriefcase";
import SvgCross from "../../atoms/svg/SvgCross";
import SvgMapPin from "../../atoms/svg/SvgMapPin";
import SvgMove2 from "../../atoms/svg/SvgMove2";
import { IconInfoSection } from "../IconInfoSection/IconInfoSection";
import { Skill } from "../Skill/Skill";

export type User = {
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
    opacity: number;
    skill: {
      name: string;
    };
  }[];
};

type Props = {
  user: User;
};

const SearchResultItemLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "3fr 1fr 9fr",
  width: "100%",
  gap: "$2x",
  borderRadius: "$2x",
  backgroundColor: "$neutral-200",
  padding: "$2x",
  boxShadow: "$shadow-1",
  border: "$border-1",
  transition: "all 0.2s",
});

const SearchResultItemSkillsLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  flexFlow: "row wrap",
  width: "100%",
  gap: "$2x",
});

const SearchResultItemInfoLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$2x",
  minWidth: "230px",
});

const Name = styled("span", {
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "$brand-500",
});

const SeparatorLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
});

const InformationLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "$3x",
});

const IconButtonLayout = styled("div", {});

const IconButton = styled("button", {
  display: "flex",
  width: "36px",
  height: "36px",
  padding: "$1x",
  border: "none",
  backgroundColor: "$neutral-100",
  borderRadius: "100%",
  color: "$brand-500",
  transition: "all 0.2s",
  cursor: "pointer",

  "&:hover": {
    backgroundColor: "$brand-100",
  },
});

const IconLayout = styled("div", {
  display: "flex",
  width: "20px",
  height: "20px",
});

export const SearchResultItem: React.FC<Props> = ({ user }) => {
  return (
    <>
      <SearchResultItemLayout>
        <SearchResultItemInfoLayout>
          <Name>{user.name}</Name>
          <InformationLayout>
            <IconInfoSection
              size="small"
              icon={SvgBriefcase}
              label="UI/UX"
            ></IconInfoSection>
            <IconInfoSection
              size="small"
              icon={SvgMapPin}
              label={user.location}
            ></IconInfoSection>
          </InformationLayout>
          <BookMarkDropDown userId={user.identifier}></BookMarkDropDown>
        </SearchResultItemInfoLayout>
        <SeparatorLayout>
          <Separator
            width={"big"}
            alignment={"center"}
            orientation="vertical"
          ></Separator>
        </SeparatorLayout>
        <SearchResultItemSkillsLayout>
          {user.skills.map((skill, index) => (
            <Skill key={index} opacity={skill.opacity} rating={skill.rating}>
              {skill.skill.name}
            </Skill>
          ))}
        </SearchResultItemSkillsLayout>
      </SearchResultItemLayout>
    </>
  );
};
