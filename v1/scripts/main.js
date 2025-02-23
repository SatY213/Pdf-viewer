import { setupEventHandlers } from "./eventHandlers.js";
import { initializePDFViewer } from "./pdfRenderer.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("pdfCanvas");
  const ctx = canvas.getContext("2d");
  const thumbnailContainer = document.getElementById("thumbnailContainer");
  const loadingIndicator = document.getElementById("loadingPage");
  const pageNumDisplay = document.getElementById("page_num");
  const pageCountDisplay = document.getElementById("page_count");

  const pdfViewer = initializePDFViewer({
    canvas,
    ctx,
    thumbnailContainer,
    loadingIndicator,
    pageNumDisplay,
    pageCountDisplay,
  });

  setupEventHandlers(pdfViewer);
});
