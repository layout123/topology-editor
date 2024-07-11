<template>
  <div ref="canvasRef" class="w-full h-full text-red-600"></div>
</template>

<script setup lang="ts">
import App from '@/core/app';
const canvasRef = ref<HTMLDivElement | null>(null);
onMounted(() => {
  const app = new App({ node: [], edge: [] }, canvasRef.value!);
  setTimeout(() => {
    app.renderer.setZoom(1.5);
  }, 2000);
  setTimeout(() => {
    app.renderer.updateBackground({ color: 'rgba(93, 230, 224, 0.1)' });
  }, 3000);
  setTimeout(() => {
    app.renderer.drawGrid({
      size: 10,
      visible: true,
      type: 'doubleMesh',
    });
  }, 4000);
});
</script>
;
