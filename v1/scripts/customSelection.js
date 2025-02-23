export function observeCanvasOffset(canvas, callback) {
  const observer = new ResizeObserver(() => {
    callback();
  });

  observer.observe(canvas);
}
