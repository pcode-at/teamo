import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { styled } from "../../../stitches.config";
import { Separator } from "../../atoms/Separator/Separator";
import SvgBriefcase from "../../atoms/svg/SvgBriefcase";
import SvgMapPin from "../../atoms/svg/SvgMapPin";
import { IconInfoSection } from "../IconInfoSection/IconInfoSection";
import { Skill } from "../Skill/Skill";

const BookMarkDropDown = dynamic(
  () => import("../../atoms/BookMarkDropDown/BookMarkDropDown")
);

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
  showSkills?: boolean;
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

const Name = styled("a", {
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "$brand-500",
  cursor: "pointer",
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

export const SearchResultItem: React.FC<Props> = ({
  user,
  showSkills = true,
}) => {
  return (
    <>
      <SearchResultItemLayout>
        <SearchResultItemInfoLayout>
          <Link href={`/profile/${user.identifier}`}>
            <Name>{user.name}</Name>
          </Link>
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
        {showSkills && (
          <SearchResultItemSkillsLayout>
            {user.skills.map((skill, index) => (
              <Skill key={index} opacity={skill.opacity} rating={skill.rating}>
                {skill.skill.name}
              </Skill>
            ))}
          </SearchResultItemSkillsLayout>
        )}
      </SearchResultItemLayout>
    </>
  );
};
