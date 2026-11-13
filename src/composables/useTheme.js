import { ref } from 'vue'
import { loadFromStorage, saveToStorage } from '@/utils/storage.js'

const STORAGE_KEY = 'school_theme'

const getInitial = () => {
  const stored = loadFromStorage(STORAGE_KEY, null)
  if (stored === 'dark' || stored === 'light') return stored
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

const theme = ref(getInitial())

const apply = () => {
  const root = document.documentElement
  if (theme.value === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export function useTheme() {
  const toggle = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    saveToStorage(STORAGE_KEY, theme.value)
    apply()
  }

  const init = () => apply()

  return { theme, toggle, init }
}
