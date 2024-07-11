import { Graph } from '@antv/x6';

import AppContext from '../app';
export class Renderer {
  public graph?: Graph;
  public appContext: AppContext;
  constructor(context: AppContext, dom: HTMLDivElement) {
    this.appContext = context;
    this.createGraph(dom);
  }
  public createGraph(dom: HTMLDivElement) {
    const domElement = document.createElement('div');
    domElement.setAttribute('style', 'width: 100%; height: 100%; position: relative; overflow: hidden;');
    dom.appendChild(domElement);

    this.graph = new Graph({
      container: domElement,
      autoResize: true,
      grid: {
        size: 10,
        visible: true,
      },
    });
    this.appContext.emit('GRAPH_CREATED', { graph: this.graph });
  }
}
