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

export interface IMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: ILink[];
  path: string;
  per_page: number;
  to: number
  total: number;
  firstPage: number;
  lastPage: number;
}

export interface ILink {
  active: boolean,
  label:  string,
  url: string|null
}
