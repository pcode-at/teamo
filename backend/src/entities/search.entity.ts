import { HttpResponse } from "./http-response.entity";
import { UserEntity } from "./user.entity";

export class SearchResponse implements HttpResponse {
    statusCode: number;
    message: string;
    error?: string;
    data?: SearchEntity;

    constructor(partial: Partial<SearchResponse>) {
        Object.assign(this, partial);
    }
}

export class SearchEntity {
    maxScore: number;
    users: UserEntity[];

    constructor(partial: Partial<SearchEntity>) {
        Object.assign(this, partial);
    }
}