import { BaseShape } from '@/core/type';

export const node = {
  group: '基础模型',
  node:  {
    name: '矩形',
    shape: BaseShape.Rect,
    width: 100,
    height: 40,
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
    ports: {
      groups: {
        group1: {
          position: {
            name: 'absolute',
            args: { x: 0, y: 0 },
          },
        },
      },
      items: [
        {
          group: 'group1',
          args: {
            x: '60%',
            y: 32,
            angle: 45,
          },
        },
      ],
    },
  }
};
