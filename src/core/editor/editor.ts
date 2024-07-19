import { Graph } from '@antv/x6';
import { Export } from '@antv/x6-plugin-export';
import { Selection } from '@antv/x6-plugin-selection';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Transform } from '@antv/x6-plugin-transform';
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { History } from '@antv/x6-plugin-history'
import { EventBus } from '@/utils/event';
import AppContext from '../app';
import { EditorEventArgs } from '@/core/type';
export class Editor extends EventBus<EditorEventArgs> {
  public graph?: Graph;
  public appContext: AppContext;
  constructor(context: AppContext,graph?: Graph ) {
    super();
    this.appContext = context;
    this.graph = graph;
    context.on('GRAPH_CREATED',this.initGraphPlugin)
    context.on('GRAPH_CREATED',this.onGraphCreated)
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

    this.graph?.use(new Clipboard({
      enabled: true,
    }));

    this.graph?.use(new Keyboard({
      enabled: true,
      global: true,
    }));
    
    this.graph?.use(new History({
      enabled: true,
    }));
  }

  public onGraphCreated(){
    if(!this.graph) return;

    this.graph.on('node:selected', (element)=>{
      this.emit('ELEMENT_SELECTED',element)
    });

    this.graph.on('node:mouseenter', ({ e, node, view })=>{
    });

    this.graph.on('edge:mouseenter', ({ e, edge, view })=>{
    });

    this.graph.on('node:mouseleave', ({ e, node, view })=>{
    });

    this.graph.on('edge:mouseleave', ({ e, edge, view })=>{
    });

    this.graph.on('node:contextmenu', ({ e, node, view })=>{
      console.log('node',node)
    });

    this.graph.on('edge:contextmenu', ({ e, edge, view })=>{
    });

    this.graph.on('blank:contextmenu', ({ e })=>{
      console.log('e', e);
    });

    this.graph.bindKey('ctrl+c', () => {
      const cells = this.graph?.getSelectedCells()
      if (cells?.length) {
        this.graph?.copy(cells)
      }
      return false
    })

    this.graph.bindKey('ctrl+v', () => {
      if (!this.graph?.isClipboardEmpty()) {
        const cells = this.graph?.paste({ offset: 32 })!
        this.graph?.cleanSelection()
        this.graph?.select(cells)
      }
      return false
    })
  }
}

export default Editor;
