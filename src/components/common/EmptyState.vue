<script setup>
import { Inbox } from '@lucide/vue'

defineProps({
  title: { type: String, default: 'Belum ada data' },
  description: { type: String, default: '' },
})
</script>

<template>
  <div class="flex flex-col items-center justify-center px-6 py-16 text-center">
    <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-500 dark:bg-primary-500/10 dark:text-primary-400">
      <slot name="icon">
        <Inbox class="h-8 w-8" />
      </slot>
    </div>
    <h3 class="mt-4 font-display text-lg font-semibold text-ink-800 dark:text-white">{{ title }}</h3>
    <p v-if="description" class="mt-1 max-w-sm text-sm text-ink-500 dark:text-ink-400">{{ description }}</p>
    <div v-if="$slots.action" class="mt-5">
      <slot name="action" />
    </div>
  </div>
</template>
