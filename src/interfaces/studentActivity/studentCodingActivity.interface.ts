import { IOpenAICodePrompt } from '../pullRequestReview/openaiCodePrompt.interface';

export interface IStudentCodingActivity {
  name: string;
  repoName: string;
  duration: number;
  type: 'toy problem' | 'weekly assessment' | 'exercise' | 'pre-course';
  prompt: IOpenAICodePrompt;
  filePathsToCheck: string[];
}
