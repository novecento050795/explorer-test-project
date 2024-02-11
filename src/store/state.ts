import type { IFile } from "@/interfaces"

export const state = (): {} => ({ 
  files: [
    {
      name: "file1.jpg",
      size: "123 mb",
    },
    {
      name: "file2.jpg",
      size: "123 mb",
    },
    {
      name: "file3.jpg",
      size: "123 mb",
    },
  ] as IFile[]
})