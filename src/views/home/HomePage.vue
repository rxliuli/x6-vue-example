<template>
  <ul>
    <li v-for="route of list" :key="route.path">
      <RouterLink :to="route.path">{{ route.path }}</RouterLink>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { routeList } from '../../constants/routeList'

export default defineComponent({
  name: 'HomePage',
  setup() {
    const list = computed(() => routeList.filter((route) => route.path !== '/'))
    return { list }
  },
})
</script>

<style scoped></style>
