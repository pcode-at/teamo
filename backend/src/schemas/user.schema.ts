import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, Document } from 'mongoose';
import { Skill } from './skill.schema';

export type UserDocument = User & Document;

/**
 * User schema
 * {
  "identifier": "tik04pc",
  "password": "2$torjtrejtiret",
  "name": "Gregor Tikautz",
  "email": "gregort@gmx.at",
  "birthDate": "27-03-2003",
  "gender": "m",
  "photo": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d.png",
  "roles": ["employee"],
  "departments": ["development"],
  "skills": [
    {
      "skill": "ObjectId(\"5894u59o43kto4toij4io\")",
      "rating": 1
    },
    {
      "skill": "ObjectId(\"rjoeroejrerjewo\")",
      "rating": 10
    }
  ],
  "authorization": {
    "accessTokens": [""],
    "refreshTokens": [""]
  }
}
 */

@Schema()
export class User {
  @Prop({ required: true })
  identifier: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, type: mongoose.Schema.Types.Date })
  birthDate: Date;

  @Prop({ required: true })
  gender: string;

  @Prop()
  photo: string;

  @Prop()
  phoneNumber: string;

  @Prop({ required: true })
  roles: string[];

  @Prop()
  departments: string[];

  @Prop({ ref: 'UserSkill', type: mongoose.Schema.Types.ObjectId })
  skills: UserSkill[];

  @Prop(raw({
    accessTokens: { type: [String] },
    refreshTokens: { type: [String] }
  }))
  authorization: Record<string, any>;
}

@Schema()
export class UserSkill {
  @Prop({ required: true, ref: 'Skill', type: mongoose.Schema.Types.ObjectId })
  skill: Skill;
  @Prop({ required: true })
  rating: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserSkillSchema = SchemaFactory.createForClass(UserSkill);