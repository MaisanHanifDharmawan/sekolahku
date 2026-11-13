import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js'

const routes = [
  {
    path: '/',
    component: () => import('@/views/public/PublicLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('@/views/public/HomeView.vue') },
      { path: 'profile', name: 'profile', component: () => import('@/views/public/ProfileView.vue') },
      { path: 'academic', name: 'academic', component: () => import('@/views/public/AcademicView.vue') },
      { path: 'news', name: 'news', component: () => import('@/views/public/NewsView.vue') },
      { path: 'news/:id', name: 'news-detail', component: () => import('@/views/public/NewsDetailView.vue') },
      { path: 'gallery', name: 'gallery', component: () => import('@/views/public/GalleryView.vue') },
      { path: 'contact', name: 'contact', component: () => import('@/views/public/ContactView.vue') },
    ],
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('@/views/admin/AdminLoginView.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/admin',
    component: () => import('@/views/admin/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'admin-dashboard', component: () => import('@/views/admin/DashboardOverview.vue') },
      { path: 'students', name: 'admin-students', component: () => import('@/views/admin/StudentsManagement.vue') },
      { path: 'teachers', name: 'admin-teachers', component: () => import('@/views/admin/TeachersManagement.vue') },
      { path: 'news', name: 'admin-news', component: () => import('@/views/admin/NewsManagement.vue') },
      { path: 'gallery', name: 'admin-gallery', component: () => import('@/views/admin/GalleryManagement.vue') },
      { path: 'profile', name: 'admin-profile', component: () => import('@/views/admin/ProfileManagement.vue') },
      { path: 'data', name: 'admin-data', component: () => import('@/views/admin/DataManagement.vue') },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'admin-login', query: { redirect: to.fullPath } })
  } else if (to.meta.guestOnly && auth.isAuthenticated) {
    next({ name: 'admin-dashboard' })
  } else {
    next()
  }
})

export default router
