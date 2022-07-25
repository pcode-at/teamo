import { BadRequestException, Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageCropService } from './image-crop.service';
import { Response } from 'express'
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('api/image')
export class ImageCropController {
    constructor(private readonly imageCropService: ImageCropService) { }

    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
        return await this.imageCropService.cropImage(file);
    }

    @Post("/photo")
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: process.env.FILE_PATH,
            filename: (req, file, cb) => {
                cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
            }
        })
    }))
    async getImageByName(@Body() body, @Res() response: Response, @Req() request) {
        try {
            await prisma.users.update({
                where: {
                    identifier: request.body.identifier
                },
                data: {
                    photo: request.file.filename
                }
            });
            return response.status(200).sendFile(request.file.filename, { root: process.env.FILE_PATH });
        } catch {
            throw new BadRequestException('Image not found');
        }
    }

    @Get(':id')
    async getImage(@Param('id') id: string, @Res() response: Response) {
        try {
            return response.status(200).sendFile(id, { root: process.env.FILE_PATH });
        } catch {
            throw new BadRequestException('Image not found');
        }
    }
}
