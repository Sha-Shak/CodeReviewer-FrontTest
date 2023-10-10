
import { ISingleSkillMark } from './singleSkillMark.interface';
export interface IHardSkillMarks {
  studentId: string;
  reviewId: string;
  skills: ISingleSkillMark[];
  week: string;
  timestamp: Date;
}
