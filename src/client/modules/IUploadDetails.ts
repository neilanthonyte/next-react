export interface IUploadDetails {
  url: string;
  method: "PUT" | "POST";
  headers: {};
  fileKey?: string;
  body?: any;
}
