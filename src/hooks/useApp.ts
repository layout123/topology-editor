import { AppKey, CommandKey } from '@/constants/inject-keys';
import { Cmd, CmdConst } from '@/core/type';
import { App, Node, Edge, Editor } from '@/core';

export const useApp = () => {
    const app = new App();
    const editor = new Editor(app, app.renderer.graph!);
    const selectedElement = ref<Node | Edge | null>(null);

    editor.on('ELEMENT_SELECTED',(element)=>{
      selectedElement.value = element.node;
    })
    
    provide(AppKey, {
      app,
      editor,
      selectedElement
    });

    provide(CommandKey, {
      undo:() => app.execute<Cmd.Undo>(CmdConst.Undo),
      redo:() => app.execute<Cmd.Redo>(CmdConst.Redo),
      canUndo:() => app.execute<Cmd.CanUndo>(CmdConst.CanUndo),
      canRedo:() => app.execute<Cmd.CanRedo>(CmdConst.CanRedo),
    })
};

export default useApp;