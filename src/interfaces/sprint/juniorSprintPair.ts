import { IStudent } from "../student/student.interface";
import { IJuniorSprint } from "./juniorSprint";

export interface IJuniorSprintPair {
  sprint: IJuniorSprint;
  students: IStudent[];
}
