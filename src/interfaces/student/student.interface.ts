export interface IStudent {
  _id: string;
  cohort: string;
  zenDealsId?: number;
  zenContactId: number;
  name: string;
  phone: number;
  email: string;
  ghUserName?: string;
  studentType: string;
}
