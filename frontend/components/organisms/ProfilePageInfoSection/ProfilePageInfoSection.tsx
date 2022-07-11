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

type Props = {
  profileId?: string;
};

const GeneralInfoLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 3fr",
  gap: "10px",
  padding: "10px",
  lineHeight: "1",
  fontWeight: "500",
  borderRadius: "10px",

  color: "$neutral-100",
  fontSize: "15px",
});

const GeneralInfoText = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  borderRadius: "10px",

  color: "$neutral-800",
  fontSize: "15px",
  lineHeight: "1",
  fontWeight: "500",
});

const GeneralInfoTextTitle = styled("div", {
  fontSize: "20px",
});

const GeneralInfoTextSubtitle = styled("div", {
  fontSize: "15px",
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
          <GeneralInfoTextSubtitle>UI / UX</GeneralInfoTextSubtitle>
          <GeneralInfoTextSubtitle>Design</GeneralInfoTextSubtitle>
          <GeneralInfoTextSubtitle>{profile.location}</GeneralInfoTextSubtitle>
        </GeneralInfoText>
      </GeneralInfoLayout>
      <Separator width={"big"} alignment={"center"}></Separator>
      <GeneralInfoText>
        <GeneralInfoTextTitle>Personal</GeneralInfoTextTitle>
        <IconInfoSection
          icon={SvgCalendar}
          label={"Employee since: 2018"}
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
      </GeneralInfoText>
      <Separator width={"big"} alignment={"center"}></Separator>
    </>
  );
};
