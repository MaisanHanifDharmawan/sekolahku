<script setup>
import { Award, MapPin, Phone, Mail, Globe, Quote, History, Sparkles } from '@lucide/vue'
import { useSchoolProfileStore } from '@/stores/schoolProfile.js'

const profile = useSchoolProfileStore()
</script>

<template>
  <div>
    <!-- HERO BANNER -->
    <section class="relative overflow-hidden gradient-mesh text-white">
      <div class="grid-pattern pointer-events-none absolute inset-0 opacity-70"></div>
      <div class="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-accent-400/15 blur-3xl"></div>
      <div class="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-primary-300/15 blur-3xl"></div>
      <div class="relative mx-auto max-w-7xl px-4 py-20 lg:px-6 lg:py-24">
        <div v-reveal class="text-center">
          <span class="eyebrow-light animate-fade-down">
            <Sparkles class="h-3.5 w-3.5" />
            Profil Sekolah
          </span>
          <h1 class="mt-5 font-display text-display-lg text-white">
            {{ profile.profile.name }}
          </h1>
          <p class="mx-auto mt-4 max-w-2xl text-base text-blue-100/85">
            NPSN {{ profile.profile.npsn }} · Akreditasi {{ profile.profile.accreditation }}
          </p>
        </div>
      </div>
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-ink-50 dark:to-ink-950"></div>
    </section>

    <!-- MAIN CONTENT -->
    <section class="relative py-16 lg:py-20">
      <div class="container-page">
        <div class="grid gap-8 lg:grid-cols-3">
          <!-- Main column -->
          <div class="space-y-8 lg:col-span-2">
            <!-- Sambutan -->
            <section v-reveal class="card overflow-hidden">
              <div class="flex flex-col gap-6 p-6 md:flex-row md:items-center md:gap-8 md:p-8">
                <div class="relative shrink-0">
                  <div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-2xl font-bold text-white shadow-glow">
                    {{ profile.profile.principal.charAt(0) }}
                  </div>
                  <span class="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-4 border-white bg-accent-500 text-white dark:border-ink-900">
                    <Award class="h-3 w-3" />
                  </span>
                </div>
                <div class="flex-1">
                  <span class="eyebrow">Sambutan</span>
                  <h2 class="mt-3 font-display text-xl font-semibold text-ink-900 dark:text-white">Sambutan Kepala Sekolah</h2>
                  <p class="mt-3 leading-relaxed text-ink-600 dark:text-ink-400">{{ profile.profile.principalMessage }}</p>
                  <div class="mt-4 border-t border-ink-100 pt-4 dark:border-ink-800">
                    <p class="font-display font-semibold text-ink-900 dark:text-white">{{ profile.profile.principal }}</p>
                    <p class="text-xs font-medium uppercase tracking-wider text-ink-500 dark:text-ink-400">Kepala Sekolah</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Sejarah -->
            <section v-reveal="{ delay: 80 }" class="card p-6 md:p-8">
              <div class="flex items-center gap-3">
                <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-glow">
                  <History class="h-5 w-5" />
                </span>
                <div>
                  <p class="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">Tentang Kami</p>
                  <h2 class="font-display text-xl font-semibold text-ink-900 dark:text-white">Sejarah Singkat</h2>
                </div>
              </div>
              <p class="mt-5 leading-relaxed text-ink-600 dark:text-ink-400">{{ profile.profile.history }}</p>
            </section>

            <!-- Visi Misi -->
            <section v-reveal="{ delay: 120 }" class="card overflow-hidden">
              <div class="border-b border-ink-100 bg-gradient-to-br from-primary-50/60 via-white to-white p-6 md:p-8 dark:border-ink-800 dark:from-primary-500/5 dark:via-ink-900 dark:to-ink-900">
                <div class="flex items-center gap-3">
                  <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-600 text-white shadow-glow">
                    <Quote class="h-5 w-5" />
                  </span>
                  <div>
                    <p class="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">Arah Kami</p>
                    <h2 class="font-display text-xl font-semibold text-ink-900 dark:text-white">Visi &amp; Misi</h2>
                  </div>
                </div>
                <div class="mt-6 rounded-2xl border border-primary-200/60 bg-white/70 p-5 shadow-soft dark:border-primary-500/20 dark:bg-ink-900/40">
                  <h3 class="font-display text-sm font-semibold uppercase tracking-wider text-primary-700 dark:text-primary-300">Visi</h3>
                  <p class="mt-2 leading-relaxed text-ink-700 dark:text-ink-300">{{ profile.profile.vision }}</p>
                </div>
              </div>
              <div class="p-6 md:p-8">
                <h3 class="font-display text-sm font-semibold uppercase tracking-wider text-primary-700 dark:text-primary-300">Misi</h3>
                <ol class="mt-4 space-y-3">
                  <li
                    v-for="(mission, i) in profile.profile.mission"
                    :key="i"
                    class="group flex gap-4 rounded-xl border border-ink-200/70 bg-white p-4 transition hover:border-primary-300 hover:shadow-soft dark:border-ink-800 dark:bg-ink-900 dark:hover:border-primary-500/40"
                  >
                    <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 text-sm font-bold text-white shadow-glow">
                      {{ String(i + 1).padStart(2, '0') }}
                    </span>
                    <p class="text-sm leading-relaxed text-ink-700 dark:text-ink-300">{{ mission }}</p>
                  </li>
                </ol>
              </div>
            </section>
          </div>

          <!-- Aside -->
          <aside class="space-y-6">
            <div v-reveal="{ delay: 60 }" class="card overflow-hidden p-0">
              <div class="border-b border-ink-200 bg-gradient-to-br from-primary-700 to-primary-900 p-6 text-white dark:border-ink-800">
                <span class="eyebrow-light">
                  <Sparkles class="h-3.5 w-3.5" />
                  Identitas Resmi
                </span>
                <h3 class="mt-3 font-display text-base font-semibold">{{ profile.profile.name }}</h3>
              </div>
              <ul class="divide-y divide-ink-100 dark:divide-ink-800">
                <li v-for="row in [
                  { icon: Award, label: 'NPSN', value: profile.profile.npsn },
                  { icon: Award, label: 'Akreditasi', value: profile.profile.accreditation },
                  { icon: MapPin, label: 'Alamat', value: profile.profile.address },
                  { icon: Phone, label: 'Telepon', value: profile.profile.phone },
                  { icon: Mail, label: 'Email', value: profile.profile.email },
                  { icon: Globe, label: 'Website', value: profile.profile.website || '—' },
                ]" :key="row.label" class="flex items-start gap-3 px-6 py-4">
                  <span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
                    <component :is="row.icon" class="h-4 w-4" />
                  </span>
                  <div class="min-w-0">
                    <p class="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">{{ row.label }}</p>
                    <p class="mt-0.5 text-sm font-medium text-ink-800 dark:text-ink-200">{{ row.value }}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div v-reveal="{ delay: 100 }" class="card overflow-hidden bg-gradient-to-br from-primary-700 to-primary-900 p-6 text-white">
              <span class="eyebrow-light">
                <Sparkles class="h-3.5 w-3.5" />
                Bergabung
              </span>
              <h3 class="mt-3 font-display text-lg font-semibold">PPDB 2026 Dibuka</h3>
              <p class="mt-2 text-sm text-blue-100/85">
                Pelajari program peminatan dan kegiatan ekstrakurikuler sebelum mendaftar.
              </p>
              <router-link
                to="/academic"
                class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white"
              >
                <span class="link-underline">Lihat Program Akademik</span>
              </router-link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>