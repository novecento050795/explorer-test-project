<script setup lang="ts">

import type { IFile } from '@/interfaces';
import { useStore } from 'vuex'

const store = useStore()

defineProps<{
  file: IFile
}>()

</script>
<template>
  <div class="">
    {{ file.name }}
  </div>
</template>

<style scoped>

</style>
