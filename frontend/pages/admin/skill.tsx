import { SkillEditList } from "../../components/molecules/SkillEditList/SkillEditList";
import { Navbar } from "../../components/organisms/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>

      <SkillEditList></SkillEditList>
    </>
  );
}
