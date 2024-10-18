import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, ScatterController, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Register chart.js components
ChartJS.register(ScatterController, CategoryScale, LinearScale, PointElement);

type ScatterPlotProps = {
  numDots: number;
  width?: number;
  height?: number;
};

const ScatterPlot: React.FC<ScatterPlotProps> = ({ numDots, width = 140, height = 60 }) => {
  // Generate random data for scatter plot
  const data = {
    datasets: [
      {
        label: 'Random Points',
        data: Array.from({ length: numDots }, () => ({
          x: Math.random(),
          y: Math.random(),
        })),
        backgroundColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  // Configure options to hide axis titles and set the font
  const options = {
    scales: {
      x: {
        type: 'linear' as const,
        min: 0,
        max: 1,
        title: {
          display: false, // Hide x-axis title
        },
        ticks: {
          font: {
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', // Apple system font stack
            size: 8,
          },
        },
      },
      y: {
        type: 'linear' as const,
        min: 0,
        max: 1,
        title: {
          display: false, // Hide y-axis title
        },
        ticks: {
          font: {
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', // Apple system font stack
            size: 8,
          },
        },
      },
    },
    maintainAspectRatio: false, // Allow custom sizing
  };

  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      <Scatter data={data} options={options} />
    </div>
  );
};

export default ScatterPlot;
