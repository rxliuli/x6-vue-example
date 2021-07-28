<template>
  <div ref="container" class="container" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Addon, Edge, Graph, Node } from '@antv/x6'
import { createGraph, formatGraph } from '../util/GraphUtil'

//region 数据

const data = {
  nodes: [
    {
      id: 'node1',
      label: 'hello',
      shape: 'rect',
      x: 100,
      y: 100,
      width: 80,
      height: 40,
    },
    {
      id: 'node2',
      label: 'world',
      parent: 'node1',
      shape: 'ellipse',
      x: 240,
      y: 300,
      width: 80,
      height: 40,
    },
    {
      id: 'node3',
      label: 'world',
      parent: 'node1',
      shape: 'ellipse',
      x: 240,
      y: 150,
      width: 80,
      height: 40,
    },
  ] as Node.Metadata[],
  edges: [
    {
      shape: 'SolidEdge',
      source: 'node1',
      target: 'node2',
    },
    {
      shape: 'SolidEdge',
      source: 'node1',
      target: 'node3',
      vertices: [
        {
          x: 250,
          y: 140,
        },
      ],
    },
  ] as Edge.Metadata[],
}

//endregion

export default defineComponent({
  name: 'PanAndZoomPage',
  setup(props) {
    const container = ref<HTMLDivElement>()
    let graph: Graph

    onMounted(() => {
      graph = createGraph({
        container: container.value!,
      })
      const dnd = new Addon.Dnd({
        target: graph,
      })
      Reflect.set(window, 'graph', graph)
      graph.fromJSON(data)
      formatGraph(graph)
    })
    return { container }
  },
})
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
