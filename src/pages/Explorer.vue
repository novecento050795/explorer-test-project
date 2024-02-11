<script setup lang="ts">
import File from '@/components/File.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const files = computed(() => store.getters.files)

</script>

<template>
  <div class="explorer-main d-flex flex-column align-items-center justify-content-center">
    <div class="flex-column align-items-center justify-content-center w-50 bg-light p-5 rounded">
      <File class="p-2" v-for="file in files" :file="file"/>
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
