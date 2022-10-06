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
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";

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

  "@laptopAndDown": {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

const ListTitle = styled("h1", {
  ...H1BoldTabletAndUpStyle,
});

const ListItems = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  width: "100%",
  gap: "$8x",

  "@tabletAndDown": {
    gap: "$4x",
  },
});

const StyledLink = styled("a", {
  textDecoration: "none",
  color: "$neutral-800",
});

export const ProjectsList: React.FC<Props> = ({}) => {
  const router = useRouter();
  const { data: projects, status } = useQuery(["projects"], getProjects, {
    refetchInterval: 5000,
  });

  return (
    <>
      <ListLayout>
        <HeaderLayout>
          <ListTitle>All Projects</ListTitle>
          <Button
            leftIcon={SvgPlus}
            size={"small"}
            onClick={() => {
              router.push("/project/create");
            }}
          >
            Create project
          </Button>
        </HeaderLayout>
        <ListItems>
          {status == "success" &&
            projects.map((item) => (
              <Link key={item.id} href={`/project/${item.id}`} passHref>
                <StyledLink>
                  <ProjectItem title={item.name} subtitle={item.description} />
                </StyledLink>
              </Link>
            ))}
          {status == "loading" && (
            <>
              <Skeleton width="100%" height={120}></Skeleton>
              <Skeleton width="100%" height={120}></Skeleton>
              <Skeleton width="100%" height={120}></Skeleton>
              <Skeleton width="100%" height={120}></Skeleton>
              <Skeleton width="100%" height={120}></Skeleton>
              <Skeleton width="100%" height={120}></Skeleton>
              <Skeleton width="100%" height={120}></Skeleton>
              <Skeleton width="100%" height={120}></Skeleton>
              <Skeleton width="100%" height={120}></Skeleton>
              <Skeleton width="100%" height={120}></Skeleton>
              <Skeleton width="100%" height={120}></Skeleton>
              <Skeleton width="100%" height={120}></Skeleton>
            </>
          )}
          {status == "error" && <div>Error</div>}
        </ListItems>
      </ListLayout>
    </>
  );
};
