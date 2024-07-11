import { CustomEdge } from './CustomEdge';
import { Unit } from './Unit';
export class Edge extends Unit {
  public readonly edge: CustomEdge;
  constructor() {
    super();
    this.edge = new CustomEdge(this);
  }
}
