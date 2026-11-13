<script setup>
defineProps({
  variant: { type: String, default: 'card' }, // card | text | table-row
  count: { type: Number, default: 1 },
})
</script>

<template>
  <template v-if="variant === 'card'">
    <div v-for="n in count" :key="n" class="card overflow-hidden">
      <div class="skeleton h-44 w-full rounded-none"></div>
      <div class="space-y-3 p-5">
        <div class="skeleton h-4 w-20"></div>
        <div class="skeleton h-5 w-3/4"></div>
        <div class="skeleton h-4 w-full"></div>
        <div class="skeleton h-4 w-5/6"></div>
      </div>
    </div>
  </template>

  <template v-else-if="variant === 'text'">
    <div class="space-y-2">
      <div v-for="n in count" :key="n" class="skeleton h-4" :style="{ width: `${70 + (n % 3) * 10}%` }"></div>
    </div>
  </template>

  <template v-else-if="variant === 'table-row'">
    <div v-for="n in count" :key="n" class="flex items-center gap-4 px-4 py-3">
      <div class="skeleton h-4 w-1/6"></div>
      <div class="skeleton h-4 w-2/6"></div>
      <div class="skeleton h-4 w-1/6"></div>
      <div class="skeleton h-4 w-1/6"></div>
    </div>
  </template>
</template>
