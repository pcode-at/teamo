import { styled } from "../stitches.config";
import dynamic from "next/dynamic";
import { LoginForm } from "../components/molecules/LoginForm/LoginForm";
import { useEffect } from "@storybook/addons";
import { getUser } from "../utils/requests/user";
import { Navbar } from "../components/organisms/Navbar/Navbar";
import { useState } from "react";
import { logout } from "../utils/authHelper";
import { useRouter } from "next/router";
import { Button } from "../components/atoms/Button/Button";
import { ProfilePageInfoSection } from "../components/organisms/ProfilePageInfoSection/ProfilePageInfoSection";
import { ProfilePageSkills } from "../components/organisms/ProfilePageSkills/ProfilePageSkills";
import { SearchBar } from "../components/organisms/SearchBar/SearchBar";

const SearchLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  width: "100%",
  height: "100%",
});

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <SearchLayout>
        <SearchBar></SearchBar>
      </SearchLayout>
    </>
  );
}