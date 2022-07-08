import { ClassSerializerInterceptor, Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { SkillResponse } from 'src/entities/skill.entity';
import { SkillService } from './skill.service';

@Controller('/api/skill')
@UseInterceptors(ClassSerializerInterceptor)
export class SkillController {
    constructor(private readonly skillService: SkillService) { }

    // @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(): Promise<SkillResponse> {
        return await this.skillService.findAll();
    }
}