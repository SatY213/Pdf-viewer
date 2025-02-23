import { generateThumbnails } from "./thumbnailGenerator.js";
import { renderTextLayer } from "./textLayerRenderer.js";

export function initializePDFViewer({
  canvas,
  ctx,
  thumbnailContainer,
  loadingIndicator,
  pageNumDisplay,
  pageCountDisplay,
}) {
  let pdfDoc = null,
    pageNum = 1,
    pageCount = 0,
    scale = 1.0,
    isLoadingPage = false;

  const pdfjsLib = window["pdfjsLib"];
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

  function renderPage(num) {
    if (isLoadingPage) return;
    isLoadingPage = true;
    loadingIndicator.style.display = "block";

    pdfDoc.getPage(num).then((page) => {
      const originalViewport = page.getViewport({ scale: 1 });

      // Set default width to 900px and calculate the base scale
      const baseWidth = 1100;
      const baseScale = baseWidth / originalViewport.width;

      // Apply zooming factor (this allows zooming)
      const viewport = page.getViewport({ scale: baseScale * scale });

      // Update canvas size to match scaled viewport
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Make sure the canvas renders at the correct size in CSS
      // canvas.style.width = `${viewport.width}px`;
      // canvas.style.height = `${viewport.height}px`;

      const renderContext = { canvasContext: ctx, viewport: viewport };
      page.render(renderContext).promise.then(() => {
        loadingIndicator.style.display = "none";
        pageNumDisplay.textContent = num;
        renderTextLayer(page, viewport, canvas);
        isLoadingPage = false;
      });
    });
  }

  function loadPDF(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const pdfData = new Uint8Array(e.target.result);
      pdfjsLib.getDocument({ data: pdfData }).promise.then((pdf) => {
        pdfDoc = pdf;
        pageCount = pdf.numPages;
        pageCountDisplay.textContent = pageCount;
        renderPage(pageNum);
        generateThumbnails(pdfDoc, thumbnailContainer, renderPage);
      });
    };
    reader.readAsArrayBuffer(file);
  }

  return {
    renderPage,
    loadPDF,
    getPageNum: () => pageNum,
    setPageNum: (num) => (pageNum = num),
    getPageCount: () => pageCount,
    getScale: () => scale,
    setScale: (newScale) => (scale = newScale),
  };
}
