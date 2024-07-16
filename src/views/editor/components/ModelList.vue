<template>
  <ScrollArea class="rounded-md px-2">
    <div class="relative w-full max-w-sm items-center p-2">
      <Input
        id="search"
        v-model="searchText"
        type="text"
        autocomplete="off"
        class="pl-8 h-8"
        placeholder="请输入"
      />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-4">
        <Search class="size-4 text-muted-foreground" />
      </span>
    </div>
    <Collapsible class="w-full space-y-2 px-2" v-for="{ group, nodes } in elementGroups" :default-open="true" :key="group">
    <CollapsibleTrigger>
      <div class="w-full p-2">{{ group }}</div>
    </CollapsibleTrigger>
    <CollapsibleContent class="w-full flex flex-wrap gap-4 px-2">
      <div class="w-24 h-20 flex flex-col items-center justify-center cursor-move border rounded-sm" v-for="(model,index) in nodes" v-drag:[model] :key="index">
        {{ model.name }}
      </div>
    </CollapsibleContent>
  </Collapsible>
  </ScrollArea>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { elementGroups } from '@/models';
import { Search } from 'lucide-vue-next'

const searchText = ref('');
</script>
