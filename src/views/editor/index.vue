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
        <Button @click="addNode">添加</Button>
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel>
        <div ref="canvasRef" class="w-full h-full"></div>
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel :default-size="15">Two</ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import App from '@/core/app';
import { BaseShape } from '@/core/type';
const canvasRef = ref<HTMLDivElement | null>(null);
const app = ref();

const shapeMapping: Record<number, BaseShape> = {
  1: BaseShape.Rect,
  2: BaseShape.Circle,
  3: BaseShape.Ellipse,
};

const addNode = () => {
  if (!app.value || !canvasRef.value) return;
  const randomShape = Math.floor(Math.random() * 3) + 1;
  const { x, y } = app.value.renderer.pageToLocal(Math.random() * 1000, Math.random() * 1000);
  app.value.renderer.addNode({
    id: Math.floor(Math.random() * 16777215).toString(16),
    name: '测试',
    shape: shapeMapping[randomShape],
    width: 100,
    height: 40,
    position: { x, y }, // Add position here
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
        text: shapeMapping[randomShape],
      },
    },
  });
  app.value.renderer.zoomToFit();
};
onMounted(() => {
  app.value = new App({ node: [], edge: [] }, canvasRef.value!);
});
</script>
