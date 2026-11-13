import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loadFromStorage, saveToStorage, removeFromStorage } from '@/utils/storage.js'

const STORAGE_KEY = 'school_auth'
const DUMMY_USER = { username: 'admin', password: 'admin123' }

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(loadFromStorage(STORAGE_KEY, false))

  const login = (username, password) => {
    if (username === DUMMY_USER.username && password === DUMMY_USER.password) {
      isAuthenticated.value = true
      saveToStorage(STORAGE_KEY, true)
      return { success: true }
    }
    return { success: false, message: 'Username atau password salah' }
  }

  const logout = () => {
    isAuthenticated.value = false
    removeFromStorage(STORAGE_KEY)
  }

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    login,
    logout,
  }
})
