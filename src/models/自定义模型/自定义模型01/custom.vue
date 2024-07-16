<template>
     <Button class="w-full h-full">自定义模型</Button>
  </template>
  
  <script setup lang="ts">
  import { Button } from '@/components/ui/button'

  const nodeInject = inject('getNode') || null;
  onMounted(() => {
    console.log(nodeInject);
  })
</script>
  