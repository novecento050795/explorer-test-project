<script setup lang="ts">
import File from '@/components/File.vue'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import type { ILink } from '@/interfaces';

const store = useStore()
const router = useRouter()
const files = computed(() => store.getters.files)
const links = computed(() => store.getters.links)
const firstPage = computed(() => store.getters.firstPage)
const lastPage = computed(() => store.getters.lastPage)
const total = computed(() => store.getters.total)

const onSearchInput = (event: any) => {
  const search = event.target.value
  if (search.length === 0 || search.length >= 3) {
    const query = {}
    if (search) (query as any).search = search
    router.replace({ query });
    store.dispatch('loadFiles', query)
  }
}
const loadLink = (link: string) => {
  const page = link.split('?')[1].split('=')[1]
  store.dispatch('loadFiles', {page})
}
</script>

<template>
  <div class="explorer-main d-flex flex-column align-items-center justify-content-center">
    <div class="flex-column align-items-center justify-content-center w-50 bg-light p-5 rounded" style="min-height: 80vh; max-height: 80vh">
      <div>
        <button type="button" class="btn btn-dark mb-5">
          <router-link class="d-flex text-light" :to="{ name: 'edit'}" style="text-decoration: none; gap: 10px">
            <i class="bi bi-upload"></i>
            <span>Загрузить файл</span>
          </router-link>
        </button>
      </div>
      <input @input="onSearchInput($event)" placeholder="Поиск файла по назаванию" class="form-control mb-2" />
      <div class="w-100 overflow-auto" style="height: 40vh;">
        <table class="w-100">
          <tbody>
            <File class="p-2" v-for="file in files" :file="file"/>
          </tbody>
        </table>
      </div>
      <div>{{ files.length }} из {{ total }}</div>
      <nav>
        <ul class="pagination">
          <li class="page-item"><a class="page-link" @click="loadLink(firstPage)" href="#"><i class="bi bi-skip-backward-fill"></i></a></li>
          <li class="page-item" v-for="link in links">
            <a class="page-link" @click="loadLink(link.url)" href="#">{{ link.label }}</a>
          </li>
          <li class="page-item"><a class="page-link" @click="loadLink(lastPage)" href="#"><i class="bi bi-skip-forward-fill"></i></a></li>
        </ul>
      </nav>
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
