import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import seedData from '@/data/seedData.json'
import { loadFromStorage, saveToStorage } from '@/utils/storage.js'

const STORAGE_KEY = 'school_messages'

export const useMessageStore = defineStore('messages', () => {
  const items = ref(loadFromStorage(STORAGE_KEY, seedData.messages))

  const add = (data) => {
    const newItem = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      read: false,
    }
    items.value.unshift(newItem)
    save()
  }

  const markAsRead = (id) => {
    const index = items.value.findIndex((i) => i.id === id)
    if (index !== -1) {
      items.value[index].read = true
      save()
    }
  }

  const remove = (id) => {
    items.value = items.value.filter((i) => i.id !== id)
    save()
  }

  const save = () => saveToStorage(STORAGE_KEY, items.value)

  const reset = () => {
    items.value = seedData.messages
    save()
  }

  const loadBackup = (data) => {
    items.value = data
    save()
  }

  const unreadCount = computed(() => items.value.filter((i) => !i.read).length)

  return {
    items: computed(() => items.value),
    unreadCount,
    add,
    markAsRead,
    remove,
    reset,
    loadBackup,
  }
})
