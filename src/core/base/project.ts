import { EventBus } from '@/utils/event';

import { ProjectEventArgs, ProjectData, Id, UnitConfig } from '../type';

import { Edge } from './Edge';
import { Node } from './Node';
export class Project extends EventBus<ProjectEventArgs> {
  public projectData: ProjectData;
  public nodes: Node[] = [];
  public edges: Edge[] = [];
  public elementMap = new Map<Id, UnitConfig>();

  constructor(projectData:ProjectData) {
    super();
    this.projectData = projectData;
    this.nodes = projectData.nodes ?? [];
    this.edges = projectData.edges ?? [];
    this.initProject(projectData);
  }
  public addNode(node: any) {
    const curNode = new Node(this, node)
    this.elementMap.set(curNode.id, curNode);
    this.nodes.push(node);
    this.emit('PROJECT_ADD_NODE', {
      project: this,
      node,
    });
  }
  public addEdge(edge: any) {
    this.edges.push(edge);
    const curEdge = new Edge(this, edge);
    this.elementMap.set(curEdge.id, curEdge);
    this.emit('PROJECT_ADD_EDGE', {
      project: this,
      edge,
    });
  }

  public initProject(projectData: ProjectData) {
    projectData.nodes?.forEach((node) => {
      this.addNode(node);
    });

    projectData.edges?.forEach((edge) => {
      this.addEdge(edge);
    });

  }

  public formatProjectData(): ProjectData {
    return {
      graph: this.projectData.graph,
      edges: this.edges,
      nodes: this.nodes,
    };
  }
}
