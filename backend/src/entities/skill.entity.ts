import { Exclude } from "class-transformer";
import { HttpResponse } from "./http-response.entity";

export class SkillResponse implements SkillEntity, HttpResponse {
    statusCode: number;
    message: string;
    error?: string;
    data?: any;
    id: string;
    name: string;
    skillMatrix: SkillRating[];

    constructor(partial: Partial<SkillResponse>) {
        Object.assign(this, partial);
    }

}

export class SkillEntity {
    @Exclude()
    id: string;

    name: string;
    skillMatrix: SkillRating[]

    constructor(partial: Partial<SkillEntity>) {
        Object.assign(this, partial);
    }
}

export class SkillRating {
    rating: number;
    aggregation: string;
}