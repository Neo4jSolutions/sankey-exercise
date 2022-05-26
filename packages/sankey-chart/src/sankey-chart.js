import React from 'react';
import { Chart } from 'react-google-charts';

import { blue6, orange, volcano, teal, red5, purple } from "sankey-styles";

export const DEFAULT_PROPS = {
  width: '100%',
  height: '300px',
  rootProps: { "data-id": "1" },
  sankeyNodeStyle: {
    label: {
      fontSize: 12,
      color: "#000",
      bold: false,
      italic: false,
    },
    interactivity: true,
    labelPadding: 6,
    nodePadding: 10,
    width: 5,
    colors: [blue6, teal, orange, purple, volcano, red5]
  }
};

// This is the React component that renders the sankey chart.
export const SankeyChart = props => {
  const { width, height, rootProps, sankeyNodeStyle, data } = props;
  return (
    <div className="sankey-chart-wrapper">
      <Chart
        width={width}
        height={height}
        chartType="Sankey"
        data={data}
        options={{
          sankey: {
            node: sankeyNodeStyle
          }
        }}
        rootProps={rootProps}
      />
    </div>
  );
};
