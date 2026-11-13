<script setup>
import { ref } from 'vue'
import { Download, Upload, RotateCcw, FileJson, ShieldCheck, Info } from '@lucide/vue'
import AdminHeader from '@/components/admin/AdminHeader.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { useDataStore } from '@/stores/dataStore.js'
import { useToastStore } from '@/stores/toastStore.js'

const dataStore = useDataStore()
const toast = useToastStore()

const showResetConfirm = ref(false)
const fileInput = ref(null)

const exportData = () => {
  dataStore.exportToFile()
  toast.add('Backup berhasil diunduh')
}

const handleImport = (e) => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    try {
      const json = JSON.parse(reader.result)
      dataStore.importBackup(json)
      toast.add('Data berhasil diimpor')
    } catch {
      toast.add('File tidak valid', 'error')
    }
    if (fileInput.value) fileInput.value.value = ''
  }
  reader.readAsText(file)
}

const resetData = () => {
  dataStore.resetAll()
  showResetConfirm.value = false
  toast.add('Data berhasil direset ke default')
}

const actions = [
  {
    title: 'Export Data',
    description: 'Unduh seluruh data sekolah dalam format JSON sebagai backup.',
    icon: Download,
    color: 'from-blue-500 to-blue-700',
    button: 'Export JSON',
    buttonIcon: FileJson,
  },
  {
    title: 'Import Data',
    description: 'Muat data dari file JSON hasil backup sebelumnya.',
    icon: Upload,
    color: 'from-emerald-500 to-emerald-700',
    button: 'Pilih File JSON',
    buttonIcon: Upload,
    action: 'import',
  },
  {
    title: 'Reset Data',
    description: 'Kembalikan seluruh data ke kondisi awal (data dummy).',
    icon: RotateCcw,
    color: 'from-rose-500 to-rose-700',
    button: 'Reset ke Default',
    buttonIcon: RotateCcw,
    action: 'reset',
  },
]
</script>

<template>
  <div>
    <AdminHeader title="Manajemen Data" />

    <div class="grid gap-5 md:grid-cols-3">
      <div
        v-for="(a, i) in actions"
        :key="a.title"
        v-reveal="{ delay: i * 80 }"
        class="card card-hover p-6"
      >
        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-soft" :class="a.color">
          <component :is="a.icon" class="h-5 w-5" />
        </div>
        <h3 class="mt-4 font-display text-lg font-semibold text-ink-900 dark:text-white">{{ a.title }}</h3>
        <p class="mt-1 text-sm text-ink-500 dark:text-ink-400">{{ a.description }}</p>
        <input ref="fileInput" type="file" accept="application/json" class="hidden" @change="handleImport" />
        <BaseButton
          :variant="a.action === 'reset' ? 'danger' : 'primary'"
          class="mt-4 w-full"
          @click="a.action === 'reset' ? (showResetConfirm = true) : a.action === 'import' ? fileInput.click() : exportData()"
        >
          <component :is="a.buttonIcon" class="mr-2 h-4 w-4" /> {{ a.button }}
        </BaseButton>
      </div>
    </div>

    <div class="card mt-8 p-6">
      <div class="flex items-center gap-3">
        <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
          <Info class="h-5 w-5" />
        </span>
        <h3 class="font-display text-lg font-semibold text-ink-900 dark:text-white">Catatan</h3>
      </div>
      <ul class="mt-4 space-y-2.5 text-sm text-ink-600 dark:text-ink-400">
        <li class="flex gap-2">
          <ShieldCheck class="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
          Semua data disimpan di browser (localStorage). Jangan bersihkan cache jika ingin data tetap tersimpan.
        </li>
        <li class="flex gap-2">
          <ShieldCheck class="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
          File backup berformat JSON dan dapat dipindahkan ke perangkat lain.
        </li>
        <li class="flex gap-2">
          <ShieldCheck class="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
          Reset data akan menghapus semua perubahan dan mengembalikan data awal.
        </li>
      </ul>
    </div>

    <ConfirmDialog
      :show="showResetConfirm"
      title="Reset Semua Data"
      message="Tindakan ini tidak dapat dibatalkan. Seluruh data akan dikembalikan ke kondisi awal."
      @cancel="showResetConfirm = false"
      @confirm="resetData"
    />
  </div>
</template>
