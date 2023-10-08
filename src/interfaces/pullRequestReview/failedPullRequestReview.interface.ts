import { Types } from 'mongoose';

export interface IFailedPullRequestReview {
  reviewId: Types.ObjectId;
  timestamp: Date;
}
