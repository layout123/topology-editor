import { EventBus } from '@/utils/event';

import { Renderer } from './renderer/renderer';
import { AppContextEventArgs } from './type';

export class App extends EventBus<AppContextEventArgs> {
  public renderer: Renderer;
  public domElement: HTMLDivElement;
  constructor() {
    super();
    this.domElement = document.createElement('div');
    this.domElement.setAttribute('style', 'width: 100%; height: 100%; position: relative; overflow: hidden;');
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
}

export default App;
