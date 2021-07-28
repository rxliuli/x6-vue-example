<template>
  <div ref="container" class="container" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Edge, Graph, Node } from '@antv/x6'
import { registerDashedEdge, registerSolidEdge } from '../util/GraphUtil'

//region 自定义边

registerSolidEdge()
registerDashedEdge()

//endregion

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

export default defineComponent({
  name: 'CustomEdgePage',
  setup() {
    const container = ref<HTMLDivElement>()
    let graph: Graph

    onMounted(() => {
      const el = container.value!
      graph = new Graph({
        container: el,
        width: el.offsetWidth,
        height: el.offsetHeight,
        //设置选中效果，禁止多选
        selecting: {
          enabled: true,
          multiple: false,
          rubberband: true,
          movable: true,
          showNodeSelectionBox: true,
        },
      })
      graph.fromJSON(data)
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
