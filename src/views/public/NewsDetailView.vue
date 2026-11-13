<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Calendar, Clock, Share2, Sparkles } from '@lucide/vue'
import PlaceholderImage from '@/components/common/PlaceholderImage.vue'
import NewsCard from '@/components/public/NewsCard.vue'
import { useNewsStore } from '@/stores/newsStore.js'

const route = useRoute()
const router = useRouter()
const newsStore = useNewsStore()

const item = computed(() => newsStore.findById(route.params.id))
const related = computed(() =>
  newsStore.latest.filter((n) => n.id !== item.value?.id).slice(0, 3)
)

const formatDate = (date) =>
  new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

const shareLink = () => {
  if (!item.value) return
  const url = window.location.href
  if (navigator.share) {
    navigator.share({ title: item.value.title, url }).catch(() => {})
  } else {
    navigator.clipboard?.writeText(url)
  }
}
</script>

<template>
  <div v-if="item">
    <!-- Hero / cover -->
    <section class="relative overflow-hidden bg-ink-900 text-white">
      <div class="relative h-72 md:h-96">
        <img
          v-if="item.image"
          :src="item.image"
          :alt="item.title"
          class="h-full w-full object-cover opacity-80"
        />
        <div v-else class="h-full w-full bg-gradient-to-br from-primary-700 via-primary-900 to-ink-950"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent"></div>
      </div>

      <div class="relative mx-auto -mt-32 max-w-3xl px-4 pb-12 lg:px-0">
        <button
          class="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur transition hover:bg-white/20"
          @click="router.back()"
        >
          <ArrowLeft class="h-3.5 w-3.5" /> Kembali
        </button>

        <div class="rounded-3xl border border-white/10 bg-ink-900/85 p-6 shadow-floating backdrop-blur-xl md:p-8">
          <span class="badge border border-white/20 bg-white/10 text-white">
            {{ item.category }}
          </span>
          <h1 class="mt-4 font-display text-2xl font-bold leading-tight text-white md:text-4xl">
            {{ item.title }}
          </h1>
          <div class="mt-5 flex flex-wrap items-center gap-4 text-sm text-blue-100/80">
            <span class="inline-flex items-center gap-1.5">
              <Calendar class="h-4 w-4" />
              {{ formatDate(item.createdAt) }}
            </span>
            <span class="inline-flex items-center gap-1.5">
              <Clock class="h-4 w-4" />
              {{ Math.max(2, Math.ceil((item.content || '').length / 800)) }} menit baca
            </span>
            <button
              class="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/15"
              @click="shareLink"
            >
              <Share2 class="h-3.5 w-3.5" /> Bagikan
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Body -->
    <section class="py-14">
      <div class="mx-auto max-w-3xl px-4 lg:px-0">
        <article class="prose prose-slate max-w-none whitespace-pre-line text-base leading-relaxed text-ink-700 dark:prose-invert dark:text-ink-300">
          {{ item.content }}
        </article>

        <div class="mt-12 flex items-center gap-3 rounded-2xl border border-primary-200/60 bg-gradient-to-br from-primary-50 to-white p-5 dark:border-primary-500/20 dark:from-primary-500/5 dark:to-ink-900">
          <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-glow">
            <Sparkles class="h-5 w-5" />
          </span>
          <div>
            <p class="font-display text-sm font-semibold text-ink-900 dark:text-white">Informasi resmi dari tim redaksi sekolah.</p>
            <p class="text-xs text-ink-500 dark:text-ink-400">Untuk pertanyaan lebih lanjut, silakan menuju halaman kontak.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related -->
    <section v-if="related.length" class="bg-white py-16 dark:bg-ink-900/40">
      <div class="container-page">
        <div class="mb-8">
          <span class="eyebrow">Berita Lainnya</span>
          <h2 class="section-title mt-3">Mungkin Anda Juga Tertarik</h2>
        </div>
        <div class="grid gap-6 md:grid-cols-3">
          <NewsCard
            v-for="(r, i) in related"
            :key="r.id"
            v-reveal="{ delay: i * 80 }"
            :item="r"
          />
        </div>
      </div>
    </section>
  </div>

  <div v-else class="mx-auto max-w-4xl px-4 py-24 text-center">
    <span class="eyebrow">404</span>
    <h1 class="section-title mt-3">Berita tidak ditemukan</h1>
    <p class="section-kicker">Mungkin berita telah dihapus atau tautan tidak valid.</p>
    <router-link to="/news" class="btn-primary mt-6 inline-flex">
      Kembali ke daftar berita
    </router-link>
  </div>
</template>