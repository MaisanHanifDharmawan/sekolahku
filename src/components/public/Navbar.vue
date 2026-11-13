<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X, GraduationCap, ArrowUpRight } from '@lucide/vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'

const isOpen = ref(false)
const scrolled = ref(false)

const links = [
  { name: 'Beranda', to: '/' },
  { name: 'Profil', to: '/profile' },
  { name: 'Akademik', to: '/academic' },
  { name: 'Berita', to: '/news' },
  { name: 'Galeri', to: '/gallery' },
  { name: 'Kontak', to: '/contact' },
]

const onScroll = () => {
  scrolled.value = window.scrollY > 8
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="sticky top-0 z-40 transition-all duration-300"
    :class="scrolled
      ? 'border-b border-ink-200/80 bg-white/85 shadow-soft backdrop-blur-xl dark:border-ink-800 dark:bg-ink-950/85'
      : 'border-b border-transparent bg-white/0 backdrop-blur-0'"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
      <router-link to="/" class="group flex items-center gap-2.5">
        <span class="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-glow transition group-hover:scale-105">
          <GraduationCap class="h-5 w-5" />
          <span class="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-accent-500 dark:border-ink-950"></span>
        </span>
        <span class="flex flex-col leading-tight">
          <span class="font-display text-lg font-bold tracking-tight text-ink-900 dark:text-white">Sekolahku</span>
          <span class="hidden font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-400 sm:block">Akreditasi A</span>
        </span>
      </router-link>

      <nav class="hidden items-center gap-1 lg:flex">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="group relative rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition hover:text-primary-600 dark:text-ink-300 dark:hover:text-primary-400"
          active-class="text-primary-600 dark:text-primary-400"
        >
          <span class="relative z-10">{{ link.name }}</span>
          <span class="absolute inset-x-2 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transition-transform duration-300 group-hover:scale-x-100"></span>
          <span class="absolute inset-0 -z-10 scale-95 rounded-lg bg-primary-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-primary-500/10"></span>
        </router-link>
      </nav>

      <div class="hidden items-center gap-2 lg:flex">
        <ThemeToggle />
        <router-link
          to="/admin/login"
          class="group inline-flex items-center gap-1.5 rounded-xl bg-ink-900 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-600 hover:shadow-glow dark:bg-white dark:text-ink-900 dark:hover:bg-primary-500 dark:hover:text-white"
        >
          Admin
          <ArrowUpRight class="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </router-link>
      </div>

      <div class="flex items-center gap-1 lg:hidden">
        <ThemeToggle />
        <button
          class="inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink-600 transition hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
          aria-label="Buka menu"
          @click="isOpen = !isOpen"
        >
          <Menu v-if="!isOpen" class="h-5 w-5" />
          <X v-else class="h-5 w-5" />
        </button>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="isOpen" class="border-t border-ink-100 bg-white px-4 pb-5 pt-3 shadow-soft dark:border-ink-800 dark:bg-ink-950 lg:hidden">
        <nav class="grid gap-1">
          <router-link
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-ink-600 transition hover:bg-primary-50 hover:text-primary-700 dark:text-ink-300 dark:hover:bg-primary-500/10 dark:hover:text-primary-300"
            active-class="bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-300"
            @click="isOpen = false"
          >
            {{ link.name }}
            <ArrowUpRight class="h-4 w-4 opacity-40" />
          </router-link>
        </nav>
        <router-link
          to="/admin/login"
          class="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-ink-900"
          @click="isOpen = false"
        >
          Masuk Admin
          <ArrowUpRight class="h-3.5 w-3.5" />
        </router-link>
      </div>
    </Transition>
  </header>
</template>