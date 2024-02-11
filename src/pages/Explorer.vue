<script setup lang="ts">
import File from '@/components/File.vue'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()
const files = computed(() => store.getters.files)
const onSearchInput = (event: any) => {
  const search = event.target.value
  if (search.length === 0 || search.length >= 3) {
    const query = {}
    if (search) (query as any).search = search
    router.replace({ query });
    store.dispatch('loadFiles', {...query})
  }
}
</script>

<template>
  <div class="explorer-main d-flex flex-column align-items-center justify-content-center">
    <div class="flex-column align-items-center justify-content-center w-50 bg-light p-5 rounded">
      <div>
        <button type="button" class="btn btn-dark mb-5">
          <router-link class="d-flex text-light" :to="{ name: 'edit'}" style="text-decoration: none; gap: 10px">
            <i class="bi bi-upload"></i>
            <span>Загрузить файл</span>
          </router-link>
        </button>
      </div>
      <input @input="onSearchInput($event)" placeholder="Поиск файла по назаванию" class="form-control mb-2" />
      <table class="table">
        <tbody>
          <File class="p-2" v-for="file in files" :file="file"/>
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item"><a class="page-link" href="#"><i class="bi bi-skip-backward-fill"></i></a></li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#"><i class="bi bi-skip-forward-fill"></i></a></li>
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
