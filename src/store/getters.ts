import type { IFile, ILink, IMeta } from "@/interfaces";

export const getters = {
  files: (state: any): IFile[] => state.files,
  fileById: (state: any) => (id: number) => state.files.find((file: IFile) => file.id == id),
  links: (state: any): any => state.meta.links.filter((link: ILink) => 
    link.label.indexOf('Previous') < 0 && link.label.indexOf('Next') < 0),
  firstPage: (state: any): string => state.meta.firstPage,
  lastPage: (state: any): string => state.meta.lastPage,
  total: (state: any): string => state.meta.total,
};
