import { styled } from "../stitches.config";
import dynamic from "next/dynamic";
import { LoginForm } from "../components/molecules/LoginForm/LoginForm";

export default function Home() {
  return (
    <>
      <LoginForm></LoginForm>
    </>
  );
}
