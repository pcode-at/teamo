import React from "react";
import { BackLink } from "../../molecules/BackLink/BackLink";
import { HeaderLink } from "../../molecules/HeaderLink/HeaderLink";
import SvgSliders from "../../atoms/svg/SvgSliders";
import {Spacer} from "../../atoms/Spacer/Spacer";
import { Separator } from "../../atoms/Separator/Separator";
import { SubHeading } from "../../atoms/SubHeading/SubHeading";
import { useQuery } from "react-query";
import { getProject } from "../../../utils/requests/project";
import { useRouter } from "next/router";

type Props = {};

export const ProjectDetails: React.FC<Props> = ({}) => {
  const router = useRouter();

  const { data: project, status } = useQuery(["project"], () => {
    return getProject(router.query.projectId as string);
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  console.log(project);
  
  return (
    <>
      <BackLink href={"/project"} label={"Back to projects"}></BackLink>
      <Spacer size="1x" axis="vertical"></Spacer>
      <HeaderLink title={project.name} subtitle={project.description} icon={SvgSliders} iconOnClick={() => {}} />
      <Spacer size="7x" axis="vertical"></Spacer>
      <Separator width={"big"} alignment={"left"}></Separator>
      <Spacer size="7x" axis="vertical"></Spacer>
      <SubHeading>
        Skills
      </SubHeading>
      <Spacer size="7x" axis="vertical"></Spacer>
      <Separator width={"big"} alignment={"left"}></Separator>
    </>
  );
};
