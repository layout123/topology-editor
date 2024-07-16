import { AppKey, CommandKey } from '@/constants/inject-keys';
import { Cmd, CmdConst } from '@/core/type';
import { App } from '@/core';

export const useApp = () => {
    const app = new App();

    provide(AppKey, {
      app,
    });

    provide(CommandKey, {
      undo:() => app.execute<Cmd.Undo>(CmdConst.Undo),
      redo:() => app.execute<Cmd.Redo>(CmdConst.Redo),
      canUndo:() => app.execute<Cmd.CanUndo>(CmdConst.CanUndo),
      canRedo:() => app.execute<Cmd.CanRedo>(CmdConst.CanRedo),
    })
};

export default useApp;