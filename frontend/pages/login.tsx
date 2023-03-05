import { styled } from "../stitches.config";
import dynamic from "next/dynamic";
import { LoginForm } from "../components/molecules/LoginForm/LoginForm";
import SvgLogin from "../components/atoms/svg/SvgLogin";

const LoginLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "4fr 5fr",
  alignItems: "center",
  gridGap: "$8x",
  width: "100vw",
  height: "100vh",
  padding: "$9x",
});

const SvgLayout = styled("div", {
  display: "flex",
  width: "100%",
  height: "100%",
  maxHeight: "400px",
  maxWidth: "750px",	
});

export default function Home() {
  return (
    <>
      <LoginLayout>
        <LoginForm></LoginForm>
        <SvgLayout>
          <SvgLogin></SvgLogin>
        </SvgLayout>
      </LoginLayout>
    </>
  );
}
