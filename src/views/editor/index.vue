<template>
  <div class="w-full h-full overflow-hidden">
    <div class="w-full h-16">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel>header</ResizablePanel>
        <ResizableHandle />
      </ResizablePanelGroup>
    </div>
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel :default-size="15">
      <ModelList />
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel>
        <div ref="canvasRef" class="w-full h-full" @drop.prevent="onDrop" @dragover.prevent></div>
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel :default-size="15">Two</ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import App from '@/core/app';
import { BaseShape } from '@/core/type';
import ModelList from './components/ModelList.vue';
import { provideApp, useApp } from '@/hooks/useApp';
const canvasRef = ref<HTMLDivElement | null>(null);

const shapeMapping: Record<number, BaseShape> = {
  1: BaseShape.Rect,
  2: BaseShape.Circle,
  3: BaseShape.Ellipse,
};

const onDrop = (event: DragEvent) => {
  const app = useApp().app;
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
  const appInstance = new App({ node: [], edge: [] }, canvasRef.value!);
  provideApp(appInstance)

});
</script>
