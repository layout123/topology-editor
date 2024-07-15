import { BaseShape } from '@/core/type';

export const node = {
  group: '基础模型',
  node:  {
    name: '椭圆',
    shape: BaseShape.Ellipse,
    width: 100,
    height: 40,
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
