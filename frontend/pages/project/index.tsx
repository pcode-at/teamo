import { useQuery } from "react-query";
import { ProjectsList } from "../../components/organisms/ProjectsList/ProjectsList";
import { Navbar } from "../../components/organisms/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>

      <ProjectsList />
    </>
  );
}
