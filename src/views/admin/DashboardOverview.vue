<script setup>
import { computed } from 'vue'
import { Users, UserCircle, Newspaper, Award, Image, MessageSquare } from '@lucide/vue'
import AdminHeader from '@/components/admin/AdminHeader.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { useSchoolProfileStore } from '@/stores/schoolProfile.js'
import { useStudentStore } from '@/stores/studentStore.js'
import { useTeacherStore } from '@/stores/teacherStore.js'
import { useNewsStore } from '@/stores/newsStore.js'
import { useGalleryStore } from '@/stores/galleryStore.js'
import { useMessageStore } from '@/stores/messageStore.js'

const profile = useSchoolProfileStore()
const students = useStudentStore()
const teachers = useTeacherStore()
const news = useNewsStore()
const gallery = useGalleryStore()
const messages = useMessageStore()

const cards = computed(() => [
  { label: 'Siswa Aktif', value: students.totalActive, icon: Users, from: 'from-blue-500', to: 'to-blue-700' },
  { label: 'Guru Aktif', value: teachers.totalActive, icon: UserCircle, from: 'from-emerald-500', to: 'to-emerald-700' },
  { label: 'Berita', value: news.items.length, icon: Newspaper, from: 'from-violet-500', to: 'to-violet-700' },
  { label: 'Galeri', value: gallery.items.length, icon: Image, from: 'from-orange-500', to: 'to-orange-700' },
  { label: 'Akreditasi', value: profile.profile.accreditation, icon: Award, from: 'from-amber-500', to: 'to-amber-700' },
  { label: 'Pesan Baru', value: messages.unreadCount, icon: MessageSquare, from: 'from-rose-500', to: 'to-rose-700' },
])
</script>

<template>
  <div>
    <AdminHeader title="Dashboard" />

    <div class="mb-8">
      <h2 class="font-display text-lg font-semibold text-ink-800 dark:text-white">Selamat datang, Admin</h2>
      <p class="text-sm text-ink-500 dark:text-ink-400">Ringkasan data {{ profile.profile.name }}</p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <div
        v-for="card in cards"
        :key="card.label"
        class="card flex items-center gap-4 p-5"
      >
        <div
          class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-soft"
          :class="[card.from, card.to]"
        >
          <component :is="card.icon" class="h-5 w-5" />
        </div>
        <div>
          <p class="font-display text-2xl font-bold text-ink-900 dark:text-white">{{ card.value }}</p>
          <p class="text-sm text-ink-500 dark:text-ink-400">{{ card.label }}</p>
        </div>
      </div>
    </div>

    <div class="mt-8 grid gap-6 lg:grid-cols-2">
      <div class="card p-5">
        <h3 class="font-display font-semibold text-ink-800 dark:text-white">Berita Terbaru</h3>
        <ul v-if="news.items.length" class="mt-3 divide-y divide-ink-100 dark:divide-ink-800">
          <li v-for="item in news.latest.slice(0, 5)" :key="item.id" class="py-3">
            <p class="font-medium text-ink-700 dark:text-ink-200">{{ item.title }}</p>
            <p class="mt-0.5 text-xs text-ink-400">{{ new Date(item.createdAt).toLocaleDateString('id-ID') }}</p>
          </li>
        </ul>
        <EmptyState v-else title="Belum ada berita" />
      </div>

      <div class="card p-5">
        <h3 class="font-display font-semibold text-ink-800 dark:text-white">Pesan Masuk</h3>
        <ul v-if="messages.items.length" class="mt-3 divide-y divide-ink-100 dark:divide-ink-800">
          <li v-for="item in messages.items.slice(0, 5)" :key="item.id" class="py-3">
            <p class="flex items-center gap-2 font-medium text-ink-700 dark:text-ink-200">
              {{ item.name }}
              <span v-if="!item.read" class="badge bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">Baru</span>
            </p>
            <p class="mt-0.5 text-xs text-ink-400">{{ item.subject || '(tanpa subjek)' }}</p>
          </li>
        </ul>
        <EmptyState v-else title="Belum ada pesan" />
      </div>
    </div>
  </div>
</template>
