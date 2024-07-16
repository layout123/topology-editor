import { CustomEdge } from './CustomEdge';
import { UnitConfig, Id } from '../type';
import { Unit } from './Unit';
import { Project } from './project';
export class Edge extends Unit {
  public readonly edge: CustomEdge;
  constructor(project: Project, config: UnitConfig) {
    super(config);
    this.edge = new CustomEdge(this);
  }
}
