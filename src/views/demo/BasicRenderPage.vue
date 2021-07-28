<template>
  <div ref="container" />
</template>

<script lang="ts">
import { Graph } from '@antv/x6'
import { defineComponent, onMounted, ref, watch } from 'vue'

const data = {
  // 节点
  nodes: [
    {
      id: 'node1',
      x: 40,
      y: 40,
      width: 80,
      height: 40,
      label: 'Hello',
    },
    {
      id: 'node2',
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: 'World',
    },
  ],
  // 边
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
}

export default defineComponent({
  name: 'BasicRenderPage',
  setup() {
    const container = ref<HTMLDivElement>()
    onMounted(() => {
      const graph = new Graph({
        container: container.value,
        width: 800,
        height: 600,
      })
      graph.fromJSON(data)
    })

    return {
      container,
    }
  },
})
</script>

<style scoped></style>
