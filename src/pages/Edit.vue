<script setup lang="ts">
import File from '@/components/File.vue'
import { useStore } from 'vuex'
import { computed, onMounted, reactive, ref, toRefs } from 'vue'
import { useRoute } from 'vue-router';
import type { IFile } from '@/interfaces';
import axios from "axios";
import router from '@/router';
import { send } from '@/helpers/axios'

const store = useStore()
const route = useRoute()
const fileId = route.query && route.query.id
const file = store.getters.fileById(fileId) as IFile
const state = reactive({
  nameInput: file && file.name,
  fileInput: null,
  progress: 0
});
const { nameInput, fileInput, progress } = toRefs(state)

const onFileInput = (event: any) => {
  state.fileInput = event.target.files[0]
}

const editFile = () => {
  let formData = new FormData();
  formData.append("name", state.nameInput);
  formData.append('_method', 'patch');
  if (fileInput.value) formData.append('file', (state as any).fileInput);

  send(`${import.meta.env.VITE_API_URL}/files/${fileId}`, formData, (progress: number)=>{
    state.progress = progress
  }).then((response: any) => {
    store.commit('updateFile', response.data.data);
    router.push('/');
  })
}

const uploadFile = () => {
  let formData = new FormData();
  formData.append("file", (state as any).fileInput);
  if (nameInput.value) formData.append('name', state.nameInput);
  
  send(`${import.meta.env.VITE_API_URL}/files`, formData, (progress: number) => {
    state.progress = progress
  }).then((response) => {
    store.commit('addFile', response.data.data);
    router.push('/');
  })
}


</script>

<template>
  <div class="explorer-main d-flex flex-column align-items-center justify-content-center">
    <div class="flex-column align-items-center justify-content-center w-50 bg-light p-5 rounded">
      <router-link to="/" style="text-decoration: none;">
        <button type="button" class="btn btn-dark mb-5 d-flex" style="gap: 10px">
          <i class="bi bi-backspace"></i>
          <span>Отмена</span>
        </button>
      </router-link>
      <div class="edit-form d-flex flex-column" style="gap: 10px">
        <input v-model="nameInput" placeholder="Введите названия файла" class="form-control"/>
        <div class="input-group">
          <label class="form-control" tabindex="0">
            {{fileInput && (fileInput as any).name || 'Загрузите файл'}}
            <input @input="onFileInput($event)" type="file" class="invisible">
          </label>
        </div>
        <button 
          v-if="fileId" 
          type="button" 
          class="btn btn-dark d-flex" 
          style="gap: 10px"
          @click="editFile()"
          :disabled="!nameInput"
        >
        <i class="bi bi-cloud-upload"></i>
          <span>Сохранить</span>
        </button>
        <button 
          v-else 
          type="button" 
          class="btn btn-dark d-flex" 
          style="gap: 10px"
          :disabled="!fileInput"
          @click="uploadFile()"
        >
        <i class="bi bi-cloud-upload"></i>
          <span>Загрузить</span>
        </button>
        <div v-if="progress" class="progress">
          <div class="progress-bar" role="progressbar" :style="`width: ${progress}%`" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.explorer-main {
  min-height: 100vh;
}
@media (min-width: 1024px) {

}
</style>
