import { ISingleSkillMark } from './singleSkillMark.interface';
export interface ISoftSkillMarks {
  studentId: string;
  skills: ISingleSkillMark[];
  report: string;
  timestamp: Date;
}
