import { styled } from "../../stitches.config";
import { Navbar } from "../../components/organisms/Navbar/Navbar";
import { ProfilePageInfoSection } from "../../components/organisms/ProfilePageInfoSection/ProfilePageInfoSection";
import { ProfilePageSkills } from "../../components/organisms/ProfilePageSkills/ProfilePageSkills";
import { Spacer } from "../../components/atoms/Spacer/Spacer";
import { useRouter } from "next/router";

const ContentLayout = styled("div", {
  display: "flex",
  maxWidth: "1200px",
  flexDirection: "column",
  gap: "$3x",
  margin: "0 auto",
});

export default function Home() {
    const router = useRouter();

    const profileId = router.query.profileId as string;

  return (
    <>
      <Navbar></Navbar>

      <ContentLayout>
        <ProfilePageInfoSection profileId={profileId}></ProfilePageInfoSection>
        <ProfilePageSkills profileId={profileId}></ProfilePageSkills>
      </ContentLayout>
      <Spacer size="9x" axis="vertical"></Spacer>
    </>
  );
}
