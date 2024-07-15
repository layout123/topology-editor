<template>
    <div ref="canvasRef" class="w-full h-full" @drop="onDrop" @dragover.prevent></div>
  </template>
  
  <script setup lang="ts">
  import { injectStrictWithSelf } from '@/hooks/useInjectKey';
  import { AppKey } from '@/constants/inject-keys';

  const { app } = injectStrictWithSelf(AppKey)

  const canvasRef = ref<HTMLDivElement | null>(null);
 
  const onDrop = (event: DragEvent) => {
  event.preventDefault();
  if (!canvasRef.value || !app) return;
  const model = JSON.parse(event.dataTransfer?.getData('model') as string);

  if (!model) return;
  const { shape } = model

  const { left, top } = canvasRef.value.getBoundingClientRect();
  const x = event.clientX - left;
  const y = event.clientY - top;
  const position = app.renderer.pageToLocal(x, y);
  app.renderer.addNode({
    id: Math.floor(Math.random() * 16777215).toString(16),
    shape,
    x:position?.x || 0,
    y:position?.y || 0,
    width: 100,
    height: 40,
    attrs: {
      body: {
        stroke: '#5F95FF',
        strokeWidth: 1,
        fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
        rx: 0,
        ry: 0,
      },
      label: {
        fontSize: 12,
        fill: '#262626',
        text: shape
      },
    },
  });
};

onMounted(() => {
  if (!canvasRef.value) return;
  app.mounted(canvasRef.value)
})
  </script>
  