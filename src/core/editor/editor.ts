import { Graph } from '@antv/x6';
import { Export } from '@antv/x6-plugin-export';
import { Selection } from '@antv/x6-plugin-selection';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Transform } from '@antv/x6-plugin-transform';
import { EventBus } from '@/utils/event';
import AppContext from '../app';
export class Editor extends EventBus {
  public graph?: Graph;
  public appContext: AppContext;
  constructor(context: AppContext,graph?: Graph ) {
    super();
    this.appContext = context;
    this.graph = graph;
    context.on('GRAPH_CREATED',this.initGraphPlugin)
  }

  public initGraphPlugin({graph}: {graph: Graph}) {
    this.graph = graph;
    
    this.graph?.use(new Export());

    this.graph?.use(new Selection({
        movable: false,
        strict: true,
        rubberband: true,
        rubberNode: true,
        showNodeSelectionBox: true,
        showEdgeSelectionBox: true,
        pointerEvents: 'none',
    }));
    this.graph?.use(new Snapline({
      enabled: true,
      sharp: true,
      resizing: true,
    }));

    this.graph?.use(new Transform({
      resizing: {
        enabled: true,
        minWidth: 20,
        minHeight: 20,
        preserveAspectRatio: false,
      },
      rotating: {
        enabled: true,
        grid: 15,
      },
    }));
  }
}

export default Editor;
