import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const maxSize = 1_000;
        return value.size < maxSize;
    }
}