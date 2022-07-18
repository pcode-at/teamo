import { fetchData } from "./default";

export async function getUser() {
  return fetchData("user", "GET");
}

export async function getLocations(){
  return fetchData("user/locations", "GET");
}