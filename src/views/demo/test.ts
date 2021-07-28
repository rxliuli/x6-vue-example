const oldData = {
  nodes: [
    {
      position: {},
      size: { width: 80, height: 40 },
      attrs: { text: { text: 'hello' } },
      shape: 'rect',
      id: 'node1',
      zIndex: 1,
    },
    {
      position: {},
      size: { width: 80, height: 40 },
      attrs: { text: { text: 'world' } },
      shape: 'ellipse',
      id: 'node2',
      zIndex: 1,
    },
    {
      position: {},
      size: { width: 80, height: 40 },
      attrs: { text: { text: 'world' } },
      shape: 'ellipse',
      id: 'node3',
      zIndex: 1,
    },
  ],
  edges: [
    {
      shape: 'SolidEdge',
      zIndex: -1,
      id: '816963f8-06c1-4125-ad96-1f1f36c2b4b3',
      source: { cell: 'node1' },
      target: { cell: 'node2' },
      vertices: [{ x: 165, y: 40 }],
    },
    {
      shape: 'DashedEdge',
      zIndex: -1,
      id: 'c9eac2e7-3f95-4326-abce-2cca34babb06',
      source: { cell: 'node1' },
      target: { cell: 'node3' },
      vertices: [{ x: 165, y: 140 }],
    },
  ],
}

const newData = {
  nodes: [
    { id: 'node1', x: 70, y: 40 },
    { id: 'node2', x: 260, y: 40 },
    { id: 'node3', x: 260, y: 140 },
  ],
  edges: [
    {
      id: '816963f8-06c1-4125-ad96-1f1f36c2b4b3',
      source: 'node1',
      target: 'node2',
      controlPoints: [{ x: 165, y: 40 }],
    },
    {
      id: 'c9eac2e7-3f95-4326-abce-2cca34babb06',
      source: 'node1',
      target: 'node3',
      controlPoints: [{ x: 165, y: 140 }],
    },
  ],
}
