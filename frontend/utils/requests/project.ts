import { fetchData } from "./default";

export async function getProjects() {
  return fetchData("project", "GET", 200);
}

export async function getRecentProjects() {
  return fetchData("recentProjects", "GET", 200);
}

export async function getProject(id: string){
  return fetchData("project/" + id, "GET", 200);
}

export async function getBookmarksOfProject(id: string){
  return fetchData("project/bookmark/" + id, "GET", 200);
}

export async function createProject(project: {
  name: string;
  description: string;
  skills: string[];
}){
  console.log(project);
  return fetchData("project", "POST", 201, project);
}

export async function updateProject(project: {
  name: string;
  description: string;
  skills: string[];
}, id: string){
  return fetchData("project/" + id, "PATCH", 200, project);
}

export async function getBookmarks(userId: string) {
  return fetchData("project/bookmark/" + userId, "GET", 200);
}

export async function updateBookmarks(userId: string, bookmarks: string[]) {
  return fetchData("project/bookmark/" + userId, "PATCH", 200, bookmarks);
}
