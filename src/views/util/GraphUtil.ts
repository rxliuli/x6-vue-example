import { Edge, Graph, Node, Point } from '@antv/x6'
import { SelectionManager } from '@antv/x6/src/graph/selection'
import { DagreLayout, DagreLayoutOptions, Model } from '@antv/layout'
import { arrayToMap } from '@liuli-util/array'
import { treeEach } from '@liuli-util/tree'
import { Random } from 'mockjs'
import { Options as GraphOptions } from '@antv/x6/src/graph/options'
import { SetRequired } from 'type-fest'
import { ScrollerManager } from '@antv/x6/src/graph/scroller'

export interface Enclosure {
  id: string
  name: string
  children?: Enclosure[]
}

/**
 * 定义实线
 */
export function registerSolidEdge() {
  Graph.registerEdge(
    'SolidEdge',
    {
      zIndex: -1,
      attrs: {
        line: {
          stroke: '#585858',
          strokeWidth: 2,
          targetMarker: null,
        },
      },
      router: {
        name: 'orth',
      },
    },
    true,
  )
}

/**
 * 定义虚线
 */
export function registerDashedEdge() {
  Graph.registerEdge(
    'DashedEdge',
    {
      zIndex: -1,
      attrs: {
        line: {
          stroke: '#585858',
          strokeWidth: 2,
          targetMarker: null,
          strokeDasharray: '5,5',
          d: 'M5 20 l215 0',
        },
      },
      router: {
        name: 'orth',
      },
    },
    true,
  )
}

/**
 * 创建 graph
 * @param options
 */
export function createGraph(
  options: SetRequired<Partial<GraphOptions.Manual>, 'container'>,
) {
  return new Graph({
    container: options.container,
    width: options.container.offsetWidth,
    height: options.container.offsetHeight,
    scroller: {
      enabled: true,
      pannable: true,
      pageVisible: true,
      pageBreak: false,
      modifiers: ['ctrl', 'meta'],
    } as ScrollerManager.Options,
    mousewheel: {
      enabled: true,
      modifiers: ['ctrl', 'meta'],
    },
    interacting: {
      nodeMovable: false,
    },
    //设置选中效果，禁止多选
    selecting: {
      enabled: true,
      multiple: false,
      // rubberband: true,
      movable: true,
      showNodeSelectionBox: true,
    } as SelectionManager.Options as any,
    ...(options as any),
  })
}

export function addRect(
  graph: Graph,
  {
    parent,
    ...data
  }: Pick<Node.Metadata, 'id'> & { label: string; parent: string },
) {
  const node = graph.addNode(createRect(data))
  graph.getCellById(parent).addChild(node)
  graph.addEdge({
    source: parent,
    target: data.id,
  })
}

export function moveNode(
  graph: Graph,
  node: Node<Node.Properties>,
  newParent: Node<Node.Properties>,
) {
  console.log('moveNode remove before: ', node.children)
  node.removeFromParent({ deep: false })
  console.log('moveNode remove after: ', node.children)
  newParent.addChild(node)
  graph.addEdge({
    shape: 'SolidEdge',
    id: Random.guid(),
    source: newParent.id,
    target: node.id,
  })
}

export function createRect(
  data: Pick<Node.Metadata, 'id'> & {
    label: string
    parent?: string
    children?: string[]
  },
) {
  return {
    shape: 'rect',
    x: 100,
    y: 100,
    width: 80,
    height: 40,
    ...data,
  } as Node.Metadata
}

export function convertToLayout(data: {
  nodes: Node<Node.Properties>[]
  edges: Edge<Edge.Properties>[]
}) {
  return {
    nodes: data.nodes.map((item) => {
      const position = item.getPosition()
      return {
        id: item.id,
        x: position.x,
        y: position.y,
      } as Node.Metadata
    }),
    edges: data.edges.map((item) => {
      return {
        id: item.id,
        source: item.getSourceNode()!.id,
        target: item.getTargetNode()!.id,
      } as Edge.Metadata
    }),
  }
}
const dagreLayout = new DagreLayout({
  type: 'dagre',
  rankdir: 'LR', // 可选，默认为图的中心
  align: 'DL', // 可选
  nodesep: 20, // 可选
  ranksep: 50, // 可选
  controlPoints: true, // 可选
})
/**
 * 格式化边
 * @param edge
 * @param dir
 */
