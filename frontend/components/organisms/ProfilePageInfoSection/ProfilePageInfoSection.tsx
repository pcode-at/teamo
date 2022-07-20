import React from "react";
import { styled } from "../../../stitches.config";
import type * as Stitches from "@stitches/react";
import { Avatar } from "../../atoms/Avatar/Avatar";
import { Separator } from "../../atoms/Separator/Separator";
import { IconInfoSection } from "../../molecules/IconInfoSection/IconInfoSection";
import SvgCalendar from "../../atoms/svg/SvgCalendar";
import { getUser } from "../../../utils/requests/user";
import { useQuery } from "react-query";
import SvgMail from "../../atoms/svg/SvgMail";
import SvgPhone from "../../atoms/svg/SvgPhone";
import {
  BodyDefaultTabletAndUpStyle,
  H2BoldTabletAndUpStyle,
  H3BoldTabletAndUpStyle,
} from "../../../utils/StyledParagraph";
import SvgMapPin from "../../atoms/svg/SvgMapPin";
import SvgBriefcase from "../../atoms/svg/SvgBriefcase";
import { Spacer } from "../../atoms/Spacer/Spacer";

type Props = {
  profileId?: string;
};

const GeneralInfoLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 3fr",
  gap: "10px",
  padding: "10px",
  borderRadius: "10px",

  color: "$neutral-100",
});

const GeneralInfoText = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  borderRadius: "10px",

  color: "$neutral-800",
});

const IconInfoLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  gap: "$9x",
});

const GeneralInfoTextTitle = styled("h2", {
  ...H2BoldTabletAndUpStyle,
});

const PersonalInfoTextTitle = styled("h3", {
  ...H3BoldTabletAndUpStyle,
});

const GeneralInfoTextSubtitle = styled("div", {
  ...BodyDefaultTabletAndUpStyle,
});

const AvatarLayout = styled("div", {
  display: "flex",
  padding: "$4x",
});

export const ProfilePageInfoSection: React.FC<Props> = ({ profileId }) => {
  const { data: profile, status } = useQuery("profile", getUser);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  console.log(profile);

  return (
    <>
      <GeneralInfoLayout>
        <AvatarLayout>
          <Avatar name={profile.name}></Avatar>
        </AvatarLayout>
        <GeneralInfoText>
          <GeneralInfoTextTitle>{profile.name}</GeneralInfoTextTitle>
          <IconInfoSection
            icon={SvgBriefcase}
            label={"UI / UX"}
          ></IconInfoSection>
        </GeneralInfoText>
      </GeneralInfoLayout>
      <Spacer size="3x"></Spacer>
      <Separator width={"big"} alignment={"center"}></Separator>
      <Spacer size="3x"></Spacer>
      <PersonalInfoTextTitle>Personal Info</PersonalInfoTextTitle>
      <IconInfoLayout>
        <IconInfoSection
          icon={SvgCalendar}
          label={"Employee since: 2018"}
        ></IconInfoSection>
        <IconInfoSection
          icon={SvgMapPin}
          label={profile.location}
        ></IconInfoSection>
        <IconInfoSection
          icon={SvgMail}
          label={profile.email}
          href={`mailto:${profile.email}`}
        ></IconInfoSection>
        <IconInfoSection
          icon={SvgPhone}
          label={profile.phoneNumber}
          href={`tel:${profile.phoneNumber}`}
        ></IconInfoSection>
      </IconInfoLayout>
      <Spacer size="3x"></Spacer>
      <Separator width={"big"} alignment={"center"}></Separator>
      <Spacer size="3x"></Spacer>
      <PersonalInfoTextTitle>Skills</PersonalInfoTextTitle>
    </>
  );
};
