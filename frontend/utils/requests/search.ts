import { fetchData } from "./default";

export async function searchElastic(search) {
  return fetchData("elastic/search", "POST", search);
}
