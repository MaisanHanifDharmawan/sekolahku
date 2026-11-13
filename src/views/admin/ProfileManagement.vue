<script setup>
import { ref } from 'vue'
import { Plus, Pencil, Trash2, Save } from '@lucide/vue'
import AdminHeader from '@/components/admin/AdminHeader.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseTable from '@/components/common/BaseTable.vue'
import ModalForm from '@/components/common/ModalForm.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { useSchoolProfileStore } from '@/stores/schoolProfile.js'
import { useMajorStore } from '@/stores/majorStore.js'
import { useExtracurricularStore } from '@/stores/extracurricularStore.js'
import { useToastStore } from '@/stores/toastStore.js'

const profileStore = useSchoolProfileStore()
const majorStore = useMajorStore()
const extracurricularStore = useExtracurricularStore()
const toast = useToastStore()

const profile = ref({ ...profileStore.profile })
const activeTab = ref('profile')

const saveProfile = () => {
  profileStore.updateProfile(profile.value)
  toast.add('Profil sekolah berhasil disimpan')
}

// Major CRUD
const majorModal = ref(false)
const majorConfirm = ref(false)
const editingMajor = ref(null)
const deletingMajorId = ref(null)
const majorForm = ref({ name: '', description: '' })

const openMajorAdd = () => {
  editingMajor.value = null
  majorForm.value = { name: '', description: '' }
  majorModal.value = true
}

const openMajorEdit = (item) => {
  editingMajor.value = item
  majorForm.value = { name: item.name, description: item.description }
  majorModal.value = true
}

const saveMajor = () => {
  if (!majorForm.value.name) {
    toast.add('Nama jurusan wajib diisi', 'error')
    return
  }
  if (editingMajor.value) {
    majorStore.update(editingMajor.value.id, majorForm.value)
    toast.add('Jurusan berhasil diperbarui')
  } else {
    majorStore.add(majorForm.value)
    toast.add('Jurusan berhasil ditambahkan')
  }
  majorModal.value = false
}

const confirmMajorDelete = (id) => {
  deletingMajorId.value = id
  majorConfirm.value = true
}

const removeMajor = () => {
  if (deletingMajorId.value) {
    majorStore.remove(deletingMajorId.value)
    toast.add('Jurusan berhasil dihapus')
  }
  majorConfirm.value = false
  deletingMajorId.value = null
}

// Extracurricular CRUD
const extracurricularModal = ref(false)
const extracurricularConfirm = ref(false)
const editingExtracurricular = ref(null)
const deletingExtracurricularId = ref(null)
const extracurricularForm = ref({ name: '', description: '' })

const openExtracurricularAdd = () => {
  editingExtracurricular.value = null
  extracurricularForm.value = { name: '', description: '' }
  extracurricularModal.value = true
}

const openExtracurricularEdit = (item) => {
  editingExtracurricular.value = item
  extracurricularForm.value = { name: item.name, description: item.description }
  extracurricularModal.value = true
}

const saveExtracurricular = () => {
  if (!extracurricularForm.value.name) {
    toast.add('Nama kegiatan wajib diisi', 'error')
    return
  }
  if (editingExtracurricular.value) {
    extracurricularStore.update(editingExtracurricular.value.id, extracurricularForm.value)
    toast.add('Kegiatan berhasil diperbarui')
  } else {
    extracurricularStore.add(extracurricularForm.value)
    toast.add('Kegiatan berhasil ditambahkan')
  }
  extracurricularModal.value = false
}

const confirmExtracurricularDelete = (id) => {
  deletingExtracurricularId.value = id
  extracurricularConfirm.value = true
}

const removeExtracurricular = () => {
  if (deletingExtracurricularId.value) {
    extracurricularStore.remove(deletingExtracurricularId.value)
    toast.add('Kegiatan berhasil dihapus')
  }
  extracurricularConfirm.value = false
  deletingExtracurricularId.value = null
}
</script>

