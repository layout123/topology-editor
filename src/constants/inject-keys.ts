import { InjectionKey } from 'vue'
import { Context } from '@/core/type';

export const AppKey: InjectionKey<Context> = Symbol('appContext')
