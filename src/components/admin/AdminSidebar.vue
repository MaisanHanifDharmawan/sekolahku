<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  LayoutDashboard,
  Users,
  UserCircle,
  Newspaper,
  Image,
  School,
  Database,
  LogOut,
  Menu,
  X,
  GraduationCap,
} from '@lucide/vue'

const emit = defineEmits(['logout'])
const route = useRoute()
const isOpen = ref(false)

const links = [
  { name: 'Dashboard', to: '/admin', icon: LayoutDashboard, exact: true },
  { name: 'Siswa', to: '/admin/students', icon: Users },
  { name: 'Guru', to: '/admin/teachers', icon: UserCircle },
  { name: 'Berita', to: '/admin/news', icon: Newspaper },
  { name: 'Galeri', to: '/admin/gallery', icon: Image },
  { name: 'Profil Sekolah', to: '/admin/profile', icon: School },
  { name: 'Data', to: '/admin/data', icon: Database },
]

const isActive = (link) => {
  if (link.exact) return route.path === link.to
  return route.path.startsWith(link.to)
}

const logout = () => {
  emit('logout')
  isOpen.value = false
}
</script>

<template>
  <aside class="no-scrollbar hidden w-64 shrink-0 flex-col border-r border-ink-200/80 bg-white dark:border-ink-800 dark:bg-ink-900 lg:sticky lg:top-0 lg:flex lg:h-screen lg:overflow-y-auto">
    <div class="flex items-center gap-2.5 border-b border-ink-100 px-5 py-5 dark:border-ink-800">
      <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white shadow-glow">
        <GraduationCap class="h-5 w-5" />
      </span>
      <div>
        <p class="font-display text-sm font-bold text-ink-900 dark:text-white">Sekolahku</p>
        <p class="text-[11px] font-medium text-ink-500 dark:text-ink-400">Admin Panel</p>
      </div>
    </div>
    <nav class="flex-1 space-y-0.5 px-3 py-4">
      <router-link
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition"
        :class="isActive(link)
          ? 'bg-primary-50 font-semibold text-primary-700 ring-1 ring-primary-200/70 dark:bg-primary-500/15 dark:text-primary-300 dark:ring-primary-500/25'
          : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-white'"
      >
        <span
          v-if="isActive(link)"
          class="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary-600"
        ></span>
        <component :is="link.icon" class="h-5 w-5" />
        {{ link.name }}
      </router-link>
    </nav>
    <div class="border-t border-ink-100 p-3 dark:border-ink-800">
      <button
        class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
        @click="logout"
      >
        <LogOut class="h-5 w-5" />
        Keluar
      </button>
    </div>
  </aside>

  <div class="lg:hidden">
    <div class="sticky top-0 z-40 flex items-center justify-between border-b border-ink-200 bg-white px-4 py-3 dark:border-ink-800 dark:bg-ink-900">
      <div class="flex items-center gap-2">
        <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
          <GraduationCap class="h-4 w-4" />
        </span>
        <span class="font-display font-bold text-ink-900 dark:text-white">Admin</span>
      </div>
      <button
        class="inline-flex h-9 w-9 items-center justify-center rounded-xl text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
        @click="isOpen = !isOpen"
      >
        <Menu v-if="!isOpen" class="h-5 w-5" />
        <X v-else class="h-5 w-5" />
      </button>
    </div>
    <Transition name="fade">
      <div v-if="isOpen" class="border-b border-ink-200 bg-white px-3 pb-3 dark:border-ink-800 dark:bg-ink-900">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium"
          :class="isActive(link)
            ? 'bg-primary-50 font-semibold text-primary-700 dark:bg-primary-500/15 dark:text-primary-300'
            : 'text-ink-600 dark:text-ink-400'"
          @click="isOpen = false"
        >
          <component :is="link.icon" class="h-5 w-5" />
          {{ link.name }}
        </router-link>
        <button
          class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600"
          @click="logout"
        >
          <LogOut class="h-5 w-5" />
          Keluar
        </button>
      </div>
    </Transition>
  </div>
</template>
