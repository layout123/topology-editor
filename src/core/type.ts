import { Graph, Markup } from '@antv/x6';
import App from './app';
import { Edge } from './base/Edge';
import { Node } from './base/Node';
import { Project } from './base/project';
import Editor from './editor/editor';

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

export interface RendererEventArgs {
  GRAPH_CREATED: {
    graph: Graph;
    options: Graph.Options;
  };
  GRAPH_MOUNTED: {
    domElement: HTMLDivElement;
  };
  GRAPH_RESIZE: any;
  GRAPH_CHANGE: {};
}

export interface EditorEventArgs {
  ELEMENT_SELECTED: any;
  NODE_CHANGED: {
    node: NodeMetaData;
  };
  EDGE_CHANGED: {
    edge: Edge;
  };
}

export interface AppContextEventArgs extends ProjectEventArgs, EditorEventArgs, RendererEventArgs {
  GRAPH_CREATED: {
    graph: Graph;
    options: Graph.Options;
  };
  GRAPH_MOUNTED: {
    domElement: HTMLDivElement;
  };
}

export namespace Cmd {
  export interface Options {
    [key: string]: any;
  }

  export interface Undo extends Options {}

  export interface Redo extends Options {}

  export interface CanUndo extends Options {}

  export interface CanRedo extends Options {}
}

export enum CmdConst {
  Undo = 'undo',
  Redo = 'redo',
  CanUndo = 'canUndo',
  CanRedo = 'canRedo',
}

export enum ExportConst {
  JPEG = 'jpeg',
  PNG = 'png',
}

export interface Command {
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

export interface Context {
  app: App;
  editor: Editor;
  selectedElement: any;
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

export interface AppConfig {
  grid?: Graph.GridManager.Options;
  node: Node[];
  edge: Edge[];
}

export interface PortConfig {
  id: string;
  portName: string;
  portCode: string,
  descr: string,
  position: {
    x: number;
    y: number;
  };
}

export interface NodeMetaData {
  id: string;
  name?: string;
  width: number;
  height: number;
  x: number;
  y: number;
  zIndex?: number;
  attrs?: Record<string, any>;
  ports?: PortConfig[];
}

export interface UnitConfig extends NodeMetaData {
  props?: Record<string, any>;
}

export interface ProjectData {
  nodes: Node[];
  edges: Edge[];
  graph?: Graph.Options;
}
