import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import seedData from '@/data/seedData.json'
import { loadFromStorage, saveToStorage } from '@/utils/storage.js'

const STORAGE_KEY = 'school_news'

export const useNewsStore = defineStore('news', () => {
  const items = ref(loadFromStorage(STORAGE_KEY, seedData.news))

  const add = (data) => {
    const newItem = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    }
    items.value.unshift(newItem)
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
    items.value = seedData.news
    save()
  }

  const loadBackup = (data) => {
    items.value = data
    save()
  }

  const latest = computed(() =>
    [...items.value].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  )

  const findById = (id) => items.value.find((i) => i.id === Number(id))

  return {
    items: computed(() => items.value),
    latest,
    findById,
    add,
    update,
    remove,
    reset,
    loadBackup,
  }
})
