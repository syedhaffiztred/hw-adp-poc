import React, { useEffect, useRef } from "react";
import { initViewer, loadModel } from "../utils/viewer";

const ViewerComponent = ({ urn, setViewer }) => {
  const viewerContainerRef = useRef(null);

  useEffect(() => {
    let viewer;

    const initializeViewer = async () => {
      viewer = await initViewer(viewerContainerRef.current);
      setViewer(viewer);

      // Load the selected model (if any)
      if (urn) {
        loadModel(viewer, urn);
      }
    };

    initializeViewer();

    return () => {
      if (viewer) {
        viewer.finish();
      }
    };
  }, [urn, setViewer]);

  return (
    <div
      id="viewer-container"
      ref={viewerContainerRef}
      style={{ height: "100%", width: "100%" }}
    />
  );
};

export default ViewerComponent;
