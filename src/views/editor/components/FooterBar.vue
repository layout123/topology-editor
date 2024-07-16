<template>
   <div className="w-80 hover:w-96 h-14 border bg-background shadow rounded-2xl hover:shadow-xl fixed bottom-10 left-1/2 -translate-x-1/2 duration-300">
    <div className="w-full h-full flex items-center px-4 gap-4 overflow-hidden">
      <Button> 
        <Plus @click="setZoom(0.1)" className="w-4 h-4"></Plus>
        <span className="text-sm mx-2">{{ (curZoom * 100).toFixed(0) + '%' }}</span>
        <Minus @click="setZoom(-0.1)" className="w-4 h-4"></Minus>
      </Button>
      <Undo :disabled="!canDo.canUndo" className="w-4 h-4" @click="undo"></Undo>
      <Redo :disabled="!canDo.canRedo" className="w-4 h-4" @click="redo"></Redo>
    </div>
   </div>
  </template>
  
  <script setup lang="ts">
  import { injectStrictWithSelf } from '@/hooks/useInjectKey';
  import { AppKey } from '@/constants/inject-keys';
  import { Button } from '@/components/ui/button'
  import { Undo, Redo, Plus, Minus } from 'lucide-vue-next'

  const { app } = injectStrictWithSelf(AppKey)

  const curZoom = ref(app.renderer.getZoom() ?? 1)

  const canDo = reactive({
    canUndo: app.renderer.graph?.canUndo(),
    canRedo: app.renderer.graph?.canRedo(),
  })

  const setZoom = (zoom:number) => {
    if(curZoom.value <= 0 || curZoom.value >= 2) return
    const getRoom = curZoom.value + zoom;
    app.renderer.setZoom(getRoom)
    curZoom.value = getRoom
  }

  const undo = () => {
    canDo.canUndo && app.renderer.graph?.undo()
  }
  const redo = () => {
   canDo.canRedo && app.renderer.graph?.redo()
  }

  onMounted(() => {
    app.renderer.graph?.on('history:change',()=>{
      canDo.canRedo = app.renderer.graph?.canRedo()
      canDo.canUndo = app.renderer.graph?.canUndo()
    })
  })

  </script>
  