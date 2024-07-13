<template>
    <div class="h-full flex justify-end items-center px-8">
    <Button @click="exportPng">导出</Button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { injectStrictWithSelf } from '@/hooks/useInjectKey';
  import { AppKey } from '@/constants/inject-keys';
  import { Button } from '@/components/ui/button'

  const { app } = injectStrictWithSelf(AppKey)

  const exportPng = () => {
    app.export('test', 'png')
  }
  </script>
  