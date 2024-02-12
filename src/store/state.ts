import type { IFile, IMeta } from "@/interfaces"

export const state = (): {} => ({ 
  files: [] as IFile[],
  meta: {} as IMeta
})