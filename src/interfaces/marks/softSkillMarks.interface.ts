import { Types } from 'mongoose';
import { ISingleSkillMark } from './singleSkillMark.interface';
export interface ISoftSkillMarks {
  studentId: Types.ObjectId;
  skills: ISingleSkillMark[];
  report: string;
  timestamp: Date;
}
