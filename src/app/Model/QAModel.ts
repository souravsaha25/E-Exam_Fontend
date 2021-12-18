import { QAResponse } from "../enums/QAResponse.enum";

export interface QAModel {
  ID?: number;
  QusNo: number;
  TypeID?: number;
  Question: string;
  Option2: string;
  Option3: string;
  Option1: string;
  Option4: string;
  Answer: string;
  Marks: number;
  NegativeMarks: number;
  GivenAnswer: string;
  Explanation: string;
  Response: QAResponse;
}

