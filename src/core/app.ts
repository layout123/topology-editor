import { EventBus } from '@/utils/event';
import { generateId } from '@/utils/number';
import { ProjectInfo } from '@/constants/definition';

import { Renderer } from './renderer/renderer';
import { Editor } from './editor/editor';
import { Project } from './base/project';
import { AppContextEventArgs, Cmd, CmdConst, ExportConst, ProjectData, NodeMetaData } from './type';

export class App extends EventBus<AppContextEventArgs> {
  public renderer: Renderer;
  public domElement: HTMLDivElement;
  public project: Project;
  constructor() {
    super();
    this.domElement = document.createElement('div');
    this.domElement.setAttribute('style', 'width: 100%; height: 100%; position: relative; overflow: hidden;');
    this.renderer = new Renderer(this);
    this.project = new Project({
      edges: [],
      nodes: [],
    });

    const resizeObserver = new ResizeObserver(([domElement]) => {
      this.renderer.emit('GRAPH_RESIZE', {
        ...domElement.contentRect,
      });
    });
    resizeObserver.observe(this.domElement);

    this.project.on('PROJECT_ADD_NODE', ({node})=>{
      this.renderer.addNode(node.customNode)
      this.emit('GRAPH_CHANGE',node)
    })

    this.project.on('PROJECT_ADD_EDGE',({edge})=>{
      this.renderer.addEdge(edge)
      this.emit('GRAPH_CHANGE',edge)
    })
  }

  public mounted(container: HTMLDivElement) {
    container.appendChild(this.domElement);
  }

  public execute<T extends Cmd.Options>(command: string, options?: T): any {
    switch(command){
      case CmdConst.Undo:
        this.renderer.graph?.undo()
        break;
      case CmdConst.Redo:
        this.renderer.graph?.redo()
        break;
      case CmdConst.CanUndo:
        return this.renderer.graph?.canUndo()
      case CmdConst.CanRedo:
        return this.renderer.graph?.canRedo()
    }
  }

  public initProject(projectData: ProjectData) {
    this.project.initProject(projectData);
  }

  public addNode(model:any, position:{x:number, y:number}) {
    const id = ProjectInfo.prefix + generateId();
    const node = {id, ...model, position}
    this.project.addNode(node);
  }

  public addEdge(edge: any) {
    this.project.addEdge(edge);
  }

  public removeElement(element:NodeMetaData){
    console.log('removeElement',element);
    this.renderer.graph?.removeNode(element.id)
    this.project.deleteNode(element.id)
    this.emit('GRAPH_CHANGE',{})
  }

  public async export (fileName: string, type: 'jpeg' | 'png' | 'svg', padding: number = 20, backgroundColor: string = '#fff') {
    switch (type) {
      case ExportConst.JPEG:
        await this.renderer.exportJPEG(fileName, padding, backgroundColor);
        break;
      case ExportConst.PNG:
        await this.renderer.exportPNG(fileName, padding, backgroundColor);
    }
  }
}

export default App;
