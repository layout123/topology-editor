import { UnitConfig } from '../type';

import { CustomNode } from './CustomNode';
import { Project } from './project';
import { Unit } from './Unit';
export class Node extends Unit {
  public readonly node: CustomNode;
  constructor(project: Project, config: UnitConfig) {
    super(project, config);
    this.node = new CustomNode(this);
  }
}
