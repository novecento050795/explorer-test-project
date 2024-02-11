<script setup lang="ts">

import type { IFile } from '@/interfaces';
import router from '@/router';
import axios from "axios";
import { useStore } from 'vuex'

const store = useStore()
const props = defineProps<{
  file: IFile
}>()

const downloadFile = () => {

  axios.get(`${import.meta.env.VITE_API_URL}/files/${props.file.id}`, {
    params: {download: 1},
    responseType: 'blob' 
  })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', props.file.name + (props.file.extension ? `.${props.file.extension}` : ''))
      document.body.appendChild(link)
      link.click()
    })
}

const deleteFile = () => {
  axios.delete(`${import.meta.env.VITE_API_URL}/files/${props.file.id}`)
    .then(() => store.commit('deleteFile', props.file.id));
}
</script>
<template>
  <tr>
      <td><i class="bi bi-file-earmark-fill"></i></td>
      <td>{{ file.name }}</td>
      <td>{{ file.size }}</td>
      <td>{{ file.type }}</td>
      <td>{{ file.created_at }}</td>
      <td class="d-flex justify-content-between">
        <i @click="downloadFile" type="button" class="button bi bi-download text-success"></i>
        <router-link :to="{ name: 'edit', query: { id: props.file.id }}"><i @click="editFile" type="button" class="bi bi-pencil-square"></i></router-link>
        <i @click="deleteFile" type="button" class="bi bi-trash text-danger"></i>
      </td>
    </tr>
</template>

<style scoped>

</style>
