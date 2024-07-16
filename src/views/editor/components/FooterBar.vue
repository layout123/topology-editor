<template>
   <div className="w-80 hover:w-96 h-14 border bg-background shadow rounded-2xl hover:shadow-xl fixed bottom-10 left-1/2 -translate-x-1/2 duration-300">
    <div className="w-full h-full flex items-center px-4 gap-4 overflow-hidden">
    </div>
   </div>
  </template>
  
  <script setup lang="ts">
  import { injectStrictWithSelf } from '@/hooks/useInjectKey';
  import { AppKey, CommandKey } from '@/constants/inject-keys';
  import { useKeyboard } from '@/hooks/useKeyboard';

  const { app } = injectStrictWithSelf(AppKey)
  const { undo, redo, canRedo, canUndo } = injectStrictWithSelf(CommandKey)

  useKeyboard('z',()=>{
    canUndo() && undo();
  })

  useKeyboard('y',()=>{
    canRedo() && redo();
  })

  useKeyboard('x',()=>{
    app.renderer.zoomToFit();
  })

  </script>
  