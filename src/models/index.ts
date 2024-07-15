import { CustomNode, ElementGroup } from './types';

const modulesFiles = import.meta.glob(['./*/**/index.ts', '!./index.ts', '!./types.ts'], { eager: true });

const extractDirectoryName = (path: string): string => {
  return path.replace(/\/[^/]+$/, '');
};

const customNames: string[] = Object.keys(modulesFiles).map(extractDirectoryName);

export type CustomModule = {
  config: any;
  value: any;
  node: CustomNode;
};

export type CustomName = typeof customNames[number];

export type Customs = Record<CustomName, CustomModule>;

export const customs: Customs = Object.entries(modulesFiles).reduce(
  (customs, [key, value]) => ({ ...customs, [extractDirectoryName(key)]: value }),
  {}
);

console.log('customs', customs);

export const elementGroups: ElementGroup[] = Object.values(customs).reduce((elementGroups, { node }) => {
  const elementGroup = elementGroups.find(({ group }) => group === node.group);
  if (elementGroup) {
    elementGroup.nodes.push(node.node);
  } else {
    elementGroups.push({
      group: node.group,
      nodes: [node.node],
    });
  }
  return elementGroups;
}, [] as ElementGroup[]);
