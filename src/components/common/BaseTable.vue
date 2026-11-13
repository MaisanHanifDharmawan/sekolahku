<script setup>
import EmptyState from './EmptyState.vue'

defineProps({
  columns: { type: Array, default: () => [] },
  items: { type: Array, default: () => [] },
  emptyText: { type: String, default: 'Tidak ada data' },
})
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-card dark:border-ink-800 dark:bg-ink-900">
    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-ink-100 bg-ink-50/80 dark:border-ink-800 dark:bg-ink-800/50">
            <th
              v-for="col in columns"
              :key="col.key"
              class="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="items.length === 0">
            <td :colspan="columns.length">
              <EmptyState :title="emptyText" />
            </td>
          </tr>
          <tr
            v-for="(item, index) in items"
            :key="item.id || index"
            class="border-b border-ink-100 last:border-0 transition-colors hover:bg-ink-50/80 dark:border-ink-800 dark:hover:bg-ink-800/40"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              class="px-4 py-3.5 text-sm text-ink-700 dark:text-ink-300"
            >
              <slot :name="col.key" :item="item" :value="item[col.key]">
                {{ item[col.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
