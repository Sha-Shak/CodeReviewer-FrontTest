import { Types } from 'mongoose';

export interface IStudent {
  cohort: Types.ObjectId;
  zenDealsId?: number;
  zenContactId: number;
  name: string;
  phone: number;
  email: string;
  ghUserName?: string;
  studentType: string;
}
