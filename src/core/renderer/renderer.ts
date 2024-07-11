import { Graph } from '@antv/x6';

import AppContext from '../app';

const defaultGrid = {
  visible: true,
  type: 'mesh',
  args: {
    color: '#ddd', // 网格线颜色
    thickness: 1, // 网格线宽度
  },
};

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
    const gridOption = this.appContext.config.grid ?? defaultGrid;
    this.graph = new Graph({
      container: domElement,
      autoResize: true,
      grid: gridOption,
    });
    this.appContext.emit('GRAPH_CREATED', { graph: this.graph });
  }

  public disableMousewheel(is: boolean) {
    is ? this.graph?.disableMouseWheel() : this.graph?.enableMouseWheel();
  }

  //绘制画布
  public drawBackground(options: Graph.BackgroundManager.Options) {
    this.graph?.drawBackground(options);
  }
  //更新画布
  public updateBackground(options: Graph.BackgroundManager.Options) {
    this.drawBackground(options);
    this.graph?.updateBackground();
  }

  public drawGrid(options: Graph.GridManager.Options) {
    this.graph?.drawGrid(options);
  }

  //获取缩放比例
  public getZoom() {
    return this.graph?.zoom();
  }

  //设置缩放比例
  public setZoom(factor: number) {
    this.graph?.zoomTo(factor);
  }

  //缩放至比例
  public zoomToFit() {
    this.graph?.zoomToFit();
  }
}
