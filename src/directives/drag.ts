export default {
    mounted(el: HTMLDivElement, binding: any) {
      el.draggable = true;
      console.log(binding)
      el.addEventListener('dragstart', (event) => {
        event.dataTransfer?.setData('shapeType', binding.arg);
      },{ passive: true });
    },
  };