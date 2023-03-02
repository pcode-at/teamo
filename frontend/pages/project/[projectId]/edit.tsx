import { Navbar } from "../../../components/organisms/Navbar/Navbar";
import { ContentLayout } from "./.";
import { ProjectForm } from "../../../components/organisms/ProjectForm/ProjectForm";
import { getProject, updateProject } from "../../../utils/requests/project";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function Home() {
  const router = useRouter();

  const projectId = router.query.projectId as string;

  const { data: project, status } = useQuery(["project", projectId], () => {
    return getProject(projectId);
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <>
      <Navbar></Navbar>
      <ContentLayout>
        <ProjectForm
          saveFunction={(project) => {
            try {
              updateProject(project, projectId);
            } catch (e) {
              alert("something went wrong");
            }
          }}
          defaultInput={{
            name: project.name,
            description: project.description,
            skills: project.skills.map((skill) => {
              return {
                id: skill.skillId,
                name: skill.name,
              };
            }),
          }}
          siteName={"Edit project"}
        ></ProjectForm>
      </ContentLayout>
    </>
  );
}
