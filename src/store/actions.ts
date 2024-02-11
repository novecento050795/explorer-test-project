import axios from "axios";

export const actions = { 
  updatefile() {
  },
  loadFiles({commit}, search: string|null = null) {
    axios.get(`${import.meta.env.VITE_API_URL}/files`, {params: {search}})
      .then(response => response.data.data)
      .then(files => commit('setFiles', files))
  }
}