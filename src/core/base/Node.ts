import { CustomNode } from './CustomNode';
import { Unit } from './Unit';
export class Node extends Unit {
  public readonly node: CustomNode;
  constructor() {
    super();
    this.node = new CustomNode(this);
  }
}
