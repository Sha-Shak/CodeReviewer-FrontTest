import { IPersonalityTag } from "./personalityTag.interface";

export interface IPersonalityTagCount extends IPersonalityTag {
  tagId: string,
  count: number
}