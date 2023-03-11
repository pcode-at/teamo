import { Navbar } from "../../../components/organisms/Navbar/Navbar";
import { ContentLayout } from "./.";
import { ProjectForm } from "../../../components/organisms/ProjectForm/ProjectForm";
import { getProject, updateProject } from "../../../utils/requests/project";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { BackLink } from "../../../components/molecules/BackLink/BackLink";
import Skeleton from "react-loading-skeleton";
import { Spacer } from "../../../components/atoms/Spacer/Spacer";

export default function Home() {
  const router = useRouter();

  const projectId = router.query.projectId as string;

  const { data: project, status } = useQuery(["project", projectId], () => {
    return getProject(projectId);
  });

  if (status === "loading") {
    return (
      <>
        <Navbar></Navbar>
        <ContentLayout>
          <BackLink
            href={"/project/" + projectId}
            label="Back to project"
          ></BackLink>
          <Spacer size={"3x"} axis="vertical"></Spacer>
          <Skeleton width="50%" height={50}></Skeleton>
          <Spacer size={"3x"} axis="vertical"></Spacer>
          <Skeleton width="100%" height={80}></Skeleton>
          <Spacer size={"6x"} axis="vertical"></Spacer>
          <Skeleton width="50%" height={50}></Skeleton>
        </ContentLayout>
      </>
    );
  }

  if (status === "error") {
    return (
      <>
        <Navbar></Navbar>
        <ContentLayout>
          <BackLink
            href={"/project/" + projectId}
            label="Back to project"
          ></BackLink>
          <Spacer size={"3x"} axis="vertical"></Spacer>
          <p>An error has occurred, please try again</p>
        </ContentLayout>
      </>
    );
  }

  return (
    <>
      <Navbar></Navbar>
      <ContentLayout>
        <ProjectForm
          saveFunction={(project) => {
            try {
              return updateProject(project, projectId);
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
