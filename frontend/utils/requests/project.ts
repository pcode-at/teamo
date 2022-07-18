import { fetchData } from "./default";

export async function getProjects() {
  return fetchData("project", "GET");
}