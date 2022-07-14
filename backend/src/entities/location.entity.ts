import { HttpResponse } from "./http-response.entity";

export class LocationResponse implements HttpResponse {
    statusCode: number;
    message: string;
    error?: string;
    data?: LocationEntity | LocationEntity[];

    constructor(partial: Partial<LocationResponse>) {
        Object.assign(this, partial);
    }
}

export class LocationEntity {
    location: String;

    constructor(partial: Partial<LocationEntity>) {
        Object.assign(this, partial);
    }
}