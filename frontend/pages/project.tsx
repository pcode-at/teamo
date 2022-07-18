import { useQuery } from "react-query";
import { EditableList } from "../components/organisms/EditableList/EditableList";
import { Navbar } from "../components/organisms/Navbar/Navbar";
import { getProjects } from "../utils/requests/project";

export default function Home() {
  const { data: projects, status } = useQuery(["projects"], getProjects);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <>
      <Navbar></Navbar>

      <EditableList
        listName={"Your projects"}
        addFunction={() => {}}
        editFunction={() => {}}
        deleteFunction={() => {}}
        items={projects.map((project) => {
          return {
            title: project.name,
            subtitle: project.status,
            id: project.id,
          };
        })}
      />
    </>
  );
}
