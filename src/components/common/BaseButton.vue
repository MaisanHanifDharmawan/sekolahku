<script setup>
import { Loader2 } from '@lucide/vue'

defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
})

const variantClasses = {
  primary:
    'bg-primary-600 text-white shadow-soft hover:bg-primary-700 hover:shadow-glow focus-visible:ring-primary-500',
  secondary:
    'bg-ink-100 text-ink-800 hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-200 dark:hover:bg-ink-700',
  danger:
    'bg-red-600 text-white shadow-soft hover:bg-red-700 focus-visible:ring-red-500',
  outline:
    'border border-ink-300 bg-transparent text-ink-700 hover:bg-ink-50 dark:border-ink-600 dark:text-ink-200 dark:hover:bg-ink-800',
  ghost:
    'text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800',
}

const sizeClasses = {
  sm: 'h-8 gap-1.5 px-3 text-xs',
  md: 'h-10 gap-2 px-4 text-sm',
  lg: 'h-12 gap-2 px-6 text-base',
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
    :class="[variantClasses[variant], sizeClasses[size]]"
  >
    <Loader2 v-if="loading" class="h-4 w-4 animate-spin" />
    <slot />
  </button>
</template>
