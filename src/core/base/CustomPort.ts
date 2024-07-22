import { PortConfig } from '../type';
export class CustomPort  {
    public id : string;
    position: PortConfig['position'];
  constructor(port:PortConfig) {
    const {id, position} = port;
    this.id = id;
    this.position = position;
  }

}
