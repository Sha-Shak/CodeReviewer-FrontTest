import { Types } from 'mongoose';
import { ISingleSkill } from './singleSkill.interface';
export interface IMarks {
  studentId: Types.ObjectId;
  softSkills: ISingleSkill;
  hardSkills: ISingleSkill;
}
