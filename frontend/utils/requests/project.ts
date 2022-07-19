import { fetchData } from "./default";

export async function getProjects() {
  return fetchData("project", "GET");
}

export async function getProject(id: string){
  return fetchData("project/" + id, "GET");
}