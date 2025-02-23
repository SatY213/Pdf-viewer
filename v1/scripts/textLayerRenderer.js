import { observeCanvasOffset } from "./customSelection.js";

export function renderTextLayer(page, viewport, canvas) {
  page.getTextContent().then((textContent) => {
    let textLayerDiv = document.querySelector(".textLayer");

    // Create textLayer if it doesn't exist
    if (!textLayerDiv) {
      textLayerDiv = document.createElement("div");
      textLayerDiv.classList.add("textLayer");
      canvas.parentElement.appendChild(textLayerDiv);
    }

    function updateTextLayer() {
      const canvasRect = canvas.getBoundingClientRect();
      const containerRect = canvas.parentElement.getBoundingClientRect();
      const scaleFactor = canvas.clientWidth / viewport.width;
      // Align text layer over canvas
      textLayerDiv.style.left = `${canvasRect.left - containerRect.left}px`;
      textLayerDiv.style.top = `${canvasRect.top - containerRect.top}px`;
      textLayerDiv.style.width = `${canvas.width}px`;
      textLayerDiv.style.height = `${canvas.height}px`;

      // Ensure proper scaling
      const scale = canvas.width / viewport.width; // Calculate new scale
      textLayerDiv.style.transform = `scale(${scaleFactor})`;
      textLayerDiv.style.transformOrigin = "top left";
    }

    // Call update initially and whenever the window resizes
    updateTextLayer();
    window.addEventListener("resize", updateTextLayer);

    // Clear previous text
    textLayerDiv.innerHTML = "";

    // Render text layer
    pdfjsLib.renderTextLayer({
      textContent,
      container: textLayerDiv,
      viewport,
      textDivs: [],
      enhanceTextSelection: true, // Enables selectable text
    });

    // Ensure text updates when window resizes
    window.addEventListener("resize", updateTextLayer);
  });
}
