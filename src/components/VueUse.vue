<template>
  <div>
    <h3 class="text-xl leading-10 my-10">vueuse and tailwind test</h3>
    <el-button @click="addCount">Test debounce: {{ count }}</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const count = ref(0)
const addCount = useDebounceFn(() => {
  count.value += 1
}, 300)
</script>
