export interface IProspect {
  _id: string;
  first_name: string;
  last_name: string;
  zenLeadsId: number;
  email: string;
  stage: string;
  displayPic?: string;
  interviewAttempts: {name: string, count: number}[]
}
