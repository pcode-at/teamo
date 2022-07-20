import { fetchData } from "./default";

export async function getUser() {
  return fetchData("user", "GET");
}

export async function getLocations(){
  return fetchData("user/locations", "GET");
}

export async function getAllUsers() {
  return fetchData("user/all", "GET");
}