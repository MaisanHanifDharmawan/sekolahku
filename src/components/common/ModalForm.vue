<script setup>
import { X } from '@lucide/vue'

defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: '' },
})

const emit = defineEmits(['close'])

const close = () => emit('close')
</script>

<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 p-4 backdrop-blur-sm"
      @click.self="close"
    >
      <div class="modal-panel w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-elevated dark:bg-ink-900 dark:ring-1 dark:ring-ink-800">
        <div class="flex items-center justify-between border-b border-ink-100 px-6 py-4 dark:border-ink-800">
          <h3 class="font-display text-lg font-semibold text-ink-800 dark:text-white">{{ title }}</h3>
          <button
            class="rounded-lg p-1.5 text-ink-400 transition hover:bg-ink-100 hover:text-ink-600 dark:hover:bg-ink-800 dark:hover:text-ink-200"
            @click="close"
          >
            <X class="h-5 w-5" />
          </button>
        </div>
        <div class="max-h-[70vh] overflow-y-auto px-6 py-5">
          <slot />
        </div>
        <div class="flex justify-end gap-2 border-t border-ink-100 px-6 py-4 dark:border-ink-800">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Transition>
</template>
