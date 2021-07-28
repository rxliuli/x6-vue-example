<template>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  height: 100%;
}
</style>
