
import { IStudent } from '../student/student.interface';
import { IReportAvgSkill } from './reportAvgSkill.interface';
export interface IPeerReviewWeeklyReport {
  student: IStudent;
  marks: IReportAvgSkill[];
  week: string;
}
