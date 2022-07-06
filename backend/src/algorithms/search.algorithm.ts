import { userSkills, skills, users } from "@prisma/client";
import { UserAndSkills } from "src/types/userAndSkills.type";
import { SearchDto } from "src/user/dto/search.dto";

export function searchForUsers(skills: (userSkills & { skill: skills; user: users })[], search: SearchDto): UserAndSkills[] {
  // // Formula for ranking: (Number of Attributes - (Index - 1)) * AttributeScore
  // // If the AttributeScore is a Range of Numbers the OrderNumber will be used to determine the Number, e.g. if the Attribute Score is 1-4 then The OrderNumber will be divided by the Attribute Score Range and rounded up to the next Attribute Score.
  // // Get the "perfect" candidate
  // let perfectScore: number;

  // search.parameters.forEach((s, index) => {
  //   let factor = search.parameters.length - (index - 1);
  //   let rating = 1;

  //   if (s.rating) {
  //     if (Array.isArray(s.rating)) {
  //       s.rating.sort((a, b) => a - b);
  //       rating = (s.rating[0] + s.rating[1]) / 2;
  //     } else {
  //       rating = s.rating;
  //     }
  //   }

  //   perfectScore += factor * rating;
  // });

  // let users: Map<String, UserAndSkills> = new Map();

  // skills.forEach(user => {
  //   let index = search.parameters.findIndex(s => s.value === user.skill.name);
  //   if (index == -1) return;
  //   let factor = search.parameters.length - (index - 1);
  //   let rating = 1;

  //   let paramterRating = user.rating;

  //   if (paramterRating) {
  //     if (Array.isArray(paramterRating)) {
  //       paramterRating.sort((a, b) => parseInt(a) - parseInt(b));
  //       rating = (parseInt(paramterRating[0]) - parseInt(paramterRating[1])) / 2;
  //     } else {
  //       rating = parseInt(paramterRating);
  //     }
  //   }

  //   if (!users.has(user.user.identifier)) {
  //     let userResult = new UserAndSkills();

  //     userResult.identifier = user.user.identifier;
  //     userResult.id = user.user.id;
  //     userResult.score = perfectScore - factor * rating;
  //     userResult.birthDate = user.user.birthDate;
  //     userResult.departments = user.user.departments;
  //     userResult.email = user.user.email;
  //     userResult.skills = [];

  //     let skillAndRating = new SkillAndRating();

  //     skillAndRating.skillMatrix = user.skill.skillMatrix;
  //     skillAndRating.rating = rating.toString();
  //     skillAndRating.name = user.skill.name;

  //     userResult.skills.push(skillAndRating);

  //     users.set(user.user.identifier, userResult);
  //   } else {
  //     let userResult = users.get(user.user.identifier);

  //     let skillAndRating = new SkillAndRating();

  //     skillAndRating.skillMatrix = user.skill.skillMatrix;
  //     skillAndRating.rating = rating.toString();
  //     skillAndRating.name = user.skill.name;

  //     userResult.skills.push(skillAndRating);
  //   }
  // });

  // let result: UserAndSkills[] = [];
  // users.forEach(user => {
  //   result.push(user);
  // });

  // //Sort result accending the score
  // result.sort((a, b) => {
  //   return Math.abs(a.score) - Math.abs(b.score);
  // });
  // return result;
  return null;
}
