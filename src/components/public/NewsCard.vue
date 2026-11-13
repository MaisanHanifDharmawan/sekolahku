<script setup>
import PlaceholderImage from '@/components/common/PlaceholderImage.vue'

defineProps({
  item: { type: Object, required: true },
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <router-link
    :to="`/news/${item.id}`"
    class="card card-hover group flex h-full flex-col overflow-hidden"
  >
    <div class="relative h-48 overflow-hidden">
      <img
        v-if="item.image"
        :src="item.image"
        :alt="item.title"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <PlaceholderImage v-else :label="item.category" :seed="item.title" />
      <span class="badge absolute left-3 top-3 bg-white/90 text-primary-700 shadow-soft backdrop-blur dark:bg-ink-900/80 dark:text-primary-300">
        {{ item.category }}
      </span>
    </div>
    <div class="flex flex-1 flex-col p-5">
      <h3 class="line-clamp-2 font-display text-base font-semibold text-ink-800 transition group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
        {{ item.title }}
      </h3>
      <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{{ item.content }}</p>
      <span class="mt-auto pt-4 text-xs font-medium text-ink-500 dark:text-ink-400">{{ formatDate(item.createdAt) }}</span>
    </div>
  </router-link>
</template>
