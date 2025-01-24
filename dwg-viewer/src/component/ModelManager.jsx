import React, { useEffect, useState } from "react";

const ModelManager = ({ viewer, setUrn }) => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchModels = async () => {
    try {
      const response = await fetch("/api/models");
      if (!response.ok) throw new Error("Failed to fetch models.");
      const models = await response.json();
      setModels(models);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("model-file", file);

    if (file.name.endsWith(".zip")) {
      const entrypoint = window.prompt(
        "Enter the main design filename inside the zip:"
      );
      formData.append("model-zip-entrypoint", entrypoint);
    }

    setLoading(true);
    try {
      const response = await fetch("/api/models", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed.");
      const model = await response.json();

      // Refresh model list and select the new model
      await fetchModels();
      setUrn(model.urn);
    } catch (error) {
      console.error(error);
      alert("Upload failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <div id="model-manager">
      <select
        onChange={(e) => setUrn(e.target.value)}
        disabled={loading}
        defaultValue=""
      >
        <option value="" disabled>
          Select a model
        </option>
        {models.map((model) => (
          <option key={model.urn} value={model.urn}>
            {model.name}
          </option>
        ))}
      </select>
      <input
        type="file"
        id="model-upload"
        onChange={handleUpload}
        disabled={loading}
        style={{ display: "none" }}
      />
      <button
        onClick={() => document.getElementById("model-upload").click()}
        disabled={loading}
      >
        Upload Model
      </button>
    </div>
  );
};

export default ModelManager;
