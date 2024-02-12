import type { IFile, IMeta } from "@/interfaces";

export const mutations = {
  setFiles(state: any, files: IFile[]) {
    state.files = files
  },
  setMeta(state: any, meta: IMeta) {
    state.meta = meta
  },
  deleteFile(state: any, fileId: number) {
    state.files = state.files.filter((file: IFile) => file.id !== fileId)
  },
  addFile(state: any, file: IFile) {
    state.files.push(file)
  },
  updateFile(state: any, file: IFile) {
    state.files = state.files.filter((item: IFile) => item.id !== file.id)
    state.files.push(file)
  }
};