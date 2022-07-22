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

export async function createUser(user: {
  identifier: string,
  password: string,
  name: string,
  email: string;
  phoneNumber: string,
  birthDate: string,
  gender: string;
  photo: string;
  roles: string[];
  departments: string[];
  location: string;
}) {
  console.log(user);
  return fetchData("user", "POST", 200, user);
}