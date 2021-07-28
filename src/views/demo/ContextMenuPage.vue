<template>
  <div class="root">
    <div ref="container" class="container" />
    <VContextmenu ref="contextmenu">
      <VContextmenuItem>菜单 1</VContextmenuItem>
      <VContextmenuItem>菜单 2</VContextmenuItem>
    </VContextmenu>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Edge, Graph, Node } from '@antv/x6'
import {
  createGraph,
  registerDashedEdge,
  registerSolidEdge,
} from '../util/GraphUtil'
import 'v-contextmenu/dist/themes/default.css'
import { Contextmenu, ContextmenuItem } from 'v-contextmenu'

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
  name: 'ContextMenuPage',
  components: {
    [Contextmenu.name]: Contextmenu,
    [ContextmenuItem.name]: ContextmenuItem,
  },
  setup() {
    const container = ref<HTMLDivElement>()
    let graph: Graph
    const contextMenuRef = ref<{
      show(position: { left: number; top: number }): void
      hide(): void
    }>()

    onMounted(() => {
      graph = createGraph({
        container: container.value!,
      })
      const contextMenu = contextMenuRef.value!
      graph.on('node:contextmenu', (ctx) => {
        contextMenu.show({
          left: ctx.e.clientX,
          top: ctx.e.clientY,
        })
        graph.select(ctx.cell)
      })
      const handler = () => contextMenu.hide()
      graph.on('edge:contextmenu', handler)
      graph.on('blank:contextmenu', handler)
      graph.on('blank:click', handler)
      graph.on('cell:click', handler)
      graph.fromJSON(data)
    })

    return { container, contextmenu: contextMenuRef }
  },
})
</script>

<style scoped>
.root,
.container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
