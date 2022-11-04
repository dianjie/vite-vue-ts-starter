<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import VueUse from '../components/VueUse.vue'
import ThemeChange from '../components/ThemeChange.vue'
import { request } from '@/utils/request'
import { ref } from 'vue'

const loading = ref(false)
const getData = () => {
  loading.value = true
  request
    .get(
      {
        url: 'https://bit.ly/2mTM3nY',
        responseType: 'blob'
      },
      { joinTime: true, isJoinPrefix: false, errorMessageMode: 'message' }
    )
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <main>
    <TheWelcome />
    <VueUse />
    <ThemeChange />
    <el-button class="my-5" :loading="loading" @click="getData">Axios</el-button>
  </main>
</template>
