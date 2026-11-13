<script setup>
import { AlertTriangle } from '@lucide/vue'
import BaseButton from './BaseButton.vue'

defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: 'Konfirmasi' },
  message: { type: String, default: '' },
  confirmText: { type: String, default: 'Ya' },
  cancelText: { type: String, default: 'Batal' },
  variant: { type: String, default: 'danger' },
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 p-4 backdrop-blur-sm"
      @click.self="emit('cancel')"
    >
      <div class="modal-panel w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-elevated dark:bg-ink-900 dark:ring-1 dark:ring-ink-800">
        <div class="flex items-start gap-4">
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
            <AlertTriangle class="h-5 w-5" />
          </div>
          <div>
            <h3 class="font-display text-lg font-semibold text-ink-800 dark:text-white">{{ title }}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{{ message }}</p>
          </div>
        </div>
        <div class="mt-6 flex justify-end gap-2">
          <BaseButton variant="secondary" @click="emit('cancel')">{{ cancelText }}</BaseButton>
          <BaseButton :variant="variant" @click="emit('confirm')">{{ confirmText }}</BaseButton>
        </div>
      </div>
    </div>
  </Transition>
</template>
