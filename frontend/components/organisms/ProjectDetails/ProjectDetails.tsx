import React from "react";
import { BackLink } from "../../molecules/BackLink/BackLink";
import { HeaderLink } from "../../molecules/HeaderLink/HeaderLink";
import SvgSliders from "../../atoms/svg/SvgSliders";
import { Spacer } from "../../atoms/Spacer/Spacer";
import { Separator } from "../../atoms/Separator/Separator";
import { SubHeading } from "../../atoms/SubHeading/SubHeading";
import { useQuery } from "react-query";
import {
  getBookmarksOfProject,
  getProject,
} from "../../../utils/requests/project";
import { useRouter } from "next/router";
import { getRecommendation } from "../../../utils/requests/search";
import { Skill } from "../../molecules/Skill/Skill";
import { styled } from "../../../stitches.config";
import { SearchResultItem } from "../../molecules/SearchResultItem/SearchResultItem";
import Skeleton from "react-loading-skeleton";
import {
  H3BoldTabletAndUpStyle,
} from "../../../utils/StyledParagraph";
import Link from "next/link";
import { SimpleUser } from "../../molecules/SimpleUser/SimpleUser";

type Props = {};

const ProfilePageSkillsLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  flexWrap: "wrap",
  gap: "$3x",
});

const RecommendationsLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gridGap: "$2x",
  width: "100%",
  height: "fit-content",
  maxHeight: "100%",
});

const ListLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "$4x",
});

const ListTitle = styled("h2", {
  ...H3BoldTabletAndUpStyle,
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

export const ProjectDetails: React.FC<Props> = ({}) => {
  const router = useRouter();
  const projectId = router.query.projectId as string;

  const { data: project, status } = useQuery(
    ["project", projectId],
    () => {
      return getProject(projectId);
    },
    {
      enabled: !!projectId,
    }
  );
  const { data: recommendation, status: recommendationStatus } = useQuery(
    ["recommend", projectId],
    () => {
      return getRecommendation(projectId);
    },
    {
      enabled: !!projectId,
    }
  );
  const { data: bookmarks, status: bookmarksStatus } = useQuery(
    ["bookmarks", projectId],
    () => {
      return getBookmarksOfProject(projectId);
    },
    {
      enabled: !!projectId,
    }
  );

  if (status === "error" || recommendationStatus === "error") {
    return (
      <>
        <BackLink href={"/project"} label={"Back to projects"}></BackLink>
        <Spacer size="1x" axis="vertical"></Spacer>
        <p>An error occurred while loading the data, please try again.</p>
      </>
    );
  }

  console.log(bookmarks);

  return (
    <>
      <BackLink href={"/project"} label={"Back to projects"}></BackLink>
      <Spacer size="1x" axis="vertical"></Spacer>
      {status === "success" && (
        <HeaderLink
          title={project.name}
          subtitle={project.description}
          icon={SvgSliders}
          iconOnClick={() => {
            router.push(`/project/${projectId}/edit`);
          }}
        />
      )}
      {status == "loading" && <Skeleton width={280} height={70}></Skeleton>}
      <Spacer size="7x" axis="vertical"></Spacer>
      {status == "success" && project.skills.length > 0 && (
        <>
          <Separator width={"big"} alignment={"left"}></Separator>
          <Spacer size="7x" axis="vertical"></Spacer>
          <SubHeading>Skills</SubHeading>
          <Spacer size="1x" axis="vertical"></Spacer>
          <ProfilePageSkillsLayout>
            {project.skills.map((skill) => (
              <Skill key={skill.id}>{skill.name}</Skill>
            ))}
          </ProfilePageSkillsLayout>
        </>
      )}
      {status == "loading" && (
        <>
          <Separator width={"big"} alignment={"left"}></Separator>
          <Spacer size="7x" axis="vertical"></Spacer>
          <ProfilePageSkillsLayout>
            <SubHeading>Skills</SubHeading>
            <Spacer size="1x" axis="vertical"></Spacer>
            <Skeleton width={150} height={50}></Skeleton>
            <Skeleton width={150} height={50}></Skeleton>
            <Skeleton width={150} height={50}></Skeleton>
            <Skeleton width={150} height={50}></Skeleton>
            <Skeleton width={150} height={50}></Skeleton>
            <Skeleton width={150} height={50}></Skeleton>
          </ProfilePageSkillsLayout>
        </>
      )}
      <Spacer size="7x" axis="vertical"></Spacer>
      {recommendationStatus == "success" && recommendation.users.length > 0 && (
        <>
          <Separator width={"big"} alignment={"left"}></Separator>
          <Spacer size="7x" axis="vertical"></Spacer>
          <SubHeading>Recommendations</SubHeading>
          <Spacer size="1x" axis="vertical"></Spacer>
          <RecommendationsLayout>
            {recommendation.users[0]?.map((user, index) => {
              return (
                <>
                  <SearchResultItem user={user} showSkills={false} />
                </>
              );
            })}
          </RecommendationsLayout>
        </>
      )}
      {recommendationStatus == "loading" && (
        <>
          <Separator width={"big"} alignment={"left"}></Separator>
          <Spacer size="7x" axis="vertical"></Spacer>
          <SubHeading>Recommendations</SubHeading>
          <Spacer size="1x" axis="vertical"></Spacer>
          <RecommendationsLayout>
            <Skeleton width={"100%"} height={165}></Skeleton>
            <Skeleton width={"100%"} height={165}></Skeleton>
            <Skeleton width={"100%"} height={165}></Skeleton>
          </RecommendationsLayout>
        </>
      )}
      <ListLayout>
        <Spacer size="3x" axis="vertical"></Spacer>
        <Separator width={"big"} alignment={"left"}></Separator>
        <ListTitle>Bookmarks</ListTitle>
        <ListItems>
          {bookmarksStatus == "success" &&
            bookmarks.bookmarks.map((user) => (
              <Link
                key={user.identifier}
                href={`/profile/${user.identifier}`}
                passHref
              >
                <StyledLink>
                  <SimpleUser user={user} />
                </StyledLink>
              </Link>
            ))}
          {bookmarksStatus == "loading" && (
            <>
              <Skeleton width="100%" height={130}></Skeleton>
              <Skeleton width="100%" height={130}></Skeleton>
              <Skeleton width="100%" height={130}></Skeleton>
              <Skeleton width="100%" height={130}></Skeleton>
              <Skeleton width="100%" height={130}></Skeleton>
              <Skeleton width="100%" height={130}></Skeleton>
            </>
          )}
          {bookmarksStatus == "error" && <div>Error</div>}
        </ListItems>
      </ListLayout>
    </>
  );
};
