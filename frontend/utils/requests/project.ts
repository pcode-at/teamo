import { fetchData } from "./default";

export async function getProjects() {
  return fetchData("project", "GET", 200);
}

export async function getProject(id: string){
  return fetchData("project/" + id, "GET", 200);
}

export async function createProject(project: {
  name: string;
  description: string;
  skills: string[];
}){
  console.log(project);
  return fetchData("project", "POST", 200, project);
}