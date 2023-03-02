import Link from "next/link";
import React from "react";
import { styled } from "../../../stitches.config";
import SvgLogoBig from "../../atoms/svg/SvgLogoBig";
import { UserDropDown } from "../../atoms/UserDropDown/UserDropDown";

type Props = {};

const NavbarLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: "$4x",
  backgroundColor: "$neutral-100",
  height: "11vh",
  boxShadow: "0px 5px 20px rgba(194, 194, 194, 0.25)",

  "@tabletAndDown": {
    flexDirection: "column",
    padding: "$1x",
  }
});

const LogoLayout = styled("div", {
  display: "flex",
  height: "5vh",
});

const StyledLink = styled("a", {
  color: "$brand-500",
  textDecoration: "none",
});

const NavigationItems = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "30px",
});

const UserIconLayout = styled("div", {
  display: "flex",
  width: "3vh",
  height: "3vh",

  color: "$brand-500",
});

export const Navbar: React.FC<Props> = ({}) => {
  return (
    <>
      <NavbarLayout>
        <Link href="/" passHref>
          <StyledLink>
            <LogoLayout>
              <SvgLogoBig></SvgLogoBig>
            </LogoLayout>
          </StyledLink>
        </Link>
        <NavigationItems>
          <Link href="/" passHref>
            <StyledLink>HOME</StyledLink>
          </Link>
          <Link href="/project" passHref>
            <StyledLink>PROJECTS</StyledLink>
          </Link>
          <Link href="/search" passHref>
            <StyledLink>SEARCH</StyledLink>
          </Link>
          <UserDropDown></UserDropDown>
        </NavigationItems>
      </NavbarLayout>
    </>
  );
};
