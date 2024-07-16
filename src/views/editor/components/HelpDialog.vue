<template>
  <Dialog v-model:open="dialogVisible">
    <DialogContent class="max-w-[600px]">
      <DialogHeader>
        <DialogTitle>拓扑编辑器-使用指南</DialogTitle>
        <DialogDescription>
          The Topology Editor is a versatile tool for designing and managing network layouts.
        </DialogDescription>
      </DialogHeader>
      <div class="grid grid-cols-2 gap-8">
        <div>
          <div class="font-bold py-2 border-b">基础操作</div>
          <div class="grid grid-cols-2 py-2">
            <div>Ctrl + C</div>
            <div>复制节点</div>
          </div>
          <div class="grid grid-cols-2 py-2">
            <div>Ctrl + V</div>
            <div>粘贴节点</div>
          </div>
          <div class="grid grid-cols-2 py-2">
            <div>Ctrl + Z</div>
            <div>撤回</div>
          </div>
          <div class="grid grid-cols-2 py-2">
            <div>Ctrl + Y</div>
            <div>取消撤回</div>
          </div>
          <div class="grid grid-cols-2 py-2">
            <div>Ctrl + X</div>
            <div>画布适应居中</div>
          </div>
          <div class="grid grid-cols-2 py-2">
            <div><span>Ctrl +</span> <MousePointer class="inline-block" /></div>
            <div>拖拽画布</div>
          </div>
          <div class="grid grid-cols-2 py-2">
            <div><span>Ctrl +</span> <Mouse class="inline-block" /></div>
            <div>缩放画布</div>
          </div>
        </div>
        <div>
          <div class="font-bold py-2 border-b">复杂操作</div>
          <div class="grid grid-cols-2 py-2">
            <div>框选 + Ctrl + C</div>
            <div>多选-复制节点</div>
          </div>
          <div class="grid grid-cols-2 py-2">
            <div>Ctrl + V</div>
            <div>多选-粘贴节点</div>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { MousePointer, Mouse } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    visible?: boolean;
  }>(),
  {
    visible: () => false,
  }
);

const emit = defineEmits<{
  (event: 'update:visible', data: boolean): void;
  (event: 'close'): void;
}>();

const dialogVisible = computed<boolean>({
  get: () => props.visible,
  set: (visible) => {
    emit('update:visible', visible);
    if (!visible) {
      emit('close');
    }
  },
});
</script>
