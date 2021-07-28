import { DagreLayout } from '@antv/layout'

const model = {
  nodes: [
    {
      id: 'node1',
      x: 0,
      y: 0,
    },
    {
      id: 'node2',
      x: 20,
      y: 20,
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
}

const dagreLayout = new DagreLayout({
  type: 'dagre',
  rankdir: 'LR',
  align: 'UL',
  ranksep: 30,
  nodesep: 15,
  controlPoints: true,
})

const newModel = dagreLayout.layout(model)
console.log(newModel)
