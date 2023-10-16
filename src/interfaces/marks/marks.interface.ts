import { ISingleSkillMark } from './singleSkillMark.interface';
export interface IMarks {
  studentId: string;
  softSkills: ISingleSkillMark;
  hardSkills: ISingleSkillMark;
}
