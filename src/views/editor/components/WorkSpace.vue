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
  const { left, top } = canvasRef.value.getBoundingClientRect();
  const x = event.clientX - left;
  const y = event.clientY - top;
  const position = app.renderer.pageToLocal(x, y)!;
  app.addNode(model,position);
};

onMounted(() => {
  if (canvasRef.value){
    app.mounted(canvasRef.value)
    app.initProject(JSON.parse(localStorage.getItem('projectData') as string) || data as any)
    app.on('GRAPH_CHANGE',()=>{
      window.localStorage.setItem('projectData', JSON.stringify(app.project.formatProjectData()))
})
  };
})
  </script>
  