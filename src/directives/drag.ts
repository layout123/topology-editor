export default {
    mounted(el: HTMLDivElement, binding: any) {
      el.draggable = true;
      el.addEventListener('dragstart', (event) => {
        event.dataTransfer?.setData('shapeType', JSON.stringify(binding.arg));
      },{ passive: true });
    },
  };