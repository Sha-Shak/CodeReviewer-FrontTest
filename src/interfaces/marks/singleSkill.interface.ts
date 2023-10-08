import { Types } from 'mongoose';
export interface ISingleSkill {
  skillId: Types.ObjectId;
  marks: number;
  desc: string;
}
