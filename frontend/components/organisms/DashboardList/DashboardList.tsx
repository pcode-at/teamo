import React from "react";
import { styled } from "../../../stitches.config";
import { getAllUsers, getUser } from "../../../utils/requests/user";
import { useQuery } from "react-query";
import { SimpleUser } from "../../molecules/SimpleUser/SimpleUser";
import { Button } from "../../atoms/Button/Button";
import {
  H1BlackTabletAndUpStyle,
  H1BoldTabletAndUpStyle,
  H2BoldTabletAndUpStyle,
} from "../../../utils/StyledParagraph";
import { useRouter } from "next/router";
import Link from "next/link";
import { IconInfoSection } from "../../molecules/IconInfoSection/IconInfoSection";
import SvgMapPin from "../../atoms/svg/SvgMapPin";
import SvgUser from "../../atoms/svg/SvgUser";

type Props = {};

const DashboardListLayout = styled("div", {
  padding: "$2x $6x $2x $6x",
});

const HeaderLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: "$4x 0 $2x 0",
});

const Headline = styled("h1", {
  ...H2BoldTabletAndUpStyle,
});

const NavigationLayout = styled("div", {
  display: "grid",
  justifyContent: "space-between",
  gridAutoFlow: "column",
  gridTemplateColumns: "repeat(3, minmax(300px, 1fr))",
  gap: "$3x",
  cursor: "pointer",
});

const NavigationOption = styled("div", {
  textAlign: "center",
  backgroundColor: "$neutral-300",
  borderRadius: "$2x",
});

export const DashboardList: React.FC<Props> = ({}) => {
  const router = useRouter();

  return (
    <>
      <DashboardListLayout>
        <HeaderLayout>
          <Headline>Dashboard</Headline>
        </HeaderLayout>
        <NavigationLayout>
          <NavigationOption
            onClick={() => {
              router.push("/admin/user/all-users");
            }}
          >
            <IconInfoSection
              size="large"
              icon={SvgUser}
              label={""}
            ></IconInfoSection>
            All Users
          </NavigationOption>

          <NavigationOption
            onClick={() => {
              router.push("/admin/user/create");
            }}
          >
            <IconInfoSection
              size="large"
              icon={SvgUser}
              label={""}
            ></IconInfoSection>
            Create a new user
          </NavigationOption>

          <NavigationOption
            onClick={() => {
              router.push("/admin/skill/create");
            }}
          >
            <IconInfoSection
              size="large"
              icon={SvgUser}
              label={""}
            ></IconInfoSection>
            Manage skills
          </NavigationOption>
        </NavigationLayout>
      </DashboardListLayout>
    </>
  );
};
