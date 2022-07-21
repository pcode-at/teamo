import { fetchData } from "./default";

export async function getUser() {
  return fetchData("user", "GET", 200);
}

export async function getLocations(){
  return fetchData("user/locations", "GET", 200);
}

export async function getAllUsers() {
  return fetchData("user/all", "GET", 200);
}