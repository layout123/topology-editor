import { Cell, Graph } from '@antv/x6';

import { Edge } from './base/Edge';
import { Node } from './base/Node';
import { Project } from './base/project';

export interface ProjectEventArgs {
  PROJECT_RESET: {
    project: Project;
  };
  PROJECT_ADD_NODE: {
    project: Project;
    node: Node;
  };
  PROJECT_ADD_EDGE: {
    project: Project;
    edge: Edge;
  };
  PROJECT_REMOVE_NODE: {
    project: Project;
    node: Node;
  };
  PROJECT_REMOVE_EDGE: {
    project: Project;
    edge: Edge;
  };
  PROJECT_UPDATE_NODE: {
    project: Project;
    node: Node;
  };
  PROJECT_UPDATE_EDGE: {
    project: Project;
    edge: Edge;
  };
}

export type Id = string | number;

export const enum BaseShape {
  Rect = 'rect',
  Circle = 'circle',
  Ellipse = 'ellipse',
  Polygon = 'polygon',
  Polyline = 'polyline',
  Path = 'path',
  Image = 'image',
  HTML = 'HTML',
  Group = 'group',
}

export const enum CustomShape {
  CustomNode = 'customNode',
}

export interface AppContextEventArgs extends ProjectEventArgs {
  GRAPH_CREATED: {
    graph: Graph;
  };
  GRAPH_MOUNTED: {
    domElement: HTMLDivElement;
  };
}

export interface AppConfig {
  grid?: Graph.GridManager.Options;
  node: Node[];
  edge: Edge[];
}

export interface NodeConfig {
  size: {
    width: number;
    height: number;
  };
  position: {
    x: number;
    y: number;
  };
}

export interface NodeMetaData {
  id: Id;
  name?: string;
  width: number;
  height: number;
  x?: string;
  y?: string;
  zIndex?: number;
}

export interface NodePortConfig {
  id: Id;
  position: {
    x: number;
    y: number;
  };
}

export interface UnitConfig extends Cell {
  name: string;
  shape:
    | BaseShape.Circle
    | BaseShape.Rect
    | BaseShape.Ellipse
    | BaseShape.Polygon
    | BaseShape.Polyline
    | BaseShape.Path
    | BaseShape.Image
    | BaseShape.HTML
    | CustomShape.CustomNode;
  props: Record<string, any>;
}
