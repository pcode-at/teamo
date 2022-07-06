import { users, userSkills, skills } from "@prisma/client";
import { UserAndSkills } from "src/types/userAndSkills.type";

export function recommendUsers(userSkills: (userSkills & { skill: skills; user: users })[]): UserAndSkills[] {
  return null;
}
