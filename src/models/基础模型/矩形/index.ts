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
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 6,
              magnet: true,
              stroke: '#31d0c6',
              strokeWidth: 2,
              fill: '#fff',
              visibility: 'hidden',
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 6,
              magnet: true,
              stroke: '#31d0c6',
              strokeWidth: 2,
              fill: '#fff',
              visibility: 'hidden',
            },
          },
        },
      },
      items: [
        { id: 'top', group: 'top' },
        { id: 'bottom', group: 'bottom' },
      ],
    },
  }
};
