import { Id, UnitConfig } from '../type';

import { Project } from './project';
export class Unit {
  public id: Id;
  public name: string;
  public shape: string;
  public zIndex?: number;
  public project: Project;
  constructor(project: Project, config: UnitConfig) {
    this.project = project;
    this.id = config.id;
    this.name = config.name;
    this.shape = config.shape;
    this.zIndex = config.zIndex as number;
  }
}
