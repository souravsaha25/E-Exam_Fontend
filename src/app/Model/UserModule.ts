export interface UserModule {
  UID?: number;
  UName: string;
  UAddress: string;
  UEmail: string;
  UPhone: string;
  Password: string;
  ConfirmPassword: string;
  DOB: Date;
  Gender: string;
  CreatedOn?: Date;
  DateofJoining?: Date;
  Role: string;
  Token?: string;

}
