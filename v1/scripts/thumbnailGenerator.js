export function generateThumbnails(pdfDoc, thumbnailContainer, renderPage) {
  thumbnailContainer.innerHTML = ""; // Clear existing thumbnails

  for (let i = 1; i <= pdfDoc.numPages; i++) {
    const thumbDiv = document.createElement("div");
    thumbDiv.classList.add("thumbnail");

    const thumbCanvas = document.createElement("canvas");
    const thumbCtx = thumbCanvas.getContext("2d");

    const spinner = document.createElement("div");
    spinner.classList.add("loading");

    thumbDiv.appendChild(spinner);
    thumbDiv.appendChild(thumbCanvas);
    thumbnailContainer.appendChild(thumbDiv);

    pdfDoc.getPage(i).then((page) => {
      const originalViewport = page.getViewport({ scale: 1 });

      // Define fixed thumbnail width
      const thumbWidth = 120;
      const scaleFactor = thumbWidth / originalViewport.width;
      const viewport = page.getViewport({ scale: scaleFactor });

      // Maintain aspect ratio
      thumbCanvas.width = viewport.width;
      thumbCanvas.height = viewport.height;

      const renderContext = {
        canvasContext: thumbCtx,
        viewport: viewport,
      };

      page.render(renderContext).promise.then(() => {
        spinner.remove(); // Remove loader after rendering
      });

      // Allow clicking thumbnail to navigate to the page
      thumbCanvas.addEventListener("click", () => {
        renderPage(i);
      });
    });
  }
}
