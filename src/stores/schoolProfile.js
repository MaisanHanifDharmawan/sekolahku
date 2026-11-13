import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import seedData from '@/data/seedData.json'
import { loadFromStorage, saveToStorage } from '@/utils/storage.js'

const STORAGE_KEY = 'school_profile'

export const useSchoolProfileStore = defineStore('schoolProfile', () => {
  const profile = ref(loadFromStorage(STORAGE_KEY, seedData.schoolProfile))

  const updateProfile = (data) => {
    profile.value = { ...profile.value, ...data }
    saveToStorage(STORAGE_KEY, profile.value)
  }

  const reset = () => {
    profile.value = seedData.schoolProfile
    saveToStorage(STORAGE_KEY, profile.value)
  }

  const loadBackup = (data) => {
    profile.value = data
    saveToStorage(STORAGE_KEY, profile.value)
  }

  return {
    profile: computed(() => profile.value),
    updateProfile,
    reset,
    loadBackup,
  }
})
