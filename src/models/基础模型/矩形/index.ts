import { BaseShape } from '@/core/type';

export const node = {
  group: '基础模型',
  node:  {
    name: '矩形',
    shape: BaseShape.Rect,
    width: 200,
    height: 100,
    image: '',
    attrs: {
      body: {
        stroke: '#5F95FF',
        strokeWidth: 1,
        fill: '#fff',
        rx: 6,
        ry: 6,
      },
      label: {
        fontSize: 12,
        fill: '#262626',
      },
    },
    ports: [
      {
        id: 'TI001',
        portName: '进线端',
        portCode: 'TI001',
        descr: '',
        position: {
          x: 0,
          y: 0.5,
        },
      },
    ]
  }
};
