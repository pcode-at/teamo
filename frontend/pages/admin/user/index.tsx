import dynamic from "next/dynamic";
import { useEffect } from "@storybook/addons";
import { useState } from "react";
import { useRouter } from "next/router";
import { Navbar } from "../../../components/organisms/Navbar/Navbar";
import { UserList } from "../../../components/organisms/UserList/UserList";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>

      <UserList>
        
      </UserList>
    </>
  );
}
