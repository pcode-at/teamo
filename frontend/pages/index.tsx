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
import { ContentLayout } from "./project/[projectId]";
import { SpecialSearchButton } from "../components/organisms/SpecialSearchButton/SpecialSearchButton";

export default function Home() {

  return (
    <>
      <Navbar></Navbar>

      <ContentLayout>
        <SpecialSearchButton></SpecialSearchButton>
      </ContentLayout>
    </>
  );
}
