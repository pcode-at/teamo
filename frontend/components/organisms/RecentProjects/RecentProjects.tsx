import React from "react";
import { useQuery } from "react-query";
import { getProjects, getRecentProjects } from "../../../utils/requests/project";
import { useRouter } from "next/router";
import { H2BoldTabletAndUpStyle } from "../../../utils/StyledParagraph";
import { styled } from "../../../stitches.config";
import { Button } from "../../atoms/Button/Button";
import Link from "next/link";
import { ProjectItem } from "../../molecules/ProjectItem/ProjectItem";
import SvgEye from "../../atoms/svg/SvgEye";
import Skeleton from "react-loading-skeleton";

type Props = {};

const ListLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "$4x",
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

const ListTitle = styled("h2", {
  ...H2BoldTabletAndUpStyle,
});

const ListItems = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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

export const RecentProjects: React.FC<Props> = ({}) => {
  const router = useRouter();

  const { data: projects, status } = useQuery(["project"], () => {
    return getProjects();
  });
  
  return (
    <>
    <ListLayout>
      <HeaderLayout>
        <ListTitle>Recent Projects</ListTitle>
        <Button leftIcon={SvgEye} size={"small"} onClick={() => {
          router.push("project");
        }}>View all</Button>
      </HeaderLayout>
      <ListItems>
        {status == "success" && projects.slice(0, 4).map((item) => (
          <Link key={item.id} href={`/project/${item.id}`} passHref>
            <StyledLink>
              <ProjectItem title={item.name} subtitle={item.description} />
            </StyledLink>
          </Link>
        ))}
        {status == "loading" && (
          <>
            <Skeleton width="100%" height={100}></Skeleton>
            <Skeleton width="100%" height={100}></Skeleton>
            <Skeleton width="100%" height={100}></Skeleton>
            <Skeleton width="100%" height={100}></Skeleton>
            <Skeleton width="100%" height={100}></Skeleton>
            <Skeleton width="100%" height={100}></Skeleton>
          </>
        )}
        {status == "error" && <div>Error</div>}
      </ListItems>
    </ListLayout>
    </>
  );
};
