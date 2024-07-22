import { UnitConfig, Id } from '../type';

import { CustomNode } from './CustomNode';
import { CustomPort } from './CustomPort';
import { Project } from './project';
import { Unit } from './Unit';
export class Node extends Unit {
  public readonly id: string;
  public readonly customNode: CustomNode;
  public ports: CustomPort[];
  public width: number;
  public height: number;
  constructor(project: Project, config: UnitConfig) {
    super(config);
    console.log('config',config)
    this.id = config.id;
    this.width = config.width;
    this.height = config.height;
    this.customNode = new CustomNode(this, config);
    this.ports = config.ports?.map((port) => new CustomPort(port)) || [];
  }

  public hasPort() {}
  public getPort(id:Id) {}
  public addPort(port: CustomPort) {}
  public removePort(port: CustomPort) {}
}
