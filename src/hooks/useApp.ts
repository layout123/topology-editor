import { AppKey, CommandKey } from '@/constants/inject-keys';
import { Cmd, CmdConst } from '@/core/type';
import { App, Node, Edge } from '@/core';

export const useApp = () => {
    const app = new App();
    const selectedElement = ref<Node | Edge | null>(null);

    app.on('ELEMENT_SELECTED',(element)=>{
      selectedElement.value = element;
    })
    
    provide(AppKey, {
      app,
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