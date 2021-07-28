<template>
  <div class="root">
    <header>
      <button @click="onFormat">格式化</button>
      <button @click="onGet">获取当前选中节点</button>
      <button @click="onAdd">新增</button>
      <button @click="onAddSub">新增子节点</button>
      <button @click="onRemove">删除当前选中节点</button>
      <button @click="onFocus">选中指定节点</button>
      <button @click="onExport">导出</button>
    </header>
    <div ref="container" class="container" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Edge, Graph, Node } from '@antv/x6'
import {
  createGraph,
  createRect,
  deepRemoveById,
  formatGraph,
  getSelectNodes,
  registerDashedEdge,
  registerSolidEdge,
} from '../util/GraphUtil'
import { Random } from 'mockjs'

//region 自定义边

registerSolidEdge()
registerDashedEdge()

//endregion

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
  name: 'NodeActionPage',
  setup() {
    const container = ref<HTMLDivElement>()
    let graph: Graph

    onMounted(() => {
      graph = createGraph({
        container: container.value!,
      })
      Reflect.set(window, 'graph', graph)
      graph.fromJSON(data)
      formatGraph(graph)
    })

    function onFormat() {
      formatGraph(graph)
    }

    function onGet() {
      const nodes = getSelectNodes(graph)
      console.log('node: ', nodes)
    }
    function onAdd() {
      const id = Random.guid()
      graph.addNode(createRect({ id: id, label: Random.cname() }))
      graph.addEdge({
        source: 'node1',
        target: id,
      } as Edge.Metadata)
      formatGraph(graph)
    }
    function onAddSub() {
      const selectNodes = getSelectNodes(graph)
      if (selectNodes.length !== 1) {
        return
      }
      const id = Random.guid()
      const node = graph.addNode(
        createRect({
          id: id,
          label: Random.cname(),
        }),
      )
      // node.setParent(graph.getCellById(selectNode.id))
      const selectNode = selectNodes[0]
      selectNode.addChild(node)
      graph.addEdge({
        source: selectNode.id,
        target: id,
      } as Edge.Metadata)
      formatGraph(graph)
    }
    function onRemove() {
      const selectNodes = getSelectNodes(graph)
      deepRemoveById(
        graph,
        selectNodes.map((item) => item.id),
      )
      formatGraph(graph)
      console.log(graph.toJSON())
    }
    function onFocus() {
      graph.select('node1')
    }

    function onExport() {
      console.log('onExport: ', graph.toJSON())
    }

    return {
      container,
      onFormat,
      onGet,
      onAdd,
      onAddSub,
      onRemove,
      onFocus,
      onExport,
    }
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
