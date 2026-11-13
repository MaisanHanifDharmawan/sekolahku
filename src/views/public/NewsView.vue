<script setup>
import { ref, computed } from 'vue'
import { Search, Filter, Sparkles, Newspaper } from '@lucide/vue'
import NewsCard from '@/components/public/NewsCard.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { useNewsStore } from '@/stores/newsStore.js'

const newsStore = useNewsStore()
const search = ref('')
const selectedCategory = ref('')

const categories = computed(() => {
  const set = new Set(newsStore.items.map((i) => i.category))
  return ['', ...set]
})

const filteredNews = computed(() => {
  const q = search.value.toLowerCase()
  return newsStore.latest.filter((item) => {
    const matchSearch = !q || item.title.toLowerCase().includes(q) || item.content.toLowerCase().includes(q)
    const matchCategory = !selectedCategory.value || item.category === selectedCategory.value
    return matchSearch && matchCategory
  })
})

const totalLabel = computed(() => `${filteredNews.value.length} berita`)
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden gradient-mesh text-white">
      <div class="grid-pattern pointer-events-none absolute inset-0 opacity-70"></div>
      <div class="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-accent-400/15 blur-3xl"></div>
      <div class="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-primary-300/15 blur-3xl"></div>
      <div class="relative mx-auto max-w-7xl px-4 py-20 lg:px-6 lg:py-24">
        <div v-reveal class="text-center">
          <span class="eyebrow-light animate-fade-down">
            <Sparkles class="h-3.5 w-3.5" />
            Informasi Sekolah
          </span>
          <h1 class="mt-5 font-display text-display-lg text-white">
            <span class="block">Berita &amp;</span>
            <span class="block bg-gradient-to-r from-white via-blue-100 to-accent-200 bg-clip-text text-transparent">Pengumuman</span>
          </h1>
          <p class="mx-auto mt-4 max-w-2xl text-base text-blue-100/85">
            Update terbaru seputar kegiatan, pencapaian, dan informasi penting sekolah.
          </p>
        </div>
      </div>
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-ink-50 dark:to-ink-950"></div>
    </section>

    <!-- Filter + List -->
    <section class="relative py-16">
      <div class="container-page">
        <!-- Filter card -->
        <div v-reveal="{ delay: 80 }" class="card mb-10 flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:p-5">
          <div class="flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
              <Newspaper class="h-5 w-5" />
            </span>
            <div>
              <p class="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">Daftar Berita</p>
              <p class="text-sm font-medium text-ink-900 dark:text-white">{{ totalLabel }}</p>
            </div>
          </div>
          <div class="grid gap-3 md:grid-cols-2 md:gap-3">
            <div class="relative">
              <Search class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                v-model="search"
                type="text"
                placeholder="Cari berita..."
                class="input-field pl-10"
              />
            </div>
            <div class="relative">
              <Filter class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <select v-model="selectedCategory" class="input-field pl-10 appearance-none pr-10">
                <option value="">Semua Kategori</option>
                <option v-for="cat in categories.filter(Boolean)" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Active filter chips -->
        <div v-if="selectedCategory || search" class="mb-6 flex flex-wrap items-center gap-2">
          <span class="text-xs font-medium uppercase tracking-wider text-ink-500 dark:text-ink-400">Filter aktif:</span>
          <span v-if="search" class="badge border border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-500/30 dark:bg-primary-500/10 dark:text-primary-300">
            "{{ search }}"
          </span>
          <span v-if="selectedCategory" class="badge border border-accent-200 bg-accent-50 text-accent-700 dark:border-accent-500/30 dark:bg-accent-500/10 dark:text-accent-300">
            {{ selectedCategory }}
          </span>
          <button
            class="btn-ghost text-xs"
            @click="search = ''; selectedCategory = ''"
          >
            Reset
          </button>
        </div>

        <!-- Grid -->
        <div v-if="filteredNews.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <NewsCard
            v-for="(item, i) in filteredNews"
            :key="item.id"
            v-reveal="{ delay: i * 60 }"
            :item="item"
          />
        </div>
        <div v-else class="mt-6">
          <EmptyState
            title="Tidak ada berita"
            description="Coba ubah kata kunci atau kategori pencarian."
          />
        </div>
      </div>
    </section>
  </div>
</template>