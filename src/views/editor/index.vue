<template>
  <div class="w-full h-full overflow-hidden">
    <div class="w-full h-14">
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
        <WorkSpace />
      </ResizablePanel>
      <ResizableHandle with-handle />
      <ResizablePanel :default-size="15">Two</ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>

<script setup lang="ts">
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import ModelList from './components/ModelList.vue';
import WorkSpace from './components/WorkSpace.vue'
import { useApp } from '@/hooks/useApp';

useApp()

</script>

