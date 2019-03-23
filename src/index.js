import "./styles.css";

import { default as vegaEmbed } from "vega-embed";

document.getElementById("app").innerHTML = `
  <h3>Hello Vega!</h3>
  <div id="vega-container"></div>
`;

// main app bootstrapping on content loaded
document.addEventListener("DOMContentLoaded", main);
function main() {
  const vegaSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v3.json",
    title: "Interactive Vega Bar Chart",
    description:
      "bar chart with highlighting on hover and multi-bar selection on click",
    width: 240,
    height: 240,
    data: {
      values: [{ a: "A", b: 28 }, { a: "B", b: 55 }, { a: "C", b: 43 }]
    },
    selection: {
      highlight: { type: "single", empty: "none", on: "mouseover" },
      select: { type: "multi" },
      barSelection: { fields: ["a"], on: "click", type: "multi" }
    },
    mark: {
      type: "bar",
      fill: "#4C78A8",
      stroke: "black",
      cursor: "pointer"
    },
    encoding: {
      x: { field: "a", type: "ordinal" },
      y: { field: "b", type: "quantitative" },
      fillOpacity: {
        condition: { selection: "select", value: 1 },
        value: 0.8
      },
      strokeWidth: {
        condition: { selection: "highlight", value: 1 },
        value: 0.5
      }
    },
    config: {
      scale: { bandPaddingInner: 0.2 },
      axis: {
        labelColor: "#333",
        labelFontSize: 12,
        labelFontWeight: "bold"
      },
      axisBottom: { labelColor: "#666" }
    }
  };

  vegaEmbed("#vega-container", vegaSpec, { mode: "vega-lite" })
    .then(function(result) {
      // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
    })
    .catch(error => {
      console.error("vega:error", error);
    });
}
