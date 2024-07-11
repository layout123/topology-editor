import { EventBus } from '@/utils/event';

import { Renderer } from './renderer/renderer';
import { AppContextEventArgs } from './type';

class App extends EventBus<AppContextEventArgs> {
  public renderer: Renderer;
  public config: any;
  constructor(config: any, dom: HTMLDivElement) {
    super();
    this.renderer = new Renderer(this, dom);
  }
}

export default App;
