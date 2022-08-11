import { Navbar } from "../../components/organisms/Navbar/Navbar";
import { ContentLayout } from "./[projectId]";
import { ProjectForm } from "../../components/organisms/ProjectForm/ProjectForm";
import { createProject } from "../../utils/requests/project";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <ContentLayout>
        <ProjectForm
          saveFunction={(project) => {
            try {
              createProject(project);
            } catch (e) {
              alert("something went wrong");
            }
          }}
          defaultInput={{
            name: "",
            description: "",
            skills: [],
          }}
          siteName={"Create project"}
        ></ProjectForm>
      </ContentLayout>
    </>
  );
}
