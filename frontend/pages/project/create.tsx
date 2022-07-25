import { ProjectsList } from "../../components/organisms/ProjectsList/ProjectsList";
import { Navbar } from "../../components/organisms/Navbar/Navbar";
import { styled } from "../../stitches.config";
import { ProjectDetails } from "../../components/organisms/ProjectDetails/ProjectDetails";
import { ContentLayout } from "./[projectId]";
import { CreateProject } from "../../components/organisms/CreateProject/CreateProject";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <ContentLayout>
        <CreateProject></CreateProject>
      </ContentLayout>
    </>
  );
}
