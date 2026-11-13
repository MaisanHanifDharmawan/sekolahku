<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { GraduationCap, Lock, User, ArrowLeft } from '@lucide/vue'
import BaseButton from '@/components/common/BaseButton.vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'
import ToastContainer from '@/components/common/ToastContainer.vue'
import { useAuthStore } from '@/stores/authStore.js'
import { useToastStore } from '@/stores/toastStore.js'

const router = useRouter()
const auth = useAuthStore()
const toast = useToastStore()

const form = ref({ username: '', password: '' })
const loading = ref(false)

const login = () => {
  if (!form.value.username || !form.value.password) {
    toast.add('Mohon isi username dan password', 'error')
    return
  }
  loading.value = true
  setTimeout(() => {
    const result = auth.login(form.value.username, form.value.password)
    if (result.success) {
      toast.add('Login berhasil')
      router.push({ name: 'admin-dashboard' })
    } else {
      toast.add(result.message, 'error')
    }
    loading.value = false
  }, 500)
}
</script>

<template>
  <div class="flex min-h-screen">
    <div class="relative hidden w-1/2 overflow-hidden gradient-mesh lg:flex lg:flex-col lg:justify-between p-10 text-white">
      <div class="grid-pattern pointer-events-none absolute inset-0"></div>
      <div class="relative flex items-center gap-2.5">
        <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
          <GraduationCap class="h-5 w-5" />
        </span>
        <span class="font-display text-lg font-bold">Sekolahku</span>
      </div>
      <div class="relative max-w-md">
        <h2 class="font-display text-4xl font-extrabold leading-tight">Kelola sekolah dengan lebih mudah.</h2>
        <p class="mt-4 text-blue-100/80">Dashboard manajemen untuk data siswa, guru, berita, dan profil sekolah — semuanya di satu tempat.</p>
      </div>
      <p class="relative text-xs text-white/50">Vue 3 · Pinia · Tailwind CSS</p>
    </div>

    <div class="relative flex flex-1 flex-col items-center justify-center bg-ink-50 px-6 dark:bg-ink-950">
      <div class="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div class="w-full max-w-sm">
        <div class="mb-8 lg:hidden">
          <div class="flex items-center gap-2">
            <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white">
              <GraduationCap class="h-5 w-5" />
            </span>
            <span class="font-display text-lg font-bold text-ink-900 dark:text-white">Sekolahku</span>
          </div>
        </div>
        <h1 class="font-display text-2xl font-bold text-ink-900 dark:text-white">Masuk Admin</h1>
        <p class="mt-1 text-sm text-ink-500 dark:text-ink-400">Gunakan akun demo untuk masuk ke dashboard.</p>

        <form class="mt-8 space-y-4" @submit.prevent="login">
          <div>
            <label class="field-label">Username</label>
            <div class="relative">
              <User class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input v-model="form.username" type="text" class="input-field pl-10" placeholder="admin" />
            </div>
          </div>
          <div>
            <label class="field-label">Password</label>
            <div class="relative">
              <Lock class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input v-model="form.password" type="password" class="input-field pl-10" placeholder="••••••••" />
            </div>
          </div>
          <BaseButton type="submit" class="w-full" size="lg" :loading="loading">
            {{ loading ? 'Masuk...' : 'Masuk' }}
          </BaseButton>
        </form>

        <div class="mt-6 rounded-xl border border-ink-200 bg-white p-3 text-center text-xs text-ink-500 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-400">
          <p>Demo login</p>
          <p class="mt-0.5 font-mono font-medium text-ink-700 dark:text-ink-300">admin / admin123</p>
        </div>

        <router-link
          to="/"
          class="mt-6 inline-flex items-center gap-1.5 text-sm text-ink-500 transition hover:text-primary-600 dark:hover:text-primary-400"
        >
          <ArrowLeft class="h-4 w-4" /> Kembali ke Beranda
        </router-link>
      </div>
    </div>
    <ToastContainer />
  </div>
</template>
