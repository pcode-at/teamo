import { IsNotEmpty } from "class-validator";

export class SkillDto {
    @IsNotEmpty()
    skill: string;

    @IsNotEmpty()
    rating: string;

    @IsNotEmpty()
    identifier: string;
}