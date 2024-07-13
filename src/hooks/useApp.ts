import { AppKey } from '@/constants/inject-keys';
import { App } from '@/core';

export const useApp = () => {
    const app = new App();
  
    provide(AppKey, {
      app,
    });
};

export default useApp;