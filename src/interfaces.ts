export interface IFile {
  id: number;
  name: string;
  size: string;
  created_at: string;
  type: string;
  extension: string;
}

export interface IFileQueryParams {
  page: number;
  search: string;
}
