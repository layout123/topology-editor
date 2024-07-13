import { EventBus } from '@/utils/event';

import { Renderer } from './renderer/renderer';
import { Editor } from './editor/editor';
import { AppContextEventArgs } from './type';

export class App extends EventBus<AppContextEventArgs> {
  public renderer: Renderer;
  public editor: Editor;
  public domElement: HTMLDivElement;
  constructor() {
    super();
    this.domElement = document.createElement('div');
    this.domElement.setAttribute('style', 'width: 100%; height: 100%; position: relative; overflow: hidden;');
    this.editor = new Editor(this);
    this.renderer = new Renderer(this);

    const resizeObserver = new ResizeObserver(([domElement]) => {
      this.renderer.emit('graph:resize', {
        ...domElement.contentRect,
      });
    });
    resizeObserver.observe(this.domElement);
  }

  public mounted(container: HTMLDivElement) {
    container.appendChild(this.domElement);
  }

  public async export (fileName: string, type: 'jpeg' | 'png' | 'svg', padding: number = 20, backgroundColor: string = '#fff') {
    switch (type) {
      case 'jpeg':
        await this.renderer.exportJPEG(fileName, padding, backgroundColor);
        break;
      case 'png':
        await this.renderer.exportPNG(fileName, padding, backgroundColor);
    }
  }
}

export default App;
