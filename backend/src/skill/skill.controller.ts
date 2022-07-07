import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SkillResponse } from 'src/entities/skill.entity';
import { SkillService } from './skill.service';

@Controller('/api/skill')
export class SkillController {
    constructor(private readonly skillService: SkillService) { }

    // @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(): Promise<SkillResponse> {
        return await this.skillService.findAll();
    }
}
