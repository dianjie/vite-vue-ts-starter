<template>
  <div>
    <h3 class="my-5 text-xl leading-10">theme change test</h3>
    <el-switch
      v-model="isDark"
      class="theme-toggler"
      inline-prompt
      :active-icon="Moon"
      :inactive-icon="Sunny"
      @change="handleThemeChange"
    />
  </div>
</template>

<script setup lang="ts">
import { isDark, toggleDark } from '@/hooks/web/useDark'
import { Moon, Sunny } from '@element-plus/icons-vue'

const handleThemeChange = () => toggleDark
</script>
