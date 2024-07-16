import { AppKey, CommandKey } from '@/constants/inject-keys';
import { Cmd } from '@/core/type';
import { App } from '@/core';

export const useApp = () => {
    const app = new App();

    provide(AppKey, {
      app,
    });

    provide(CommandKey, {
      undo:() => app.execute<Cmd.Undo>('undo'),
      redo:() => app.execute<Cmd.Redo>('redo'),
      canUndo:() => app.execute<Cmd.CanUndo>('canUndo'),
      canRedo:() => app.execute<Cmd.CanRedo>('canRedo'),
    })
};

export default useApp;