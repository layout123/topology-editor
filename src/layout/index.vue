<template>
  <div ref="canvasRef" class="w-full h-full text-red-600"></div>
</template>

<script setup lang="ts">
import App from '@/core/app';
const canvasRef = ref<HTMLDivElement | null>(null);
onMounted(() => {
  new App([], canvasRef.value!);
});
</script>
;
