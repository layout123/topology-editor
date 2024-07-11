import { Graph } from '@antv/x6';

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
