import React from "react";
import { styled } from "../../../stitches.config";
import { useQuery } from "react-query";
import { getWorkHours } from "../../../utils/requests/user";
import { PersonalInfoTextTitle } from "../ProfilePageInfoSection/ProfilePageInfoSection";

type Props = {
  profileId?: string;
};

const ProfilePageSkillsLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  width: "100%",
  flexWrap: "wrap",
  gap: "$3x",
});

const HoursLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "3fr 1fr",
  gap: "$5x",
  padding: "$1x 0",
});

export const ProfilePageHours: React.FC<Props> = ({ profileId }) => {
  const { data: hours, status } = useQuery(["profileHours", profileId], () =>
    getWorkHours(profileId)
  );

  if (status === "loading") {
    return <div>Loading working hours...</div>;
  }

  if (status === "error") {
    return <div>Error loading working hours</div>;
  }

  return (
    <>
      <ProfilePageSkillsLayout>
        <PersonalInfoTextTitle>Available hours</PersonalInfoTextTitle>
        <HoursLayout>
          <b>Date</b>
          <b>Hours/Week</b>
          {hours.map((hour) => (
            <>
              <div>{new Date(hour.date).toLocaleDateString()}</div>
              <div>{hour.hours}</div>
            </>
          ))}
        </HoursLayout>
      </ProfilePageSkillsLayout>
    </>
  );
};
