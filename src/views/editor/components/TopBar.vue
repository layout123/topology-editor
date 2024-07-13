<template>
    <div class="h-full flex justify-end items-center px-8 relative">
    <CircleHelp class="absolute left-4 top-4 cursor-help" @click="openHelpDialog" />
    <Button @click="exportPng">导出</Button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { injectStrictWithSelf } from '@/hooks/useInjectKey';
  import { AppKey } from '@/constants/inject-keys';
  import { Button } from '@/components/ui/button'
  import { CircleHelp } from 'lucide-vue-next'

  import { useCommandComponent } from '@/hooks/useCommandComponent';

  import HelpDialog from './HelpDialog.vue'

  const helpDialog = useCommandComponent(HelpDialog)

  const { app } = injectStrictWithSelf(AppKey)

  const exportPng = () => {
    app.export('test', 'png')
  }

  const openHelpDialog = () => {
    helpDialog()
  }
  </script>
  