export function formatEdge(
  edge: Edge<Edge.Properties>,
  dir: DagreLayoutOptions['rankdir'],
) {
  const source = edge.getSourceNode()!
  const target = edge.getTargetNode()!
  const sourceBBox = source.getBBox()
  const targetBBox = target.getBBox()
  if ((dir === 'LR' || dir === 'RL') && sourceBBox.y !== targetBBox.y) {
    const gap =
      dir === 'LR'
        ? targetBBox.x - sourceBBox.x - sourceBBox.width
        : -sourceBBox.x + targetBBox.x + targetBBox.width
    const fix = dir === 'LR' ? sourceBBox.width : 0
    const x = sourceBBox.x + fix + gap / 2
    edge.setVertices([
      { x, y: sourceBBox.center.y },
      { x, y: targetBBox.center.y },
    ])
  } else if ((dir === 'TB' || dir === 'BT') && sourceBBox.x !== targetBBox.x) {
    const gap =
      dir === 'TB'
        ? targetBBox.y - sourceBBox.y - sourceBBox.height
        : -sourceBBox.y + targetBBox.y + targetBBox.height
    const fix = dir === 'TB' ? sourceBBox.height : 0
    const y = sourceBBox.y + fix + gap / 2
    edge.setVertices([
      { x: sourceBBox.center.x, y },
      { x: targetBBox.center.x, y },
    ])
  } else {
    edge.setVertices([])
  }
}
/**
 * 格式化图像
 * @param graph
 * @param dir
 */
export function formatGraph(
  graph: Graph,
  dir: DagreLayoutOptions['rankdir'] = 'LR',
) {
  const oldData = {
    nodes: graph.getNodes(),
    edges: graph.getEdges(),
  }
  dagreLayout.rankdir = dir
  const newData = dagreLayout.layout(convertToLayout(oldData) as Model) as {
    nodes: Node.Metadata[]
    edges: Edge.Metadata[]
  }
  const newNodeMap = arrayToMap(newData.nodes!, (item) => item.id) as Map<
    string,
    { id: string; x: number; y: number }
  >
  const newEdgeMap = arrayToMap(newData.edges!, (item) => item.id) as Map<
    string,
    { id: string; controlPoints: Point[] }
  >
  graph.freeze()
  oldData.nodes.forEach((node) => {
    const newNode = newNodeMap.get(node.id)!
    if (newNode) {
      node.setPosition(newNode)
    }
  })
  oldData.edges.forEach((edge) => {
    const newEdge = newEdgeMap.get(edge.id)!
    if (newEdge) {
      formatEdge(edge, dir)
    }
  })
  graph.unfreeze()
}

/**
 * 获取当前选中的节点
 * @param graph
 */
export function getSelectNodes(graph: Graph): Node<Node.Properties>[] {
  const cells = graph.getSelectedCells()
  if (cells.length === 1 && cells.some((cell) => !cell.isNode())) {
    return []
  }
  return cells as Node<Node.Properties>[]
}

/**
 * 递归删除节点
 * TODO 有 bug
 * @param graph
 * @param ids
 */
export function deepRemoveById(graph: Graph, ids: string[]) {
  graph.removeCells(ids, { deep: true })
}

/**
 * 转换树的数据为 graph 所需要的
 * @param tree
 */
export function convertTreeToGraphJSON(tree: Enclosure[]): {
  nodes: Node.Metadata[]
  edges: Edge.Metadata[]
} {
  const nodes: Node.Metadata[] = []
  const edges: Edge.Metadata[] = []
  treeEach(
    tree,
    (item, path) => {
      nodes.push(
        createRect({
          id: item.id,
          label: item.name,
          parent: path[path.length - 2],
          children: item.children?.map((sub) => sub.id),
        }),
      )
      if (path.length < 2) {
        return
      }
      const parent = path[path.length - 2]
      edges.push({
        shape: 'SolidEdge',
        id: Random.guid(),
        source: parent,
        target: item.id,
      })
    },
    {
      id: 'id',
      children: 'children',
    },
  )
  return { nodes, edges }
}
