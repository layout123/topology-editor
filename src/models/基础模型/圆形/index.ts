import { BaseShape } from '@/core/type';

export const node = {
  group: '基础模型',
  node:  {
    name: '圆形',
    shape: BaseShape.Circle,
    width: 100,
    height: 100,
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
  }
};
