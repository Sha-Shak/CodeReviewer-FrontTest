
import { IStudent } from '../student/student.interface';
import { IReportAvgSkill } from './reportAvgSkill.interface';
export interface ISoftSkillsQuarterlyReport {
  student: IStudent;
  marks: IReportAvgSkill[];
  report: string;
}
