import { ProjectsList } from "../../../components/organisms/ProjectsList/ProjectsList";
import { Navbar } from "../../../components/organisms/Navbar/Navbar";
import { styled } from "../../../stitches.config";
import { ProjectDetails } from "../../../components/organisms/ProjectDetails/ProjectDetails";

export const ContentLayout = styled("div", {
  display: "flex",
  maxWidth: "1200px",
  flexDirection: "column",
  gap: "0",
  margin: "0 auto",
  padding: "$8x 0",
});

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <ContentLayout>
        <ProjectDetails></ProjectDetails>
      </ContentLayout>
    </>
  );
}
