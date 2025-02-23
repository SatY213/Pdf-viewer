export function setupEventHandlers(pdfViewer) {
  document.getElementById("uploadPdf").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      pdfViewer.loadPDF(file);
    }
  });

  document.getElementById("prev").addEventListener("click", () => {
    if (pdfViewer.getPageNum() > 1) {
      pdfViewer.setPageNum(pdfViewer.getPageNum() - 1);
      pdfViewer.renderPage(pdfViewer.getPageNum());
    }
  });

  document.getElementById("next").addEventListener("click", () => {
    if (pdfViewer.getPageNum() < pdfViewer.getPageCount()) {
      pdfViewer.setPageNum(pdfViewer.getPageNum() + 1);
      pdfViewer.renderPage(pdfViewer.getPageNum());
    }
  });

  document.getElementById("zoom_in").addEventListener("click", () => {
    pdfViewer.setScale(pdfViewer.getScale() + 0.2);
    pdfViewer.renderPage(pdfViewer.getPageNum());
  });

  document.getElementById("zoom_out").addEventListener("click", () => {
    if (pdfViewer.getScale() > 0.4) {
      pdfViewer.setScale(pdfViewer.getScale() - 0.2);
      pdfViewer.renderPage(pdfViewer.getPageNum());
    }
  });
}
