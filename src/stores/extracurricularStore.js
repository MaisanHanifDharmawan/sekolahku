import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import seedData from '@/data/seedData.json'
import { loadFromStorage, saveToStorage } from '@/utils/storage.js'

const STORAGE_KEY = 'school_extracurriculars'

export const useExtracurricularStore = defineStore('extracurriculars', () => {
  const items = ref(loadFromStorage(STORAGE_KEY, seedData.extracurriculars))

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
    items.value = seedData.extracurriculars
    save()
  }

  const loadBackup = (data) => {
    items.value = data
    save()
  }

  return {
    items: computed(() => items.value),
    add,
    update,
    remove,
    reset,
    loadBackup,
  }
})
