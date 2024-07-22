import { PortGroupMetadata } from '../type';
export class CustomPort  {
    public id : string;
    position: PortGroupMetadata['position'];
  constructor(port:PortGroupMetadata) {
    const {id, position} = port;
    this.id = id;
    this.position = position;
  }

}
