import { Graph, Edge, Node, Rectangle, Size } from '@antv/x6';
import { EventBus } from '@/utils/event';
import AppContext from '../app';
import { defaultGraphOptions } from '@/constants/graph';
export class Renderer extends EventBus {
  public graph?: Graph;
  public options?: Graph.Options;
  public appContext: AppContext;
  constructor(context: AppContext) {
    super();

    this.appContext = context;
    this.createGraph(context);

    this.on('graph:resize', ({ width, height }) => {
      this.graph?.resize(width, height);
    });
  }
  public createGraph(context: AppContext, options?:Graph.Options) {
    this.graph?.off();
    this.graph?.dispose();

    const graphElement = document.createElement('div');
    graphElement.setAttribute('style', 'width: 100%; height: 100%; position: relative; overflow: hidden;');
    context.domElement.appendChild(graphElement);
    const metadata =  {
      container: graphElement,
      ...defaultGraphOptions(),
      ...options,
    }
     this.graph = new Graph(metadata);

     context.emit('GRAPH_CREATED',{ graph: this.graph , options: metadata })
  }

  //禁用/开启缩放
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

  //重绘画布
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

  public pageToLocal(x: number, y: number) {
    return this.graph?.graphToLocal(x, y);
  }

  public async addNode(node: Node.Metadata) {
    this.graph?.addNode(node);
  }

  public async addEdge(edge: Edge.Metadata) {
    this.graph?.addEdge(edge);
  }

  public async exportSvg(fileName: string, padding: number = 20, backgroundColor: string = '#fff'): Promise<void> {
    const contentBBox = this.graph?.getContentBBox();
    let preserveDimensions: Size | boolean = true;
    let viewBox: Rectangle.RectangleLike | undefined = undefined;
    padding = Math.max(padding, 20);
    if (contentBBox) {
      preserveDimensions = {
        width: contentBBox.width + padding,
        height: contentBBox.height + padding,
      };
      viewBox = {
        x: contentBBox.x - padding / 2,
        y: contentBBox.y - padding / 2,
        ...preserveDimensions,
      };
    }

    this.graph?.exportSVG(fileName, {
      preserveDimensions,
      viewBox,
      beforeSerialize(svg) {
        if (backgroundColor) {
          svg.setAttribute('style', `background: ${backgroundColor}`);
        }
        return svg;
      },
    });
  }

  public async exportPNG(fileName: string, padding: number = 20, backgroundColor: string = '#fff'): Promise<void> {
    this.graph?.exportPNG(fileName, {
      quality: 0.92,
      padding: Math.max(padding, 20),
      backgroundColor,
    });
  }

  public async exportJPEG(fileName?: string, padding: number = 20, backgroundColor: string = '#fff'): Promise<void> {
    this.graph?.exportJPEG(fileName, {
      quality: 0.92,
      padding: Math.max(padding, 20),
      backgroundColor,
    });
  }
}

export default Renderer;
