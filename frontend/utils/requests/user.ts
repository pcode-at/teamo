import { fetchData } from "./default";

type User = {
  identifier: string;
  password: string;
  name: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  gender: string;
  photo: string;
  roles: string[];
  departments: string[];
  location: string;
  workHourChanges: string[];
};

type Skill = {
  identifier: string;
  rating: number;
  skill: string;
};

export async function getUser(profileId: string = "") {
  return fetchData("user/" + profileId, "GET", 200);
}

export async function getLocations() {
  return fetchData("user/locations", "GET", 200);
}

export async function getAllUsers() {
  return fetchData("user/all", "GET", 200);
}

export async function createUser(user: User) {
  console.log(user);
  return fetchData("user", "POST", 200, user);
}

export async function updateUser(user: User) {
  return fetchData("user/" + user.identifier, "PATCH", 200, user);
}

export async function getBookmarks() {
  return fetchData("user/bookmarks", "GET", 200);
}

export async function getBookmarksOfUser(profileId: string = "") {
  return fetchData("user/bookmark/" + profileId, "GET", 200);
}

export async function getWorkHours(profileId: string = "") {
  return fetchData("user/workHours/" + profileId, "GET", 200);
}

export async function replaceSkills(skills: Skill[]) {
  return fetchData("user/replaceSkills", "PATCH", 200, skills);
}
