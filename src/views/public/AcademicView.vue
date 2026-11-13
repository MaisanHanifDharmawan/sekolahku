<script setup>
import { BookOpen, Trophy, ArrowUpRight, Sparkles } from '@lucide/vue'
import { useMajorStore } from '@/stores/majorStore.js'
import { useExtracurricularStore } from '@/stores/extracurricularStore.js'

const majors = useMajorStore()
const extracurriculars = useExtracurricularStore()
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
            Akademik &amp; Ekstrakurikuler
          </span>
          <h1 class="mt-5 font-display text-display-lg text-white">
            <span class="block">Program Pembelajaran</span>
            <span class="block bg-gradient-to-r from-white via-blue-100 to-accent-200 bg-clip-text text-transparent">
              Yang Membentuk Karakter
            </span>
          </h1>
          <p class="mx-auto mt-4 max-w-2xl text-base text-blue-100/85">
            Peminatan akademik dan pengembangan diri untuk menyiapkan siswa ke jenjang berikutnya.
          </p>
        </div>
      </div>
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-ink-50 dark:to-ink-950"></div>
    </section>

    <!-- Majors -->
    <section id="majors" class="relative py-20">
      <div class="container-page">
        <div v-reveal class="mb-10 flex items-end justify-between gap-4">
          <div>
            <div class="flex items-center gap-3">
              <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-glow">
                <BookOpen class="h-5 w-5" />
              </span>
              <div>
                <p class="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">Peminatan Akademik</p>
                <h2 class="font-display text-2xl font-bold text-ink-900 dark:text-white">Program Peminatan</h2>
              </div>
            </div>
            <p class="mt-3 max-w-xl text-sm text-ink-500 dark:text-ink-400">
              Jurusan yang tersedia untuk siswa sesuai bakat dan minatnya.
            </p>
          </div>
          <span class="hidden font-mono text-xs uppercase tracking-wider text-ink-400 sm:block">
            {{ majors.items.length }} Program
          </span>
        </div>
        <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(major, i) in majors.items"
            :key="major.id"
            v-reveal="{ delay: i * 80 }"
            class="card card-hover group relative overflow-hidden p-6"
          >
            <span class="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary-500 to-accent-500 transition-transform duration-500 group-hover:scale-x-100"></span>
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 font-display text-sm font-bold text-white shadow-glow">
                  {{ String(i + 1).padStart(2, '0') }}
                </span>
                <span class="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">Jurusan</span>
              </div>
              <ArrowUpRight class="h-5 w-5 text-ink-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-500" />
            </div>
            <h3 class="mt-5 font-display text-lg font-semibold text-ink-900 dark:text-white">{{ major.name }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{{ major.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Ekstrakurikuler -->
    <section id="extracurriculars" class="relative bg-white py-20 dark:bg-ink-900/40">
      <div class="container-page">
        <div v-reveal class="mb-10 flex items-end justify-between gap-4">
          <div>
            <div class="flex items-center gap-3">
              <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 text-white shadow-glow-accent">
                <Trophy class="h-5 w-5" />
              </span>
              <div>
                <p class="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-600 dark:text-accent-300">Pengembangan Diri</p>
                <h2 class="font-display text-2xl font-bold text-ink-900 dark:text-white">Ekstrakurikuler</h2>
              </div>
            </div>
            <p class="mt-3 max-w-xl text-sm text-ink-500 dark:text-ink-400">
              Wadah pengembangan bakat, kepemimpinan, dan karakter.
            </p>
          </div>
          <span class="hidden font-mono text-xs uppercase tracking-wider text-ink-400 sm:block">
            {{ extracurriculars.items.length }} Ekskul
          </span>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(item, i) in extracurriculars.items"
            :key="item.id"
            v-reveal="{ delay: i * 60 }"
            class="card card-hover group p-5"
          >
            <div class="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 font-display text-sm font-bold text-white shadow-glow-accent">
              {{ item.name.charAt(0) }}
            </div>
            <h3 class="font-display font-semibold text-ink-900 dark:text-white">{{ item.name }}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{{ item.description }}</p>
            <div class="mt-5 flex items-center justify-between border-t border-ink-100 pt-3 text-xs text-ink-400 dark:border-ink-800">
              <span class="font-mono uppercase tracking-wider">Ekskul</span>
              <ArrowUpRight class="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>