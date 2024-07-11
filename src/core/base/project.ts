import { EventBus } from '@/utils/event';

import { ProjectEventArgs } from '../type';

import { Edge } from './Edge';
import { Node } from './Node';
export class Project extends EventBus<ProjectEventArgs> {
  public nodes: Node[] = [];
  public edges: Edge[] = [];

  constructor() {
    super();
  }
  public addNode(node: Node) {
    this.nodes.push(node);
  }
  public addEdge(edge: Edge) {
    this.edges.push(edge);
  }
}
