import { Time } from "@angular/common";

export interface ExamsModel {
  id?: number;
  typeID?: number;
  UserID?: number;
  typeName?: string;
  examName?: string;
  description?: string;
  totalQus?: number;
  marks?: number;
  time?: any;
  CreatedOn?: Date;
  Active?: boolean;
}
