import { fetchData } from "./default";

export async function getSkills() {
  return fetchData("skill", "GET");
}
