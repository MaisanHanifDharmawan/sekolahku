<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronRight } from '@lucide/vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'

const props = defineProps({
  title: { type: String, default: '' },
})

const route = useRoute()

const crumbs = computed(() => {
  const map = {
    'admin-dashboard': 'Dashboard',
    'admin-students': 'Siswa',
    'admin-teachers': 'Guru',
    'admin-news': 'Berita',
    'admin-gallery': 'Galeri',
    'admin-profile': 'Profil Sekolah',
    'admin-data': 'Data',
  }
  return ['Admin', map[route.name] || props.title]
})
</script>

<template>
  <header class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <nav class="mb-1 flex items-center gap-1 text-xs text-ink-500 dark:text-ink-400">
        <span v-for="(c, i) in crumbs" :key="c" class="flex items-center gap-1">
          <ChevronRight v-if="i > 0" class="h-3 w-3" />
          <span :class="i === crumbs.length - 1 ? 'font-medium text-ink-600 dark:text-ink-300' : ''">{{ c }}</span>
        </span>
      </nav>
      <h1 class="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white">{{ title }}</h1>
    </div>
    <ThemeToggle />
  </header>
</template>
