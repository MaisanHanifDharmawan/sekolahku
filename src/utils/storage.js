const safeParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export const loadFromStorage = (key, fallback = null) => {
  return safeParse(localStorage.getItem(key), fallback)
}

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error(`Gagal menyimpan ${key}:`, e)
    throw e
  }
}

export const removeFromStorage = (key) => {
  localStorage.removeItem(key)
}
