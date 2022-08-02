import { styled } from "../../stitches.config";
import { Navbar } from "../../components/organisms/Navbar/Navbar";
import { ProfilePageInfoSection } from "../../components/organisms/ProfilePageInfoSection/ProfilePageInfoSection";
import { ProfilePageSkills } from "../../components/organisms/ProfilePageSkills/ProfilePageSkills";
import { Spacer } from "../../components/atoms/Spacer/Spacer";

const ContentLayout = styled("div", {
  display: "flex",
  maxWidth: "1200px",
  flexDirection: "column",
  gap: "$3x",
  margin: "0 auto",
});

export default function Home() {
  return (
    <>
      <Navbar></Navbar>

      <ContentLayout>
        <ProfilePageInfoSection></ProfilePageInfoSection>
        <ProfilePageSkills></ProfilePageSkills>
      </ContentLayout>
      <Spacer size="9x" axis="vertical"></Spacer>
    </>
  );
}
