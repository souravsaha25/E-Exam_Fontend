import { QAModel } from "./QAModel";

export interface ExamResultModel {
  ID?: number;
  ExamID?: number;
  UserID?: number;
  ExamName: string;
  TotalQus?: number;
  TotalAns?: number;
  TotalWrongAns?: number;
  TotalRightAns?: number;
  Marks?: number;
  TotalMarks?: number;
  Percentage?: number;
  Attend: boolean;
  type: string;
  Time?: any;
  QusAnsList?: QAModel[];
}
