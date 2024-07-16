import { EventBus } from '@/utils/event';

import { Renderer } from './renderer/renderer';
import { Editor } from './editor/editor';
import { Project } from './base/project';
import { AppContextEventArgs, Cmd, CmdConst, ExportConst, ProjectData } from './type';

export class App extends EventBus<AppContextEventArgs> {
  public renderer: Renderer;
  public editor: Editor;
  public domElement: HTMLDivElement;
  public project: Project;
  constructor() {
    super();
    this.domElement = document.createElement('div');
    this.domElement.setAttribute('style', 'width: 100%; height: 100%; position: relative; overflow: hidden;');
    this.editor = new Editor(this);
    this.renderer = new Renderer(this);
    this.project = new Project({
      edges: [],
      nodes: [],
    });

    const resizeObserver = new ResizeObserver(([domElement]) => {
      this.renderer.emit('graph:resize', {
        ...domElement.contentRect,
      });
    });
    resizeObserver.observe(this.domElement);

    this.project.on('PROJECT_ADD_NODE', ({node})=>{
      console.log('xxxx');
      this.renderer.addNode(node)
    })

    this.project.on('PROJECT_ADD_EDGE',({edge})=>{
      this.renderer.addEdge(edge)
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
    this.project = new Project(projectData);
  }

  public addNode(node: any) {
    this.project.addNode(node);
  }

  public addEdge(edge: any) {
    this.project.addEdge(edge);
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
