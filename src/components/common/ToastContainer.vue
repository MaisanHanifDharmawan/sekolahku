<script setup>
import { useToastStore } from '@/stores/toastStore.js'
import { CheckCircle, AlertCircle, Info, X } from '@lucide/vue'

const toast = useToastStore()

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
}

const classes = {
  success: 'border-emerald-200 bg-white text-emerald-800 dark:border-emerald-500/20 dark:bg-ink-900 dark:text-emerald-300',
  error: 'border-red-200 bg-white text-red-800 dark:border-red-500/20 dark:bg-ink-900 dark:text-red-300',
  info: 'border-primary-200 bg-white text-primary-800 dark:border-primary-500/20 dark:bg-ink-900 dark:text-primary-300',
}

const iconClasses = {
  success: 'text-emerald-500',
  error: 'text-red-500',
  info: 'text-primary-500',
}
</script>

<template>
  <div class="fixed right-4 top-4 z-[60] flex flex-col gap-2">
    <TransitionGroup name="fade">
      <div
        v-for="t in toast.toasts"
        :key="t.id"
        class="flex min-w-[260px] items-center gap-3 rounded-xl border px-4 py-3 shadow-elevated"
        :class="classes[t.type]"
      >
        <component :is="icons[t.type]" class="h-5 w-5 shrink-0" :class="iconClasses[t.type]" />
        <span class="flex-1 text-sm font-medium">{{ t.message }}</span>
        <button
          class="rounded-lg p-1 opacity-60 transition hover:bg-black/5 hover:opacity-100 dark:hover:bg-white/5"
          @click="toast.remove(t.id)"
        >
          <X class="h-4 w-4" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>
