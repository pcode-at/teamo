import React from "react";
import { styled } from "../../../stitches.config";
import type * as Stitches from "@stitches/react";
import { Button } from "../../atoms/Button/Button";
import Link from "next/link";
import { ProjectItem } from "../../molecules/ProjectItem/ProjectItem";
import { getProjects } from "../../../utils/requests/project";
import { useQuery } from "react-query";
import SvgPlus from "../../atoms/svg/SvgPlus";
import { H1BoldTabletAndUpStyle } from "../../../utils/StyledParagraph";

type Props = {};

const ListLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "$6x 5vw",
  gap: "$2x",
});

const HeaderLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

const ListTitle = styled("h1", {
  ...H1BoldTabletAndUpStyle,
});

const ListItems = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  width: "100%",
  gap: "$8x",
});

const StyledLink = styled("a", {
  textDecoration: "none",
  color: "$neutral-800",
});

export const ProjectsList: React.FC<Props> = ({}) => {
  const { data: projects, status } = useQuery(["projects"], getProjects);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <>
      <ListLayout>
        <HeaderLayout>
          <ListTitle>All Projects</ListTitle>
          <Button leftIcon={SvgPlus}>Create project</Button>
        </HeaderLayout>
        <ListItems>
          {projects.map((item) => (
            <Link key={item.id} href={`/project/${item.id}`} passHref>
              <StyledLink>
                <ProjectItem title={item.name} subtitle={item.description} />
              </StyledLink>
            </Link>
          ))}
        </ListItems>
      </ListLayout>
    </>
  );
};
