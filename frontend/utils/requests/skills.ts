import { fetchData } from "./default";

export async function getSkills() {
  return fetchData("skill", "GET", 200);
}

export async function createSkill(skill: {
  name: string;
}){
  return fetchData("skill", "POST", 201, skill);
}

export async function deleteSkill(id: string) {
  return fetchData(`skill/${id}`, "DELETE", 200);
}
