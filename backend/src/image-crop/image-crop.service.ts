import { Injectable } from '@nestjs/common';
import * as faceapi from 'face-api.js';
import { Blob } from 'node:buffer';

@Injectable()
export class ImageCropService {

    async cropImage(file: Express.Multer.File) {
        const blob = new Blob([file.buffer], { type: file.mimetype });

        // const image = await faceapi.bufferToImage(blob);

        // const canvas = faceapi.createCanvasFromMedia(file);
        // const displaySize = { width: image.width, height: image.height };
        // const faceDetection = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();

        // console.log(faceDetection);

        return blob;
    }
}
