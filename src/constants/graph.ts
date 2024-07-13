import { Graph } from '@antv/x6';
export const defaultGraphOptions = (): Graph.Options => ({
    autoResize: true,
    scaling: {
      min: 0.01,
      max: 8,
    },
    mousewheel: {
      enabled: true,
      modifiers: ['ctrl'],
    },
    panning: {
      enabled: true,
      modifiers: ['ctrl'],
      eventTypes: ['leftMouseDown'],
    },
    background: {
      color: '#fff',
    },
    grid: {
      visible: true,
      type: 'fixedDot',
      args: {
        color: '#a0a0a0', // 网格线/点颜色
        thickness: 1, // 网格线宽度/网点大小
      },
    },
    highlighting: {
      magnetAdsorbed: {
        name: 'stroke',
        args: {
          attrs: {
            fill: '#fff',
            stroke: '#31d0c6',
            strokeWidth: 4,
          },
        },
      },
      embedding: {
        name: 'stroke',
        args: {
          padding: -1,
          attrs: {
            stroke: '#73d13d',
          },
        },
      },
    },
  });