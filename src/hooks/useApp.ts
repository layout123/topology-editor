import App from '@/core/app';

const state = reactive({
    app: null as App | null,
});

export const useApp = () => {
    return state;
};

export function provideApp(newApp: App) {
  state.app = newApp;
}
