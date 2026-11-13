import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import seedData from '@/data/seedData.json'
import { loadFromStorage, saveToStorage } from '@/utils/storage.js'

const STORAGE_KEY = 'school_students'

export const useStudentStore = defineStore('students', () => {
  const items = ref(loadFromStorage(STORAGE_KEY, seedData.students))

  const add = (data) => {
    items.value.unshift({ ...data, id: Date.now() })
    save()
  }

  const update = (id, data) => {
    const index = items.value.findIndex((i) => i.id === id)
    if (index !== -1) {
      items.value[index] = { ...items.value[index], ...data }
      save()
    }
  }

  const remove = (id) => {
    items.value = items.value.filter((i) => i.id !== id)
    save()
  }

  const save = () => saveToStorage(STORAGE_KEY, items.value)

  const reset = () => {
    items.value = seedData.students
    save()
  }

  const loadBackup = (data) => {
    items.value = data
    save()
  }

  const totalActive = computed(() => items.value.filter((i) => i.status === 'Aktif').length)

  return {
    items: computed(() => items.value),
    totalActive,
    add,
    update,
    remove,
    reset,
    loadBackup,
  }
})
