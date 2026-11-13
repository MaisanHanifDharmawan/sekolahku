<script setup>
import { ref, computed } from 'vue'
import { Plus, Search, Pencil, Trash2 } from '@lucide/vue'
import AdminHeader from '@/components/admin/AdminHeader.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseTable from '@/components/common/BaseTable.vue'
import ModalForm from '@/components/common/ModalForm.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { useStudentStore } from '@/stores/studentStore.js'
import { useToastStore } from '@/stores/toastStore.js'

const store = useStudentStore()
const toast = useToastStore()

const search = ref('')
const showModal = ref(false)
const showConfirm = ref(false)
const editing = ref(null)
const deletingId = ref(null)

const initialForm = {
  nisn: '',
  name: '',
  class: '',
  gender: 'Laki-laki',
  status: 'Aktif',
}

const form = ref({ ...initialForm })

const columns = [
  { key: 'nisn', label: 'NISN' },
  { key: 'name', label: 'Nama' },
  { key: 'class', label: 'Kelas' },
  { key: 'gender', label: 'Jenis Kelamin' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Aksi' },
]

const filteredItems = computed(() => {
  if (!search.value) return store.items
  const q = search.value.toLowerCase()
  return store.items.filter(
    (i) =>
      i.name.toLowerCase().includes(q) ||
      i.nisn.toLowerCase().includes(q) ||
      i.class.toLowerCase().includes(q)
  )
})

const openAdd = () => {
  editing.value = null
  form.value = { ...initialForm }
  showModal.value = true
}

const openEdit = (item) => {
  editing.value = item
  form.value = { ...item }
  showModal.value = true
}

const save = () => {
  if (!form.value.nisn || !form.value.name || !form.value.class) {
    toast.add('Mohon lengkapi data siswa', 'error')
    return
  }
  if (editing.value) {
    store.update(editing.value.id, form.value)
    toast.add('Data siswa berhasil diperbarui')
  } else {
    store.add(form.value)
    toast.add('Siswa berhasil ditambahkan')
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
    toast.add('Siswa berhasil dihapus')
  }
  showConfirm.value = false
  deletingId.value = null
}
</script>

<template>
  <div>
    <AdminHeader title="Manajemen Siswa" />
    <div class="p-4 md:p-6">
      <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div class="relative max-w-sm flex-1">
          <Search class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input v-model="search" type="text" placeholder="Cari siswa..." class="input-field pl-10" />
        </div>
        <BaseButton @click="openAdd">
          <Plus class="mr-1.5 h-4 w-4" /> Tambah Siswa
        </BaseButton>
      </div>

      <BaseTable :columns="columns" :items="filteredItems" empty-text="Belum ada data siswa">
        <template #status="{ value }">
          <span class="badge" :class="value === 'Aktif' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300' : 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300'">
            {{ value }}
          </span>
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

    <ModalForm :show="showModal" :title="editing ? 'Edit Siswa' : 'Tambah Siswa'" @close="showModal = false">
      <div class="space-y-4">
        <div>
          <label class="field-label">NISN</label>
          <input v-model="form.nisn" type="text" class="input-field" />
        </div>
        <div>
          <label class="field-label">Nama Lengkap</label>
          <input v-model="form.name" type="text" class="input-field" />
        </div>
        <div>
          <label class="field-label">Kelas</label>
          <input v-model="form.class" type="text" placeholder="contoh: X IPA 1" class="input-field" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="field-label">Jenis Kelamin</label>
            <select v-model="form.gender" class="input-field">
              <option>Laki-laki</option>
              <option>Perempuan</option>
            </select>
          </div>
          <div>
            <label class="field-label">Status</label>
            <select v-model="form.status" class="input-field">
              <option>Aktif</option>
              <option>Tidak Aktif</option>
            </select>
          </div>
        </div>
      </div>
      <template #footer>
        <BaseButton variant="secondary" @click="showModal = false">Batal</BaseButton>
        <BaseButton @click="save">Simpan</BaseButton>
      </template>
    </ModalForm>

    <ConfirmDialog
      :show="showConfirm"
      title="Hapus Siswa"
      message="Apakah Anda yakin ingin menghapus data siswa ini?"
      @cancel="showConfirm = false"
      @confirm="remove"
    />
  </div>
</template>
