import React, { useState } from "react";
import ViewerComponent from "./component/ViewerComponent";
import ModelManager from "./component/ModelManager";
import Notification from "./component/Notification";

const App = () => {
  const [urn, setUrn] = useState(null);
  const [viewer, setViewer] = useState(null);

  return (
    <div id="app">
      <header>
        <img src="https://cdn.autodesk.io/logo/black/stacked.png" alt="Logo" />
        <h1>Simple Viewer</h1>
        <ModelManager viewer={viewer} setUrn={setUrn} />
      </header>
      <main>
        <ViewerComponent urn={urn} setViewer={setViewer} />
      </main>
      <Notification message={null} />
    </div>
  );
};

export default App;
