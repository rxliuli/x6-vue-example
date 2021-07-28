<template>
  <div class="root">
    <header>
      <button @click="onFormat">格式化</button>
    </header>
    <div ref="container" class="container" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Edge, Graph, Node } from '@antv/x6'
import {
  createGraph,
  formatGraph,
  registerDashedEdge,
  registerSolidEdge,
} from '../util/GraphUtil'

//region 自定义边

registerSolidEdge()
registerDashedEdge()

//endregion

//region 数据

const data = {
  nodes: [
    {
      id: 'node1',
      shape: 'rect',
      x: 100,
      y: 100,
      width: 80,
      height: 40,
      label: 'hello',
    },
    {
      id: 'node2',
      shape: 'ellipse',
      x: 240,
      y: 300,
      width: 80,
      height: 40,
      label: 'world',
    },
    {
      id: 'node3',
      shape: 'ellipse',
      x: 240,
      y: 150,
      width: 80,
      height: 40,
      label: 'world',
    },
  ] as Node.Metadata[],
  edges: [
    {
      shape: 'SolidEdge',
      source: 'node1',
      target: 'node2',
    },
    {
      shape: 'DashedEdge',
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

/**
 * 显示右键菜单
 */
export default defineComponent({
  name: 'CustomLayoutPage',
  setup() {
    const container = ref<HTMLDivElement>()
    let graph: Graph

    onMounted(() => {
      graph = createGraph({
        container: container.value!,
      })
      graph.fromJSON(data)
      formatGraph(graph)
    })

    function onFormat() {
      formatGraph(graph)
    }
    return { container, onFormat }
  },
})
</script>

<style scoped>
.root,
.container {
  width: 100%;
  height: 100%;
}
.root {
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
