import { IStudentPositionMark } from './studentPositonMark.interface';

export interface IStudentPositionReport {
  cohortName?: string;
  reportType: string;
  marks: IStudentPositionMark[];
}
