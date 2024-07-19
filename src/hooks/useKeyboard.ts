import { onMounted, onUnmounted } from 'vue';

export const useKeyboard = (keys: string[], callback: () => void, requireCtrlMeta: boolean = true) => {
  const handler = (event: KeyboardEvent) => {
    for (let key of keys) {
      if (
        (requireCtrlMeta && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === key.toLowerCase()) ||
        (!requireCtrlMeta && event.key.toLowerCase() === key.toLowerCase())
      ) {
        callback();
        break;
      }
    }
  };

  onMounted(() => {
    window.addEventListener('keydown', handler);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handler);
  });
}

export default useKeyboard;
