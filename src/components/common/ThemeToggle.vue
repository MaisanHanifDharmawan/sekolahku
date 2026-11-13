<script setup>
import { Sun, Moon } from '@lucide/vue'
import { useTheme } from '@/composables/useTheme.js'

const { theme, toggle } = useTheme()
</script>

<template>
  <button
    type="button"
    class="inline-flex h-9 w-9 items-center justify-center rounded-xl text-ink-500 transition hover:bg-ink-100 hover:text-ink-800 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-white"
    :aria-label="theme === 'dark' ? 'Mode terang' : 'Mode gelap'"
    @click="toggle"
  >
    <Sun v-if="theme === 'dark'" class="h-5 w-5" />
    <Moon v-else class="h-5 w-5" />
  </button>
</template>
