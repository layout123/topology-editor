import { InjectionKey } from 'vue'
import App from '@/core/app';
import { Context } from '@/core/type';

export const AppKey: InjectionKey<Context> = Symbol('appContext')
