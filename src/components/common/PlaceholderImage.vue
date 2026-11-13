<script setup>
import { computed } from 'vue'
import { ImageOff } from '@lucide/vue'

const props = defineProps({
  label: { type: String, default: '' },
  seed: { type: [String, Number], default: '' },
})

// Generate a deterministic gradient based on the seed so placeholders vary but stay stable.
const gradient = computed(() => {
  const str = String(props.seed || props.label || 'sekolahku')
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const h1 = Math.abs(hash) % 360
  const h2 = (h1 + 40) % 360
  return `linear-gradient(135deg, hsl(${h1} 70% 62%), hsl(${h2} 68% 48%))`
})
</script>

<template>
  <div
    class="relative flex h-full w-full items-center justify-center overflow-hidden"
    :style="{ background: gradient }"
  >
    <div class="grid-pattern absolute inset-0 opacity-30"></div>
    <div class="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15 blur-xl"></div>
    <div class="absolute -bottom-8 -left-4 h-28 w-28 rounded-full bg-black/10 blur-xl"></div>
    <div class="relative flex flex-col items-center gap-2 px-4 text-center text-white/90">
      <ImageOff class="h-8 w-8 opacity-80" />
      <span v-if="label" class="text-xs font-medium">{{ label }}</span>
    </div>
  </div>
</template>
