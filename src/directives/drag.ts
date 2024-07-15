export default {
    mounted(el: HTMLDivElement, binding: any) {
      el.draggable = true;
      el.addEventListener('dragstart', (event) => {
        event.dataTransfer?.setData('model', JSON.stringify(binding.arg));
      },{ passive: true });
    },
  };