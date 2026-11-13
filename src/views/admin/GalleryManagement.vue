<script setup>
import { ref } from 'vue'
import { Plus, Pencil, Trash2 } from '@lucide/vue'
import AdminHeader from '@/components/admin/AdminHeader.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import ModalForm from '@/components/common/ModalForm.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { useGalleryStore } from '@/stores/galleryStore.js'
import PlaceholderImage from '@/components/common/PlaceholderImage.vue'
import { useToastStore } from '@/stores/toastStore.js'

const store = useGalleryStore()
const toast = useToastStore()

const showModal = ref(false)
const showConfirm = ref(false)
const editing = ref(null)
const deletingId = ref(null)

const initialForm = {
  title: '',
  description: '',
  image: '',
}

const form = ref({ ...initialForm })

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
  form.value = { title: item.title, description: item.description, image: item.image || '' }
  showModal.value = true
}

const save = () => {
  if (!form.value.title || !form.value.image) {
    toast.add('Mohon lengkapi judul dan unggah gambar', 'error')
    return
  }
  if (editing.value) {
    store.update(editing.value.id, form.value)
    toast.add('Galeri berhasil diperbarui')
  } else {
    store.add(form.value)
    toast.add('Foto berhasil ditambahkan ke galeri')
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
    toast.add('Foto berhasil dihapus')
  }
  showConfirm.value = false
  deletingId.value = null
}
</script>

<template>
  <div>
    <AdminHeader title="Manajemen Galeri" />
    <div class="p-4 md:p-6">
      <div class="mb-6 flex justify-end">
        <BaseButton @click="openAdd">
          <Plus class="mr-1.5 h-4 w-4" /> Tambah Foto
        </BaseButton>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="item in store.items"
          :key="item.id"
          class="card card-hover group overflow-hidden"
        >
          <div class="relative h-48 overflow-hidden">
            <img v-if="item.image" :src="item.image" :alt="item.title" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <PlaceholderImage v-else :label="item.title" :seed="item.title" />
          </div>
          <div class="p-4">
            <h3 class="font-display font-semibold text-ink-800 dark:text-white">{{ item.title }}</h3>
            <p class="mt-1 line-clamp-2 text-sm text-ink-500 dark:text-ink-400">{{ item.description }}</p>
            <div class="mt-3 flex justify-end gap-1">
              <button class="rounded-lg p-1.5 text-ink-500 transition hover:bg-ink-100 hover:text-primary-600 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-primary-400" @click="openEdit(item)">
                <Pencil class="h-4 w-4" />
              </button>
              <button class="rounded-lg p-1.5 text-ink-500 transition hover:bg-rose-50 hover:text-rose-600 dark:text-ink-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-400" @click="confirmDelete(item.id)">
                <Trash2 class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="store.items.length === 0" class="mt-12 text-center text-ink-500 dark:text-ink-400">
        Belum ada foto di galeri.
      </div>
    </div>

    <ModalForm :show="showModal" :title="editing ? 'Edit Foto' : 'Tambah Foto'" @close="showModal = false">
      <div class="space-y-4">
        <div>
          <label class="field-label">Judul</label>
          <input v-model="form.title" type="text" class="input-field" />
        </div>
        <div>
          <label class="field-label">Deskripsi</label>
          <textarea v-model="form.description" rows="3" class="input-field"></textarea>
        </div>
        <div>
          <label class="field-label">Gambar (maks. 500KB)</label>
          <input type="file" accept="image/*" class="mt-1 block w-full text-sm text-ink-600 dark:text-ink-300 file:mr-3 file:rounded-lg file:border-0 file:bg-primary-50 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-primary-500/10 dark:file:text-primary-300" @change="handleImageUpload" />
          <div v-if="form.image" class="mt-2 h-24 w-40 overflow-hidden rounded-xl border border-ink-200 dark:border-ink-800">
            <img :src="form.image" class="h-full w-full object-cover" />
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
      title="Hapus Foto"
      message="Apakah Anda yakin ingin menghapus foto ini?"
      @cancel="showConfirm = false"
      @confirm="remove"
    />
  </div>
</template>
