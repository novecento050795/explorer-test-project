import axios, { type AxiosRequestConfig } from "axios";

const config = {
  headers: {'Content-Type': 'multipart/form-data'},
  onUploadProgress: (progressEvent: any) => {
    let progress = Math.ceil(Math.round((progressEvent.loaded / progressEvent.total) * 100));
    if ((config as any).onProgress)
        (config as any).onProgress(progress);
  }
} as AxiosRequestConfig<FormData>

export const send = (url: string, data: FormData, onProgress: (progress: number) => any) =>  {
  (config as any).onProgress = onProgress;
  return axios.post(url, data, config)
}
