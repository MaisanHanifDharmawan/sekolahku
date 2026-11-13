<script setup>
import { ref, computed } from 'vue'
import { Plus, Search, Pencil, Trash2 } from '@lucide/vue'
import AdminHeader from '@/components/admin/AdminHeader.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseTable from '@/components/common/BaseTable.vue'
import ModalForm from '@/components/common/ModalForm.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { useNewsStore } from '@/stores/newsStore.js'
import { useToastStore } from '@/stores/toastStore.js'

const store = useNewsStore()
const toast = useToastStore()

const search = ref('')
const showModal = ref(false)
const showConfirm = ref(false)
const editing = ref(null)
const deletingId = ref(null)

const initialForm = {
  title: '',
  category: 'Pengumuman',
  content: '',
  image: '',
}

const form = ref({ ...initialForm })

const columns = [
  { key: 'title', label: 'Judul' },
  { key: 'category', label: 'Kategori' },
  { key: 'createdAt', label: 'Tanggal' },
  { key: 'actions', label: 'Aksi' },
]

const filteredItems = computed(() => {
  if (!search.value) return store.latest
  const q = search.value.toLowerCase()
  return store.latest.filter(
    (i) =>
      i.title.toLowerCase().includes(q) ||
      i.content.toLowerCase().includes(q) ||
      i.category.toLowerCase().includes(q)
  )
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID')
}

const handleImageUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return
  if (file.size > 500 * 1024) {
    toast.add('Ukuran gambar maksimal 500KB', 'error')
    e.target.value = ''
    return
  }
  const reader = new FileReader()
  reader.onload = () => {
    form.value.image = reader.result
  }
  reader.readAsDataURL(file)
}

const openAdd = () => {
  editing.value = null
  form.value = { ...initialForm }
  showModal.value = true
}

const openEdit = (item) => {
  editing.value = item
  form.value = { title: item.title, category: item.category, content: item.content, image: item.image || '' }
  showModal.value = true
}

const save = () => {
  if (!form.value.title || !form.value.content) {
    toast.add('Mohon lengkapi judul dan konten berita', 'error')
    return
  }
  if (editing.value) {
    store.update(editing.value.id, form.value)
    toast.add('Berita berhasil diperbarui')
  } else {
    store.add(form.value)
    toast.add('Berita berhasil ditambahkan')
  }
  showModal.value = false
}

const confirmDelete = (id) => {
  deletingId.value = id
  showConfirm.value = true
}

const remove = () => {
  if (deletingId.value) {
    store.remove(deletingId.value)
    toast.add('Berita berhasil dihapus')
  }
  showConfirm.value = false
  deletingId.value = null
}
</script>

<template>
  <div>
    <AdminHeader title="Manajemen Berita" />
    <div class="p-4 md:p-6">
      <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div class="relative max-w-sm flex-1">
          <Search class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input v-model="search" type="text" placeholder="Cari berita..." class="input-field pl-10" />
        </div>
        <BaseButton @click="openAdd">
          <Plus class="mr-1.5 h-4 w-4" /> Tambah Berita
        </BaseButton>
      </div>

      <BaseTable :columns="columns" :items="filteredItems" empty-text="Belum ada berita">
        <template #title="{ item }">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-ink-100 dark:bg-ink-800">
              <img v-if="item.image" :src="item.image" class="h-full w-full object-cover" />
              <div v-else class="flex h-full items-center justify-center text-ink-400 text-[10px] font-medium">IMG</div>
            </div>
            <span class="font-medium text-ink-800 dark:text-ink-200">{{ item.title }}</span>
          </div>
        </template>
        <template #category="{ value }">
          <span class="badge bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-300">{{ value }}</span>
        </template>
        <template #createdAt="{ value }">
          <span class="text-ink-500 dark:text-ink-400">{{ formatDate(value) }}</span>
        </template>
        <template #actions="{ item }">
          <div class="flex gap-1">
            <button class="rounded-lg p-1.5 text-ink-500 transition hover:bg-ink-100 hover:text-primary-600 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-primary-400" @click="openEdit(item)">
              <Pencil class="h-4 w-4" />
            </button>
            <button class="rounded-lg p-1.5 text-ink-500 transition hover:bg-rose-50 hover:text-rose-600 dark:text-ink-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-400" @click="confirmDelete(item.id)">
              <Trash2 class="h-4 w-4" />
            </button>
          </div>
        </template>
      </BaseTable>
    </div>

    <ModalForm :show="showModal" :title="editing ? 'Edit Berita' : 'Tambah Berita'" @close="showModal = false">
      <div class="space-y-4">
        <div>
          <label class="field-label">Judul</label>
          <input v-model="form.title" type="text" class="input-field" />
        </div>
        <div>
          <label class="field-label">Kategori</label>
          <select v-model="form.category" class="input-field">
            <option>Pengumuman</option>
            <option>Prestasi</option>
            <option>Kegiatan</option>
            <option>Artikel</option>
          </select>
        </div>
        <div>
          <label class="field-label">Gambar (maks. 500KB)</label>
          <input type="file" accept="image/*" class="mt-1 block w-full text-sm text-ink-600 dark:text-ink-300 file:mr-3 file:rounded-lg file:border-0 file:bg-primary-50 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-primary-500/10 dark:file:text-primary-300" @change="handleImageUpload" />
          <div v-if="form.image" class="mt-2 h-24 w-40 overflow-hidden rounded-xl border border-ink-200 dark:border-ink-800">
            <img :src="form.image" class="h-full w-full object-cover" />
          </div>
        </div>
        <div>
          <label class="field-label">Konten</label>
          <textarea v-model="form.content" rows="6" class="input-field"></textarea>
        </div>
      </div>
      <template #footer>
        <BaseButton variant="secondary" @click="showModal = false">Batal</BaseButton>
        <BaseButton @click="save">Simpan</BaseButton>
      </template>
    </ModalForm>

    <ConfirmDialog
      :show="showConfirm"
      title="Hapus Berita"
      message="Apakah Anda yakin ingin menghapus berita ini?"
      @cancel="showConfirm = false"
      @confirm="remove"
    />
  </div>
</template>
