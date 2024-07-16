<template>
    <div ref="canvasRef" class="w-full h-full" @drop="onDrop" @dragover.prevent></div>
    <TeleportContainer />
  </template>
  
  <script setup lang="ts">
  import { injectStrictWithSelf } from '@/hooks/useInjectKey';
  import { AppKey } from '@/constants/inject-keys';
  import {register, getTeleport } from '@antv/x6-vue-shape';
  import Custom1 from '@/models/自定义模型/自定义模型01/custom.vue';
  import Custom2 from '@/models/自定义模型/自定义模型02/custom.vue';
  import data from './mock.json';

  const { app } = injectStrictWithSelf(AppKey)

  register({
    shape: 'custom-vue-node-01',
    width: 200,
    height: 100,
    component: Custom1,
  })

  register({
    shape: 'custom-vue-node-02',
    width: 200,
    height: 100,
    component: Custom2,
  })

  const TeleportContainer = getTeleport()

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
  app.addNode({
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
  