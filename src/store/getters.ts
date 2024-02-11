import type { IFile } from "@/interfaces";

export const getters = {
  files: (state: any): IFile[] => {
    return state.files
  },
  fileById: (state: any) => (id: number) => {
    return state.files.find((file: IFile) => file.id == id)
  }
};
