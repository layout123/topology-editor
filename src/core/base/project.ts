import { EventBus } from '@/utils/event';

import { ProjectEventArgs, ProjectData } from '../type';

import { Edge } from './Edge';
import { Node } from './Node';
export class Project extends EventBus<ProjectEventArgs> {
  public projectData: ProjectData;
  public nodes: Node[] = [];
  public edges: Edge[] = [];

  constructor(projectData:ProjectData) {
    super();
    this.projectData = projectData;
    this.nodes = projectData.nodes ?? [];
    this.edges = projectData.edges ?? [];
    this.initProject();

    this.on('PROJECT_ADD_NODE',()=>{
      console.log('xxxxxxx')
    })
  }
  public addNode(node: any) {
    this.nodes.push(node);
    // new Node(this, node)
    this.emit('PROJECT_ADD_NODE', {
      project: this,
      node,
    });
    console.log('this.nodes',this.nodes)
  }
  public addEdge(edge: any) {
    this.edges.push(edge);
    // new Edge(this, edge);
    this.emit('PROJECT_ADD_EDGE', {
      project: this,
      edge,
    });
  }

  public initProject() {
    this.projectData.nodes?.forEach((node) => {
      this.addNode(node);
    });

    this.projectData.edges?.forEach((edge) => {
      this.addEdge(edge);
    });

  }
}
