<template>
  <div ref="container" class="container" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Graph } from '@antv/x6'
import {
  convertTreeToGraphJSON,
  Enclosure,
  formatGraph,
  moveNode,
  registerDashedEdge,
  registerSolidEdge,
} from '../util/GraphUtil'
import { treeMap } from '@liuli-util/tree'
import { Random } from 'mockjs'

//region 自定义边

registerSolidEdge()
registerDashedEdge()

//endregion

const allData = treeMap(
  [
    {
      name: '节点 1',
      children: [
        { name: '节点 1-1' },
        {
          name: '节点 1-2',
          children: [
            { name: '节点 1-2-1' },
            { name: '节点 1-2-2' },
            { name: '节点 1-2-3' },
          ],
        },
      ],
    },
  ] as DeepPartial<Enclosure>[],
  (item) => ({
    ...item,
    id: Random.id(),
  }),
  {
    id: 'id',
    children: 'children',
  },
)

export default defineComponent({
  name: 'CustomDragPage',
  setup() {
    const container = ref<HTMLDivElement>()
    onMounted(() => {
      const graph = new Graph({
        container: container.value,
      })
      Reflect.set(window, 'graph', graph)
      graph.on('node:move', (ev) => {
        ev.node.toFront()
      })
      graph.on('node:moved', (ev) => {
        console.log('moved: ', ev.node)
        const hoverNodes = graph
          .getNodesFromPoint(ev)
          .filter((node) => node.id !== ev.node.id)
        if (hoverNodes.length !== 1) {
          return
        }
        moveNode(graph, ev.node, hoverNodes[0])
        formatGraph(graph)
      })
      graph.fromJSON(convertTreeToGraphJSON(allData))
      formatGraph(graph)
    })

    return {
      container,
    }
  },
})
</script>

<style scoped>
.container {
  height: 100%;
}
</style>
