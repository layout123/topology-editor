import { EventBus } from '@/utils/event';

import { Renderer } from './renderer/renderer';
import { AppConfig, AppContextEventArgs } from './type';

class App extends EventBus<AppContextEventArgs> {
  public renderer: Renderer;
  public config: AppConfig;
  constructor(config: AppConfig, container: HTMLDivElement) {
    super();
    this.config = config;
    this.renderer = new Renderer(this, container);
  }
}

export default App;
