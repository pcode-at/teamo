import { styled } from "../../stitches.config";
import { Navbar } from "../../components/organisms/Navbar/Navbar";
import { ProfilePageInfoSection } from "../../components/organisms/ProfilePageInfoSection/ProfilePageInfoSection";
import { ProfilePageSkills } from "../../components/organisms/ProfilePageSkills/ProfilePageSkills";
import { Spacer } from "../../components/atoms/Spacer/Spacer";
import { useRouter } from "next/router";
import { ContentLayout } from "../project/[projectId]";
import { ProfilePageHours } from "../../components/organisms/ProfilePageHours/ProfilePageHours";

const ProfileLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$3x",
});

const SkillsHoursLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "$3x",

  "@laptopAndDown": {
    gridTemplateColumns: "1fr",
  },
});

export default function Profile() {
  const router = useRouter();

  const profileId = router.query.profileId as string;

  return (
    <>
      <Navbar></Navbar>

      <ContentLayout>
        <ProfileLayout>
          <ProfilePageInfoSection
            profileId={profileId}
          ></ProfilePageInfoSection>
          <SkillsHoursLayout>
            <ProfilePageSkills profileId={profileId}></ProfilePageSkills>
            <ProfilePageHours profileId={profileId}></ProfilePageHours>
          </SkillsHoursLayout>
        </ProfileLayout>
      </ContentLayout>
      <Spacer size="9x" axis="vertical"></Spacer>
    </>
  );
}
