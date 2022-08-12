import { styled } from "../../stitches.config";
import { Navbar } from "../../components/organisms/Navbar/Navbar";
import { ProfilePageInfoSection } from "../../components/organisms/ProfilePageInfoSection/ProfilePageInfoSection";
import { ProfilePageSkills } from "../../components/organisms/ProfilePageSkills/ProfilePageSkills";
import { Spacer } from "../../components/atoms/Spacer/Spacer";
import { ContentLayout } from "../project/[projectId]";

const ProfileLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$3x",
});

export default function Profile() {
  return (
    <>
      <Navbar></Navbar>

      <ContentLayout>
        <ProfileLayout>
          <ProfilePageInfoSection></ProfilePageInfoSection>
          <ProfilePageSkills></ProfilePageSkills>
        </ProfileLayout>
      </ContentLayout>
      <Spacer size="9x" axis="vertical"></Spacer>
    </>
  );
}
