import { Exclude, Transform } from "class-transformer";
import { HttpResponse } from "./http-response.entity";

export class SkillResponse implements HttpResponse {
    statusCode: number;
    message: string;
    error?: string;
    data?: SkillEntity[];
    id: string;
    name: string;

    constructor(partial: Partial<SkillResponse>) {
        Object.assign(this, partial);
    }
}

export class SkillEntity {
    id: string;
    name: string;

    @Exclude()
    skillMatrix: SkillRating[]

    constructor(partial: Partial<SkillEntity>) {
        Object.assign(this, partial);
    }
}

export class SkillRating {
    rating: number;
    aggregation: string;
} 