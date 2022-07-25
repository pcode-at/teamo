import { fetchData } from "./default";

export async function getSkills() {
  return fetchData("skill", "GET", 200);
}

export async function createSkill(skill: {
  name: string;
}){
  console.log(skill);
  return fetchData("skill", "POST", 201, skill);
}