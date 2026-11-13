<script setup>
import { useRouter } from 'vue-router'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import ToastContainer from '@/components/common/ToastContainer.vue'
import { useAuthStore } from '@/stores/authStore.js'

const router = useRouter()
const auth = useAuthStore()

const logout = () => {
  auth.logout()
  router.push({ name: 'admin-login' })
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-ink-50 dark:bg-ink-950 lg:flex-row">
    <AdminSidebar @logout="logout" />
    <div class="flex min-w-0 flex-1 flex-col">
      <main class="flex-1 p-4 md:p-6 lg:p-8">
        <router-view v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" />
          </Transition>
        </router-view>
      </main>
    </div>
    <ToastContainer />
  </div>
</template>
