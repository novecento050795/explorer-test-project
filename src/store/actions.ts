import axios from "axios";
import type { IFileQueryParams } from "@/interfaces";

export const actions = { 
  updatefile() {
  },
  loadFiles({commit}, params: IFileQueryParams) {
    console.log(params.search)
    axios.get(`${import.meta.env.VITE_API_URL}/files`, {params})
      .then(response => response.data.data)
      .then(files => commit('setFiles', files))
  }
}