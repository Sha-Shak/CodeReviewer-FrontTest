import { Types } from 'mongoose';
import { IOpenAIResult } from './openaiResult.interface';

export interface IPullRequestReview {
  action: string;
  activityId: Types.ObjectId;
  studentId: Types.ObjectId;
  studentRepoName: string;
  title: string;
  pullUrl: string;
  repoUrl: string;
  successfulReview: boolean;
  results: IOpenAIResult;
  timestamp: Date;
}
