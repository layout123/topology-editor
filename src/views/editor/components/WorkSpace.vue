<template>
    <div ref="canvasRef" class="w-full h-full" @drop="onDrop" @dragover.prevent></div>
  </template>
  
  <script setup lang="ts">
  import { injectStrictWithSelf } from '@/hooks/useInjectKey';
  import { AppKey } from '@/constants/inject-keys';
  import { BaseShape } from '@/core/type';

  const { app } = injectStrictWithSelf(AppKey)

  const canvasRef = ref<HTMLDivElement | null>(null);
 
  const shapeMapping: Record<number, BaseShape> = {
  1: BaseShape.Rect,
  2: BaseShape.Circle,
  3: BaseShape.Ellipse,
  4: BaseShape.Polygon,
  5: BaseShape.Polyline,
};

  const onDrop = (event: DragEvent) => {
  event.preventDefault();
  console.log('onDrop', event);
  if (!canvasRef.value || !app) return;
  const shapeType = Number(event.dataTransfer?.getData('shapeType'));
  const shape = shapeMapping[shapeType];
  if (!shape) return;

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
        text: shapeMapping[shapeType]
      },
    },
  });
};

onMounted(() => {
  if (!canvasRef.value) return;
  app.mounted(canvasRef.value)
})
  </script>
  