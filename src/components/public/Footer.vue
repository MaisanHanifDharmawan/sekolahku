<script setup>
import { MapPin, Phone, Mail, GraduationCap, ArrowUpRight } from '@lucide/vue'
import SocialIcon from '@/components/common/SocialIcon.vue'
import { useSchoolProfileStore } from '@/stores/schoolProfile.js'

const profile = useSchoolProfileStore()

const links = [
  { name: 'Beranda', to: '/' },
  { name: 'Profil', to: '/profile' },
  { name: 'Akademik', to: '/academic' },
  { name: 'Berita', to: '/news' },
  { name: 'Galeri', to: '/gallery' },
  { name: 'Kontak', to: '/contact' },
]

const akademiks = [
  { name: 'Jurusan', to: '/academic#majors' },
  { name: 'Ekstrakurikuler', to: '/academic#extracurriculars' },
]
</script>

<template>
  <footer class="relative mt-auto overflow-hidden bg-ink-950 text-ink-300">
    <!-- Decorative top accent line -->
    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent"></div>
    <div class="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-primary-600/15 blur-3xl"></div>
    <div class="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-accent-500/10 blur-3xl"></div>

    <div class="relative mx-auto max-w-7xl px-4 py-16 lg:px-6">
      <div class="grid gap-10 md:grid-cols-12">
        <!-- Brand block -->
        <div class="md:col-span-5">
          <div class="flex items-center gap-2.5">
            <span class="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-glow">
              <GraduationCap class="h-5 w-5" />
              <span class="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-ink-950 bg-accent-500"></span>
            </span>
            <span class="font-display text-lg font-bold text-white">Sekolahku</span>
          </div>
          <p class="mt-5 max-w-sm text-sm leading-relaxed text-ink-400">{{ profile.profile.vision }}</p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span class="badge border border-white/10 bg-white/5 text-ink-300">Akreditasi {{ profile.profile.accreditation }}</span>
            <span class="badge border border-white/10 bg-white/5 text-ink-300">NPSN {{ profile.profile.npsn }}</span>
          </div>
        </div>

        <!-- Navigation columns -->
        <div class="md:col-span-2">
          <h4 class="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-400">Halaman</h4>
          <ul class="mt-5 space-y-2.5">
            <li v-for="link in links" :key="link.to">
              <router-link :to="link.to" class="group inline-flex items-center gap-1 text-sm transition hover:text-white">
                <span class="link-underline">{{ link.name }}</span>
                <ArrowUpRight class="h-3 w-3 opacity-0 transition group-hover:opacity-60" />
              </router-link>
            </li>
          </ul>
        </div>

        <div class="md:col-span-2">
          <h4 class="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-400">Akademik</h4>
          <ul class="mt-5 space-y-2.5">
            <li v-for="link in akademiks" :key="link.to">
              <a :href="link.to" class="group inline-flex items-center gap-1 text-sm transition hover:text-white">
                <span class="link-underline">{{ link.name }}</span>
                <ArrowUpRight class="h-3 w-3 opacity-0 transition group-hover:opacity-60" />
              </a>
            </li>
            <li>
              <router-link to="/admin/login" class="group inline-flex items-center gap-1 text-sm text-accent-300 transition hover:text-accent-200">
                <span class="link-underline">Portal Admin</span>
                <ArrowUpRight class="h-3 w-3" />
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact block -->
        <div class="md:col-span-3">
          <h4 class="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-400">Hubungi Kami</h4>
          <ul class="mt-5 space-y-3 text-sm">
            <li class="flex items-start gap-2.5">
              <span class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 text-primary-300">
                <MapPin class="h-3.5 w-3.5" />
              </span>
              <span class="text-ink-300">{{ profile.profile.address }}</span>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 text-primary-300">
                <Phone class="h-3.5 w-3.5" />
              </span>
              <span class="text-ink-300">{{ profile.profile.phone }}</span>
            </li>
            <li class="flex items-center gap-2.5">
              <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 text-primary-300">
                <Mail class="h-3.5 w-3.5" />
              </span>
              <span class="break-all text-ink-300">{{ profile.profile.email }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Social + CTA banner -->
      <div class="mt-12 grid items-center gap-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur sm:grid-cols-2">
        <div>
          <h4 class="font-display text-base font-semibold text-white">Ikuti perjalanan kami</h4>
          <p class="mt-1 text-sm text-ink-400">Update kegiatan, prestasi, dan cerita dari lingkungan sekolah.</p>
        </div>
        <div class="flex flex-wrap justify-start gap-2 sm:justify-end">
          <a
            v-for="p in ['facebook', 'instagram', 'twitter', 'youtube']"
            :key="p"
            :href="profile.profile.socialMedia[p]"
            target="_blank"
            rel="noopener"
            :aria-label="p"
            class="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-ink-300 transition hover:border-primary-400/50 hover:bg-primary-500/15 hover:text-white"
          >
            <SocialIcon :platform="p" :size="18" />
          </a>
        </div>
      </div>

      <div class="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row">
        <p class="text-ink-400">&copy; {{ new Date().getFullYear() }} {{ profile.profile.name }}. All rights reserved.</p>
        <p class="flex items-center gap-2 text-ink-400">
          <span class="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-emerald-400"></span>
          Dibangun dengan Vue 3 & Tailwind CSS
        </p>
      </div>
    </div>
  </footer>
</template>