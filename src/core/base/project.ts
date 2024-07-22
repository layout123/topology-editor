import { EventBus } from '@/utils/event';

import { ProjectEventArgs, ProjectData, Id, UnitConfig, NodeMetaData } from '../type';

import { Edge } from './Edge';
import { Node } from './Node';
export class Project extends EventBus<ProjectEventArgs> {
  public projectData: ProjectData;
  public nodes: Node[] = [];
  public edges: Edge[] = [];
  public elementMap = new Map<Id, Node | Edge>();

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
      node:curNode,
    });
  }
  public addEdge(edge: any) {
    this.edges.push(edge);
    const curEdge = new Edge(this, edge);
    this.elementMap.set(curEdge.id, curEdge as any);
    this.emit('PROJECT_ADD_EDGE', {
      project: this,
      edge,
    });
  }

  public updateNode(node: NodeMetaData) {
   const curNode = this.elementMap.get(node.id)
   if(curNode) {
    this.elementMap.set(node.id, curNode)
    console.log('updateNode',curNode);
   }
  }
   
  public deleteNode(nodeId: string) {
    this.nodes = this.nodes.filter((item) => item.id !== nodeId);
    this.elementMap.delete(nodeId);
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
