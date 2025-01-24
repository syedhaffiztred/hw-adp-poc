/* eslint-disable no-undef */
export async function initViewer(container) {
  return new Promise((resolve, reject) => {
    Autodesk.Viewing.Initializer(
      { env: "AutodeskProduction", getAccessToken },
      () => {
        const viewer = new Autodesk.Viewing.GuiViewer3D(container, {
          extensions: ["Autodesk.DocumentBrowser"],
        });
        viewer.start();
        viewer.setTheme("light-theme");
        resolve(viewer);
      }
    );
  });
}

async function getAccessToken(callback) {
  try {
    const response = await fetch("/api/auth/token");
    if (!response.ok) throw new Error("Failed to get access token.");
    const { access_token, expires_in } = await response.json();
    callback(access_token, expires_in);
  } catch (error) {
    console.error(error);
    alert("Could not obtain access token.");
  }
}

export function loadModel(viewer, urn) {
  return new Promise((resolve, reject) => {
    Autodesk.Viewing.Document.load(
      `urn:${urn}`,
      (doc) =>
        resolve(
          viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry())
        ),
      (err) => reject(err)
    );
  });
}
