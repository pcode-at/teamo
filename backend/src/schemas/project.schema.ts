import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, Document } from 'mongoose';
import { User, UserSkill } from './user.schema';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    creationDate: Date;

    @Prop({ required: true })
    lastEdited: Date;

    @Prop({ required: true })
    status: string;

    @Prop({ ref: 'User', type: mongoose.Schema.Types.ObjectId })
    creator: User;

    @Prop({ ref: 'User', type: mongoose.Schema.Types.ObjectId })
    members: User[];

    @Prop({ ref: 'UserSkill', type: mongoose.Schema.Types.ObjectId })
    skills: UserSkill[];

    @Prop({ ref: 'User', type: mongoose.Schema.Types.ObjectId })
    bookmarks: User[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

