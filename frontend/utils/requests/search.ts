import { fetchData } from "./default";

export async function searchElastic(search) {
  return fetchData("elastic/search", "POST", 201, search);
}

export async function getRecommendation(projectId){
  return fetchData(`elastic/recommendation/${projectId}/false`, "GET", 200);
}
