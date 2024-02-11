<script setup lang="ts">
import { type IFileQueryParams } from '@/interfaces';
import { RouterView, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex'
import {  onMounted } from 'vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const loadFiles = async () => {    
  await router.isReady()
  const params = {} as IFileQueryParams
  if (route.query && route.query.search) params.search = route.query.search.toString()
  store.dispatch('loadFiles', params)
};

onMounted(() => {
  loadFiles();
})
</script>

<template>
  <div class="w-100 bg-dark">
    <RouterView />
  </div>
</template>

<style scoped>

</style>
