<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import {
  ArrowRight,
  Users,
  UserCircle,
  Newspaper,
  Award,
  ChevronDown,
  Sparkles,
  Calendar,
  MapPin,
  GraduationCap,
  BookOpen,
  Trophy,
  ArrowUpRight,
  Play,
  CheckCircle2,
} from '@lucide/vue'
import NewsCard from '@/components/public/NewsCard.vue'
import { useSchoolProfileStore } from '@/stores/schoolProfile.js'
import { useStudentStore } from '@/stores/studentStore.js'
import { useTeacherStore } from '@/stores/teacherStore.js'
import { useNewsStore } from '@/stores/newsStore.js'
import { useExtracurricularStore } from '@/stores/extracurricularStore.js'
import { useMajorStore } from '@/stores/majorStore.js'

const profile = useSchoolProfileStore()
const studentStore = useStudentStore()
const teacherStore = useTeacherStore()
const newsStore = useNewsStore()
const extracurriculars = useExtracurricularStore()
const majorStore = useMajorStore()

const stats = computed(() => [
  { label: 'Siswa Aktif', value: studentStore.totalActive, icon: Users, accent: 'primary' },
  { label: 'Guru & Staf', value: teacherStore.totalActive, icon: UserCircle, accent: 'accent' },
  { label: 'Jurusan', value: majorStore.items.length, icon: BookOpen, accent: 'primary' },
  { label: 'Akreditasi', value: profile.profile.accreditation, icon: Award, accent: 'accent' },
])

const latestNews = computed(() => newsStore.latest.slice(0, 3))
const featuredNews = computed(() => newsStore.latest[0])
const highlights = computed(() => extracurriculars.items.slice(0, 6))

// Animated counter — runs once when the section enters the viewport
const animatedValues = ref(stats.value.map((s) => (typeof s.value === 'number' ? 0 : s.value)))
let counterStarted = false

const runCounter = () => {
  if (counterStarted) return
  counterStarted = true
  const t0 = performance.now()
  const duration = 1400
  const tick = (now) => {
    const p = Math.min(1, (now - t0) / duration)
    const eased = 1 - Math.pow(1 - p, 3)
    animatedValues.value = stats.value.map((s) =>
      typeof s.value === 'number' ? Math.round(s.value * eased) : s.value
    )
    if (p < 1) requestAnimationFrame(tick)
    else animatedValues.value = stats.value.map((s) => s.value) // ensure exact final value
  }
  requestAnimationFrame(tick)
}

onMounted(() => {
  const el = document.getElementById('stats')
  if (!el) return
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          runCounter()
          obs.disconnect()
        }
      })
    },
    { threshold: 0.3 }
  )
  obs.observe(el)
})

const statDisplay = (i) => animatedValues.value[i]
</script>

