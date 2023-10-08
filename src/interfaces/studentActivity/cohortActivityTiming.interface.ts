import { Types } from 'mongoose';

export interface ICohortActivityTimings {
  cohortId: Types.ObjectId;
  activityId: Types.ObjectId;
  startTimestamp: Date;
  endTimestamp: Date;
}
