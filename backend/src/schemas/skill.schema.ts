import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SkillDocument = Skill & Document;

@Schema()
export class Skill {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    skillMatrix: SkillAggregation[];
}

class SkillAggregation {
    rating: number;
    aggregation: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);