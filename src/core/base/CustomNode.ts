import { Node as x6Node } from '@antv/x6';

import { Node } from './Node';
import { UnitConfig } from '../type';

export class CustomNode extends x6Node {
  public metadata: x6Node.Metadata
  constructor(node: Node, config:UnitConfig) {
    super(config);
    this.metadata = config;
    console.log(config);
  }
}
