<script setup>
import { ref } from 'vue'
import { MapPin, Phone, Mail, Send, MessageSquare, Sparkles, Clock } from '@lucide/vue'
import BaseButton from '@/components/common/BaseButton.vue'
import SocialIcon from '@/components/common/SocialIcon.vue'
import { useSchoolProfileStore } from '@/stores/schoolProfile.js'
import { useMessageStore } from '@/stores/messageStore.js'
import { useToastStore } from '@/stores/toastStore.js'

const profile = useSchoolProfileStore()
const messageStore = useMessageStore()
const toast = useToastStore()

const form = ref({ name: '', email: '', subject: '', message: '' })
const loading = ref(false)

const submit = () => {
  if (!form.value.name || !form.value.email || !form.value.message) {
    toast.add('Mohon lengkapi data yang wajib diisi', 'error')
    return
  }
  loading.value = true
  setTimeout(() => {
    messageStore.add({ ...form.value })
    toast.add('Pesan berhasil dikirim')
    form.value = { name: '', email: '', subject: '', message: '' }
    loading.value = false
  }, 500)
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
            Hubungi Kami
          </span>
          <h1 class="mt-5 font-display text-display-lg text-white">
            <span class="block">Kami Siap</span>
            <span class="block bg-gradient-to-r from-white via-blue-100 to-accent-200 bg-clip-text text-transparent">Mendengarkan</span>
          </h1>
          <p class="mx-auto mt-4 max-w-2xl text-base text-blue-100/85">
            Kirim pesan, temukan lokasi kami, atau hubungi melalui kanal resmi sekolah.
          </p>
        </div>
      </div>
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-ink-50 dark:to-ink-950"></div>
    </section>

    <section class="relative py-16">
      <div class="container-page">
        <div class="grid gap-8 lg:grid-cols-3">
          <!-- Form -->
          <div v-reveal="{ delay: 80 }" class="lg:col-span-2">
            <div class="card overflow-hidden">
              <div class="border-b border-ink-200 bg-gradient-to-br from-primary-50/60 via-white to-white p-6 dark:border-ink-800 dark:from-primary-500/5 dark:via-ink-900 dark:to-ink-900 md:p-8">
                <div class="flex items-center gap-3">
                  <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-glow">
                    <Send class="h-4 w-4" />
                  </span>
                  <div>
                    <p class="font-mono text-[11px] font-semibold uppercase tracking-wider text-primary-700 dark:text-primary-300">Formulir Pesan</p>
                    <h2 class="font-display text-xl font-semibold text-ink-900 dark:text-white">Kirim Pesan</h2>
                  </div>
                </div>
                <p class="mt-3 text-sm text-ink-500 dark:text-ink-400">
                  Isi formulir di bawah ini dan tim kami akan merespon sesegera mungkin.
                </p>
              </div>
              <form class="space-y-5 p-6 md:p-8" @submit.prevent="submit">
                <div class="grid gap-4 md:grid-cols-2">
                  <div>
                    <label class="field-label">Nama Lengkap *</label>
                    <input v-model="form.name" type="text" class="input-field" placeholder="Nama Anda" />
                  </div>
                  <div>
                    <label class="field-label">Email *</label>
                    <input v-model="form.email" type="email" class="input-field" placeholder="email@contoh.com" />
                  </div>
                </div>
                <div>
                  <label class="field-label">Subjek</label>
                  <input v-model="form.subject" type="text" class="input-field" placeholder="Subjek pesan" />
                </div>
                <div>
                  <label class="field-label">Pesan *</label>
                  <textarea v-model="form.message" rows="5" class="input-field resize-none" placeholder="Tulis pesan Anda di sini..."></textarea>
                </div>
                <div class="flex items-center justify-between gap-3">
                  <p class="text-xs text-ink-500 dark:text-ink-400">* Wajib diisi</p>
                  <BaseButton type="submit" :loading="loading" size="lg">
                    <Send class="mr-2 h-4 w-4" /> {{ loading ? 'Mengirim...' : 'Kirim Pesan' }}
                  </BaseButton>
                </div>
              </form>
            </div>
          </div>

          <!-- Aside -->
          <aside class="space-y-6">
            <div v-reveal="{ delay: 60 }" class="card overflow-hidden p-0">
              <div class="border-b border-ink-200 bg-gradient-to-br from-primary-700 to-primary-900 p-5 text-white dark:border-ink-800">
                <span class="eyebrow-light">
                  <Sparkles class="h-3.5 w-3.5" />
                  Kontak
                </span>
                <h3 class="mt-2 font-display text-base font-semibold">Informasi Resmi</h3>
              </div>
              <ul class="divide-y divide-ink-100 dark:divide-ink-800">
                <li class="flex items-start gap-3 px-5 py-4">
                  <span class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
                    <MapPin class="h-4 w-4" />
                  </span>
                  <div class="min-w-0">
                    <p class="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">Alamat</p>
                    <p class="mt-0.5 text-sm font-medium text-ink-800 dark:text-ink-200">{{ profile.profile.address }}</p>
                  </div>
                </li>
                <li class="flex items-start gap-3 px-5 py-4">
                  <span class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
                    <Phone class="h-4 w-4" />
                  </span>
                  <div class="min-w-0">
                    <p class="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">Telepon</p>
                    <p class="mt-0.5 text-sm font-medium text-ink-800 dark:text-ink-200">{{ profile.profile.phone }}</p>
                  </div>
                </li>
                <li class="flex items-start gap-3 px-5 py-4">
                  <span class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
                    <Mail class="h-4 w-4" />
                  </span>
                  <div class="min-w-0">
                    <p class="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">Email</p>
                    <p class="mt-0.5 break-all text-sm font-medium text-ink-800 dark:text-ink-200">{{ profile.profile.email }}</p>
                  </div>
                </li>
                <li class="flex items-start gap-3 px-5 py-4">
                  <span class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
                    <Clock class="h-4 w-4" />
                  </span>
                  <div class="min-w-0">
                    <p class="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">Jam Layanan</p>
                    <p class="mt-0.5 text-sm font-medium text-ink-800 dark:text-ink-200">Senin–Jumat, 07.00–16.00 WIB</p>
                  </div>
                </li>
              </ul>
            </div>

            <div v-reveal="{ delay: 120 }" class="card p-6">
              <h3 class="font-display text-base font-semibold text-ink-900 dark:text-white">Media Sosial</h3>
              <div class="mt-4 flex gap-2">
                <a
                  v-for="p in ['facebook', 'instagram', 'twitter', 'youtube']"
                  :key="p"
                  :href="profile.profile.socialMedia[p]"
                  target="_blank"
                  rel="noopener"
                  :aria-label="p"
                  class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-200 bg-ink-50 text-ink-500 transition hover:border-primary-300 hover:bg-primary-500/10 hover:text-primary-600 dark:border-ink-800 dark:bg-ink-800 dark:text-ink-300 dark:hover:border-primary-500/40 dark:hover:text-primary-300"
                >
                  <SocialIcon :platform="p" :size="18" />
                </a>
              </div>
            </div>

            <a
              v-reveal="{ delay: 180 }"
              :href="profile.profile.mapUrl"
              target="_blank"
              rel="noopener"
              class="card group flex items-center justify-between gap-3 p-5 transition hover:border-primary-300 hover:shadow-elevated"
            >
              <div class="flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-glow">
                  <MessageSquare class="h-4 w-4" />
                </span>
                <div>
                  <p class="font-display text-sm font-semibold text-ink-900 dark:text-white">Lokasi Sekolah</p>
                  <p class="text-xs text-ink-500 dark:text-ink-400">Buka di Google Maps</p>
                </div>
              </div>
              <span class="text-lg text-ink-300 transition group-hover:translate-x-1 group-hover:text-primary-500">→</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>