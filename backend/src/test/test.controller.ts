import { Controller, Get, Req, Res } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('api/test')
export class TestController {
  @Get()
  async testGet(@Req() request, @Res() response) {
    return response.status(200).json({
      data: await prisma.teamo.findMany(),
    });
  }
}
