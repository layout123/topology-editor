<template>
  <div class="w-full h-full overflow-hidden">
    <div class="w-full h-14">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel><TopBar /></ResizablePanel>
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
      <ResizablePanel :default-size="15"></ResizablePanel>
    </ResizablePanelGroup>
    <FooterBar />
  </div>
</template>

<script setup lang="ts">
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import ModelList from './components/ModelList.vue';
import WorkSpace from './components/WorkSpace.vue'
import TopBar from './components/TopBar.vue'
import FooterBar from './components/FooterBar.vue'
import { useApp } from '@/hooks/useApp';

useApp()

</script>

