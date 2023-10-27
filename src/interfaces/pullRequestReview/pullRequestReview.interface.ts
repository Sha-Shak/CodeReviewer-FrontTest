import { IOpenAIResult } from "./openaiResult.interface";

export interface IPullRequestReview {
  action: string;
  activityId: string;
  studentId: string;
  studentRepoName: string;
  title: string;
  pullUrl: string;
  repoUrl: string;
  successfulReview: boolean;
  results: IOpenAIResult;
  timestamp: Date;
}
