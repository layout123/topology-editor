import { UnitConfig, Id } from '../type';

import { CustomNode } from './CustomNode';
import { CustomPort } from './CustomPort';
import { Project } from './project';
import { Unit } from './Unit';
export class Node extends Unit {
  public readonly node: CustomNode;
  public port: CustomPort[];
  constructor(project: Project, config: UnitConfig) {
    super(project, config);
    this.node = new CustomNode(this);
    this.port = [new CustomPort()];
  }

  public hasPort() {}
  public getPort(id:Id) {}
  public addPort(port: CustomPort) {}
  public removePort(port: CustomPort) {}
}
