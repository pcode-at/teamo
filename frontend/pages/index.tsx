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

export default function Home() {
    const Router = useRouter();

    const [user, setUser] = useState(undefined);

    if(!user) {
  getUser()
    .then((user) => {
      console.log(user);
        setUser(user);
    })
    .catch(() => {});
    }

  return (
    <>
      <Navbar></Navbar>

      {user && (
        <>
            <h1>Hello {user.name}</h1>
            <p>You are logged in</p>
            <Button onClick={() => {
                logout();
                Router.push("/login");
            }
            }>Logout</Button>
        </>
      )}
    </>
  );
}
