<script setup>
import Navbar from '@/components/public/Navbar.vue'
import Footer from '@/components/public/Footer.vue'
import ToastContainer from '@/components/common/ToastContainer.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-ink-50 dark:bg-ink-950">
    <Navbar />
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>
    <Footer />
    <ToastContainer />
  </div>
</template>