<template>
  <div>
    <!-- ============================================================== -->
    <!-- HERO — split layout: copy + floating visual                  -->
    <!-- ============================================================== -->
    <section class="relative overflow-hidden gradient-mesh text-white">
      <div class="grid-pattern pointer-events-none absolute inset-0 opacity-70"></div>
      <div class="pointer-events-none absolute -left-24 top-10 h-72 w-72 animate-float rounded-full bg-white/10 blur-3xl"></div>
      <div class="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 animate-float-slow rounded-full bg-primary-300/20 blur-3xl"></div>
      <div class="pointer-events-none absolute right-1/3 top-1/2 h-40 w-40 rounded-full bg-accent-400/15 blur-3xl"></div>

      <div class="relative mx-auto max-w-7xl px-4 py-20 lg:px-6 lg:py-28">
        <div class="grid items-center gap-14 lg:grid-cols-12">
          <!-- Copy -->
          <div class="lg:col-span-7">
            <span class="eyebrow-light animate-fade-down">
              <Sparkles class="h-3.5 w-3.5" />
              Akreditasi {{ profile.profile.accreditation }} · {{ new Date().getFullYear() }}
            </span>
            <h1 class="mt-6 font-display text-display-xl text-white">
              <span class="block">Selamat Datang di</span>
              <span class="block bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
                {{ profile.profile.name }}
              </span>
            </h1>
            <p class="mt-6 max-w-2xl text-lg leading-relaxed text-blue-100/90">
              {{ profile.profile.vision }}
            </p>

            <div class="mt-8 flex flex-wrap items-center gap-3">
              <router-link
                to="/profile"
                class="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-primary-700 shadow-elevated transition hover:bg-blue-50 hover:shadow-floating"
              >
                Jelajahi Sekolah
                <ArrowRight class="h-4 w-4 transition group-hover:translate-x-0.5" />
              </router-link>
              <router-link
                to="/news"
                class="group inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                <Play class="h-4 w-4 fill-current" />
                Lihat Berita Terbaru
              </router-link>
            </div>

            <!-- Trust strip -->
            <div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-blue-100/80">
              <span class="inline-flex items-center gap-2">
                <CheckCircle2 class="h-4 w-4 text-emerald-300" />
                Kurikulum Merdeka
              </span>
              <span class="inline-flex items-center gap-2">
                <CheckCircle2 class="h-4 w-4 text-emerald-300" />
                Fasilitas Modern
              </span>
              <span class="inline-flex items-center gap-2">
                <CheckCircle2 class="h-4 w-4 text-emerald-300" />
                Ekstrakurikuler Aktif
              </span>
            </div>
          </div>

          <!-- Visual: stacked mockup cards -->
          <div class="relative lg:col-span-5">
            <div class="relative mx-auto w-full max-w-md">
              <!-- Big card 1: profil ringkas -->
              <div class="animate-fade-up relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 shadow-floating backdrop-blur-xl">
                <div class="flex items-center gap-3">
                  <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-300 to-accent-500 text-ink-900 shadow-glow-accent">
                    <Trophy class="h-6 w-6" />
                  </div>
                  <div>
                    <p class="text-xs font-medium uppercase tracking-wider text-blue-200">Prestasi</p>
                    <p class="font-display text-base font-semibold text-white">Juara Umum Tingkat Provinsi</p>
                  </div>
                </div>
                <div class="mt-5 grid grid-cols-3 gap-3 text-center">
                  <div class="rounded-xl bg-white/5 p-3">
                    <p class="font-display text-2xl font-bold text-white">128+</p>
                    <p class="text-xs text-blue-200">Penghargaan</p>
                  </div>
                  <div class="rounded-xl bg-white/5 p-3">
                    <p class="font-display text-2xl font-bold text-white">95%</p>
                    <p class="text-xs text-blue-200">Kelulusan</p>
                  </div>
                  <div class="rounded-xl bg-white/5 p-3">
                    <p class="font-display text-2xl font-bold text-white">A</p>
                    <p class="text-xs text-blue-200">Akreditasi</p>
                  </div>
                </div>
              </div>

              <!-- Floating card 2: jadwal -->
              <div class="animate-slide-in-right absolute -left-8 -bottom-8 hidden w-64 rounded-2xl border border-white/15 bg-white/95 p-4 text-ink-800 shadow-floating backdrop-blur sm:block dark:bg-ink-900 dark:text-ink-100">
                <div class="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary-600 dark:text-primary-300">
                  <Calendar class="h-3.5 w-3.5" />
                  PPDB 2026
                </div>
                <p class="mt-2 font-display text-sm font-semibold leading-snug">
                  Pendaftaran gelombang II dibuka hingga 30 Juni
                </p>
                <div class="mt-3 flex items-center justify-between">
                  <span class="font-mono text-xs text-ink-500 dark:text-ink-400">Kuota: 360 siswa</span>
                  <ArrowRight class="h-4 w-4 text-primary-600 dark:text-primary-300" />
                </div>
              </div>

              <!-- Floating card 3: lokasi -->
              <div class="animate-fade-up absolute -top-6 -right-4 hidden w-44 rounded-2xl border border-white/15 bg-white/95 p-3 text-ink-800 shadow-floating backdrop-blur sm:block dark:bg-ink-900 dark:text-ink-100">
                <div class="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-accent-600 dark:text-accent-300">
                  <MapPin class="h-3.5 w-3.5" />
                  Lokasi
                </div>
                <p class="mt-1.5 text-xs leading-relaxed text-ink-600 dark:text-ink-400">{{ profile.profile.address }}</p>
              </div>
            </div>
          </div>
        </div>

        <a href="#stats" class="mt-14 inline-flex animate-float flex-col items-center gap-1 text-xs font-medium text-white/70">
          Gulir untuk info lengkap
          <ChevronDown class="h-4 w-4" />
        </a>
      </div>

      <!-- Bottom fade so transition into next section is smooth -->
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ink-50 dark:to-ink-950"></div>
    </section>

    <!-- ============================================================== -->
    <!-- STATS — with counter animation                                -->
    <!-- ============================================================== -->
    <section id="stats" class="relative -mt-2 pb-6">
      <div class="container-page">
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(stat, i) in stats"
            :key="stat.label"
            v-reveal="{ delay: i * 80 }"
            class="card relative overflow-hidden p-5"
          >
            <!-- Accent bar -->
            <span
              class="absolute inset-x-0 top-0 h-0.5"
              :class="stat.accent === 'accent' ? 'bg-gradient-to-r from-accent-400 to-accent-600' : 'bg-gradient-to-r from-primary-400 to-primary-700'"
            ></span>
            <div class="flex items-center gap-4">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-glow"
                :class="stat.accent === 'accent'
                  ? 'bg-gradient-to-br from-accent-400 to-accent-600 shadow-glow-accent'
                  : 'bg-gradient-to-br from-primary-500 to-primary-700'"
              >
                <component :is="stat.icon" class="h-5 w-5" />
              </div>
              <div>
                <p class="font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white">
                  {{ statDisplay(i) }}
                </p>
                <p class="text-sm font-medium text-ink-500 dark:text-ink-400">{{ stat.label }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================== -->
    <!-- ABOUT — alternating: copy left, identity card right            -->
    <!-- ============================================================== -->
    <section class="relative py-24">
      <div class="container-page">
        <div class="grid items-start gap-14 lg:grid-cols-2">
          <div v-reveal>
            <span class="eyebrow">Tentang Kami</span>
            <h2 class="section-title mt-4">
              Mengenal Sekolah<br />
              <span class="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">Lebih Dekat</span>
            </h2>
            <p class="mt-5 max-w-xl leading-relaxed text-ink-600 dark:text-ink-400">
              {{ profile.profile.history }}
            </p>
            <div class="mt-7 rounded-2xl border border-primary-200/60 bg-gradient-to-br from-primary-50/80 via-white to-white p-6 shadow-soft dark:border-primary-500/20 dark:from-primary-500/10 dark:via-ink-900 dark:to-ink-900">
              <div class="flex items-start gap-3">
                <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white shadow-glow">
                  <Sparkles class="h-4 w-4" />
                </span>
                <div>
                  <h3 class="font-display text-sm font-semibold uppercase tracking-wider text-primary-700 dark:text-primary-300">Visi</h3>
                  <p class="mt-2 leading-relaxed text-ink-700 dark:text-ink-300">{{ profile.profile.vision }}</p>
                </div>
              </div>
            </div>
            <router-link
              to="/profile"
              class="mt-7 group inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Baca profil lengkap
              <ArrowUpRight class="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </router-link>
          </div>

          <div v-reveal="{ delay: 120 }" class="card overflow-hidden p-0">
            <div class="border-b border-ink-200 bg-gradient-to-br from-primary-600 to-primary-800 p-6 text-white dark:border-ink-800">
              <div class="flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                  <GraduationCap class="h-5 w-5" />
                </span>
                <div>
                  <p class="text-xs uppercase tracking-wider text-blue-200">Identitas</p>
                  <p class="font-display text-base font-semibold">{{ profile.profile.name }}</p>
                </div>
              </div>
            </div>
            <dl class="divide-y divide-ink-100 dark:divide-ink-800">
              <div v-for="row in [
                ['NPSN', profile.profile.npsn],
                ['Akreditasi', profile.profile.accreditation],
                ['Alamat', profile.profile.address],
                ['Telepon', profile.profile.phone],
                ['Email', profile.profile.email],
                ['Website', profile.profile.website || '—'],
              ]" :key="row[0]" class="flex gap-4 px-6 py-4">
                <dt class="w-28 shrink-0 text-sm font-medium text-ink-500 dark:text-ink-400">{{ row[0] }}</dt>
                <dd class="text-sm font-medium text-ink-800 dark:text-ink-200">{{ row[1] }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================== -->
    <!-- FEATURED NEWS — magazine-style header + grid                  -->
    <!-- ============================================================== -->
    <section class="relative bg-white py-24 dark:bg-ink-900/40">
      <div class="container-page">
        <div v-reveal class="mb-12 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span class="eyebrow">Informasi Terkini</span>
            <h2 class="section-title mt-3">Berita &amp; Kabar Sekolah</h2>
            <p class="section-kicker max-w-xl">
              Update terbaru dari kegiatan, pencapaian, dan pengumuman penting sekolah.
            </p>
          </div>
          <router-link to="/news" class="group inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400">
            <span class="link-underline">Lihat semua berita</span>
            <ArrowRight class="h-4 w-4 transition group-hover:translate-x-0.5" />
          </router-link>
        </div>

        <!-- Featured + grid -->
        <div v-if="featuredNews" class="grid gap-6 lg:grid-cols-3">
          <router-link
            v-reveal
            :to="`/news/${featuredNews.id}`"
            class="card card-hover group relative col-span-1 flex flex-col overflow-hidden lg:col-span-2 lg:row-span-2"
          >
            <div class="relative h-72 overflow-hidden md:h-96">
              <img
                v-if="featuredNews.image"
                :src="featuredNews.image"
                :alt="featuredNews.title"
                class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div v-else class="h-full w-full bg-gradient-to-br from-primary-500 via-primary-700 to-ink-900"></div>
              <div class="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/30 to-transparent"></div>
              <div class="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <span class="badge border border-white/20 bg-white/15 text-white backdrop-blur">
                  {{ featuredNews.category }}
                </span>
                <h3 class="mt-4 font-display text-2xl font-bold leading-tight text-white md:text-3xl">
                  {{ featuredNews.title }}
                </h3>
                <p class="mt-2 line-clamp-2 max-w-2xl text-sm text-blue-100/90 md:text-base">
                  {{ featuredNews.content }}
                </p>
                <span class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white">
                  Baca selengkapnya
                  <ArrowRight class="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </router-link>
          <NewsCard
            v-for="(item, i) in latestNews.filter((n) => n.id !== featuredNews.id).slice(0, 2)"
            :key="item.id"
            v-reveal="{ delay: (i + 1) * 80 }"
            :item="item"
          />
        </div>

        <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <NewsCard
            v-for="(item, i) in latestNews"
            :key="item.id"
            v-reveal="{ delay: i * 80 }"
            :item="item"
          />
        </div>
      </div>
    </section>

    <!-- ============================================================== -->
    <!-- EKSTRAKURIKULER — feature grid with accent                     -->
    <!-- ============================================================== -->
    <section class="relative py-24">
      <div class="absolute inset-0 -z-10 aurora opacity-50"></div>
      <div class="container-page text-center">
        <div v-reveal>
          <span class="eyebrow">Pengembangan Diri</span>
          <h2 class="section-title mt-3">Kegiatan Ekstrakurikuler</h2>
          <p class="section-kicker mx-auto max-w-2xl">
            Wadah pengembangan bakat, kepemimpinan, dan karakter di luar jam belajar.
          </p>
        </div>
        <div class="mt-12 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(item, i) in highlights"
            :key="item.id"
            v-reveal="{ delay: i * 70 }"
            class="card card-hover relative overflow-hidden p-6"
          >
            <!-- Top accent line on hover -->
            <span class="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary-500 to-accent-500 transition-transform duration-500 group-hover:scale-x-100"></span>
            <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 text-primary-700 shadow-soft dark:from-primary-500/20 dark:to-primary-500/5 dark:text-primary-300">
              <Award class="h-5 w-5" />
            </div>
            <h3 class="font-display text-lg font-semibold text-ink-900 dark:text-white">{{ item.name }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{{ item.description }}</p>
            <div class="mt-5 flex items-center justify-between border-t border-ink-100 pt-4 text-xs font-medium text-ink-500 dark:border-ink-800 dark:text-ink-400">
              <span class="font-mono uppercase tracking-wider">Ekskul</span>
              <ArrowRight class="h-4 w-4 text-ink-300 transition group-hover:translate-x-1 group-hover:text-primary-500" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================== -->
    <!-- CTA BANNER — dark gradient with strong hook                    -->
    <!-- ============================================================== -->
    <section class="relative overflow-hidden">
      <div class="container-page pb-24">
        <div class="relative overflow-hidden rounded-3xl border border-ink-200 bg-gradient-to-br from-primary-700 via-primary-800 to-ink-900 px-8 py-14 text-white shadow-elevated dark:border-ink-800 md:px-14 md:py-16">
          <div class="grid-pattern pointer-events-none absolute inset-0 opacity-60"></div>
          <div class="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-400/20 blur-3xl"></div>
          <div class="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-primary-300/20 blur-3xl"></div>

          <div class="relative grid items-center gap-8 md:grid-cols-2">
            <div>
              <span class="eyebrow-light">
                <Sparkles class="h-3.5 w-3.5" />
                PPDB 2026
              </span>
              <h2 class="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">
                Siap bergabung dengan<br />
                <span class="bg-gradient-to-r from-white via-blue-100 to-accent-200 bg-clip-text text-transparent">{{ profile.profile.name }}?</span>
              </h2>
              <p class="mt-3 max-w-md text-blue-100/90">
                Dapatkan informasi pendaftaran, biaya, dan jadwal lengkap. Tim kami siap membantu.
              </p>
            </div>
            <div class="flex flex-wrap justify-start gap-3 md:justify-end">
              <router-link
                to="/contact"
                class="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-primary-700 shadow-elevated transition hover:bg-blue-50"
              >
                Hubungi Kami
                <ArrowRight class="h-4 w-4 transition group-hover:translate-x-0.5" />
              </router-link>
              <router-link
                to="/profile"
                class="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Pelajari Lebih Lanjut
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>