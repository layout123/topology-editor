import { InjectionKey } from 'vue'
import { Context, Command } from '@/core/type';

export const AppKey: InjectionKey<Context> = Symbol('appContext')
export const CommandKey: InjectionKey<Command> = Symbol('CommandKey');