<template>
  <div>
    <AdminHeader title="Profil Sekolah" />
    <div class="p-4 md:p-6">
      <div class="mb-6 border-b border-ink-200 dark:border-ink-800">
        <nav class="flex gap-1">
          <button
            v-for="tab in ['profile', 'majors', 'extracurriculars']"
            :key="tab"
            class="relative px-3 py-2.5 text-sm font-semibold transition"
            :class="activeTab === tab ? 'text-primary-600 dark:text-primary-400' : 'text-ink-500 hover:text-ink-800 dark:text-ink-400 dark:hover:text-white'"
            @click="activeTab = tab"
          >
            {{ tab === 'profile' ? 'Profil' : tab === 'majors' ? 'Jurusan' : 'Ekstrakurikuler' }}
            <span v-if="activeTab === tab" class="absolute inset-x-0 -bottom-px h-0.5 bg-primary-600 dark:bg-primary-400"></span>
          </button>
        </nav>
      </div>

      <div v-if="activeTab === 'profile'" class="card max-w-3xl space-y-4 p-6 md:p-8">
        <div>
          <label class="field-label">Nama Sekolah</label>
          <input v-model="profile.name" type="text" class="input-field" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="field-label">NPSN</label>
            <input v-model="profile.npsn" type="text" class="input-field" />
          </div>
          <div>
            <label class="field-label">Akreditasi</label>
            <input v-model="profile.accreditation" type="text" class="input-field" />
          </div>
        </div>
        <div>
          <label class="field-label">Alamat</label>
          <textarea v-model="profile.address" rows="2" class="input-field"></textarea>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="field-label">Telepon</label>
            <input v-model="profile.phone" type="text" class="input-field" />
          </div>
          <div>
            <label class="field-label">Email</label>
            <input v-model="profile.email" type="text" class="input-field" />
          </div>
        </div>
        <div>
          <label class="field-label">Website</label>
          <input v-model="profile.website" type="text" class="input-field" />
        </div>
        <div>
          <label class="field-label">Kepala Sekolah</label>
          <input v-model="profile.principal" type="text" class="input-field" />
        </div>
        <div>
          <label class="field-label">Sambutan Kepala Sekolah</label>
          <textarea v-model="profile.principalMessage" rows="4" class="input-field"></textarea>
        </div>
        <div>
          <label class="field-label">Visi</label>
          <textarea v-model="profile.vision" rows="3" class="input-field"></textarea>
        </div>
        <div>
          <label class="field-label">Sejarah</label>
          <textarea v-model="profile.history" rows="4" class="input-field"></textarea>
        </div>
        <BaseButton @click="saveProfile">
          <Save class="mr-2 h-4 w-4" /> Simpan Profil
        </BaseButton>
      </div>

      <div v-if="activeTab === 'majors'">
        <div class="mb-4 flex justify-end">
          <BaseButton @click="openMajorAdd">
            <Plus class="mr-1.5 h-4 w-4" /> Tambah Jurusan
          </BaseButton>
        </div>
        <BaseTable :columns="[{ key: 'name', label: 'Nama' }, { key: 'description', label: 'Deskripsi' }, { key: 'actions', label: 'Aksi' }]" :items="majorStore.items" empty-text="Belum ada jurusan">
          <template #actions="{ item }">
            <div class="flex gap-1">
              <button class="rounded-lg p-1.5 text-ink-500 transition hover:bg-ink-100 hover:text-primary-600 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-primary-400" @click="openMajorEdit(item)"><Pencil class="h-4 w-4" /></button>
              <button class="rounded-lg p-1.5 text-ink-500 transition hover:bg-rose-50 hover:text-rose-600 dark:text-ink-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-400" @click="confirmMajorDelete(item.id)"><Trash2 class="h-4 w-4" /></button>
            </div>
          </template>
        </BaseTable>
      </div>

      <div v-if="activeTab === 'extracurriculars'">
        <div class="mb-4 flex justify-end">
          <BaseButton @click="openExtracurricularAdd">
            <Plus class="mr-1.5 h-4 w-4" /> Tambah Kegiatan
          </BaseButton>
        </div>
        <BaseTable :columns="[{ key: 'name', label: 'Nama' }, { key: 'description', label: 'Deskripsi' }, { key: 'actions', label: 'Aksi' }]" :items="extracurricularStore.items" empty-text="Belum ada kegiatan">
          <template #actions="{ item }">
            <div class="flex gap-1">
              <button class="rounded-lg p-1.5 text-ink-500 transition hover:bg-ink-100 hover:text-primary-600 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-primary-400" @click="openExtracurricularEdit(item)"><Pencil class="h-4 w-4" /></button>
              <button class="rounded-lg p-1.5 text-ink-500 transition hover:bg-rose-50 hover:text-rose-600 dark:text-ink-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-400" @click="confirmExtracurricularDelete(item.id)"><Trash2 class="h-4 w-4" /></button>
            </div>
          </template>
        </BaseTable>
      </div>
    </div>

    <ModalForm :show="majorModal" :title="editingMajor ? 'Edit Jurusan' : 'Tambah Jurusan'" @close="majorModal = false">
      <div class="space-y-4">
        <div>
          <label class="field-label">Nama Jurusan</label>
          <input v-model="majorForm.name" type="text" class="input-field" />
        </div>
        <div>
          <label class="field-label">Deskripsi</label>
          <textarea v-model="majorForm.description" rows="3" class="input-field"></textarea>
        </div>
      </div>
      <template #footer>
        <BaseButton variant="secondary" @click="majorModal = false">Batal</BaseButton>
        <BaseButton @click="saveMajor">Simpan</BaseButton>
      </template>
    </ModalForm>

    <ConfirmDialog
      :show="majorConfirm"
      title="Hapus Jurusan"
      message="Apakah Anda yakin ingin menghapus jurusan ini?"
      @cancel="majorConfirm = false"
      @confirm="removeMajor"
    />

    <ModalForm :show="extracurricularModal" :title="editingExtracurricular ? 'Edit Kegiatan' : 'Tambah Kegiatan'" @close="extracurricularModal = false">
      <div class="space-y-4">
        <div>
          <label class="field-label">Nama Kegiatan</label>
          <input v-model="extracurricularForm.name" type="text" class="input-field" />
        </div>
        <div>
          <label class="field-label">Deskripsi</label>
          <textarea v-model="extracurricularForm.description" rows="3" class="input-field"></textarea>
        </div>
      </div>
      <template #footer>
        <BaseButton variant="secondary" @click="extracurricularModal = false">Batal</BaseButton>
        <BaseButton @click="saveExtracurricular">Simpan</BaseButton>
      </template>
    </ModalForm>

    <ConfirmDialog
      :show="extracurricularConfirm"
      title="Hapus Kegiatan"
      message="Apakah Anda yakin ingin menghapus kegiatan ini?"
      @cancel="extracurricularConfirm = false"
      @confirm="removeExtracurricular"
    />
  </div>
</template>
