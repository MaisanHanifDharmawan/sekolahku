<script setup>
import { ref, computed } from 'vue'
import { Search, Sparkles, Images } from '@lucide/vue'
import EmptyState from '@/components/common/EmptyState.vue'
import PlaceholderImage from '@/components/common/PlaceholderImage.vue'
import { useGalleryStore } from '@/stores/galleryStore.js'

const gallery = useGalleryStore()
const search = ref('')

const items = computed(() => {
  const q = search.value.toLowerCase()
  if (!q) return gallery.items
  return gallery.items.filter(
    (i) => i.title.toLowerCase().includes(q) || (i.description || '').toLowerCase().includes(q)
  )
})

const lightbox = ref(null)
const openLightbox = (item) => {
  lightbox.value = item
}
const closeLightbox = () => {
  lightbox.value = null
}
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
            Dokumentasi Sekolah
          </span>
          <h1 class="mt-5 font-display text-display-lg text-white">
            <span class="block">Galeri &amp;</span>
            <span class="block bg-gradient-to-r from-white via-blue-100 to-accent-200 bg-clip-text text-transparent">Fasilitas</span>
          </h1>
          <p class="mx-auto mt-4 max-w-2xl text-base text-blue-100/85">
            Dokumentasi kegiatan, lingkungan belajar, dan fasilitas pendukung.
          </p>
        </div>
      </div>
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-ink-50 dark:to-ink-950"></div>
    </section>

    <section class="relative py-16">
      <div class="container-page">
        <!-- Search bar -->
        <div v-reveal class="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
              <Images class="h-5 w-5" />
            </span>
            <div>
              <p class="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">Galeri</p>
              <p class="text-sm font-medium text-ink-900 dark:text-white">{{ items.length }} dokumentasi</p>
            </div>
          </div>
          <div class="relative max-w-sm flex-1">
            <Search class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input v-model="search" type="text" placeholder="Cari dokumentasi..." class="input-field pl-10" />
          </div>
        </div>

        <div v-if="items.length" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <button
            v-for="(item, i) in items"
            :key="item.id"
            v-reveal="{ delay: i * 70 }"
            class="card card-hover group overflow-hidden text-left"
            @click="openLightbox(item)"
          >
            <div class="relative h-56 overflow-hidden">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.title"
                class="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <PlaceholderImage v-else :label="item.title" :seed="item.title" />
              <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent opacity-0 transition group-hover:opacity-100"></div>
              <span class="absolute right-3 top-3 inline-flex translate-y-1 items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 backdrop-blur transition group-hover:translate-y-0 group-hover:opacity-100">
                Lihat
              </span>
            </div>
            <div class="border-t border-ink-100 p-5 dark:border-ink-800">
              <p class="font-mono text-[11px] font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300">
                {{ item.category || 'Dokumentasi' }}
              </p>
              <h3 class="mt-1.5 font-display font-semibold text-ink-900 transition group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                {{ item.title }}
              </h3>
              <p v-if="item.description" class="mt-1.5 line-clamp-2 text-sm text-ink-500 dark:text-ink-400">
                {{ item.description }}
              </p>
            </div>
          </button>
        </div>
        <div v-else class="mt-6">
          <EmptyState
            title="Belum ada dokumentasi"
            description="Galeri akan diperbarui setelah ada dokumentasi yang diunggah."
          />
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="lightbox"
          class="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/90 p-4 backdrop-blur"
          @click="closeLightbox"
        >
          <div class="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-floating dark:bg-ink-900" @click.stop>
            <img
              v-if="lightbox.image"
              :src="lightbox.image"
              :alt="lightbox.title"
              class="max-h-[70vh] w-full object-cover"
            />
            <div v-else class="flex h-72 items-center justify-center bg-gradient-to-br from-primary-700 to-ink-900 text-white">
              <Images class="h-16 w-16 opacity-40" />
            </div>
            <div class="p-6">
              <p class="font-mono text-[11px] font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300">
                {{ lightbox.category || 'Dokumentasi' }}
              </p>
              <h3 class="mt-1 font-display text-xl font-semibold text-ink-900 dark:text-white">{{ lightbox.title }}</h3>
              <p v-if="lightbox.description" class="mt-2 text-sm text-ink-500 dark:text-ink-400">{{ lightbox.description }}</p>
            </div>
            <button
              class="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-ink-700 shadow-soft transition hover:bg-white dark:bg-ink-800 dark:text-white"
              @click="closeLightbox"
            >
              ×
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>