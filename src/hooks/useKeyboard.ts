// useKeyboard.ts
import { onMounted, onUnmounted } from 'vue';

export const useKeyboard =(key: string, callback: () => void) => {
  const handler = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key.toLowerCase() === key.toLowerCase()) {
      callback();
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
