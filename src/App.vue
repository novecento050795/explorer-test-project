<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useStore } from 'vuex'
import {  onMounted } from 'vue'

const store = useStore()
const loadfiles = (search: string|null = null) => store.dispatch('loadFiles', {search});

onMounted(() => {
  loadfiles();
})
</script>

<template>
  <div class="w-100 bg-dark">
    <RouterView />
  </div>
</template>

<style scoped>

</style>
