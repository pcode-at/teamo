import { fetchData } from "./default";

export async function searchElastic(search) {
  return fetchData("elastic/search", "POST", 200, search);
}
