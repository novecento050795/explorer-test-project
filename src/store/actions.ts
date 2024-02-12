import axios from "axios";
import type { IFileQueryParams } from "@/interfaces";

export const actions = { 
  updatefile() {
  },
  loadFiles({commit}: any, params: IFileQueryParams) {
    axios.get(`${import.meta.env.VITE_API_URL}/files`, {params})
      .then(response => response.data)
      .then(data => {
        commit('setFiles', data.data)
        commit('setMeta', {
          ...(data.meta),
          firstPage: data.links.first,
          lastPage: data.links.last
        })
      })
  }
}