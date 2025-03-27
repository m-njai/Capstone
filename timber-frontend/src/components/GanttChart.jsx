import React from 'react';
import { Chart } from 'react-google-charts';

const GanttChart = () => {
  const columns = [
    { type: 'string', label: 'Task ID' },
    { type: 'string', label: 'Task Name' },
    { type: 'date', label: 'Start Date' },
    { type: 'date', label: 'End Date' },
    { type: 'number', label: 'Duration' },
    { type: 'number', label: 'Percent Complete' },
    { type: 'string', label: 'Dependencies' },
  ];

  const rows = [
    ['Research', 'Find sources', new Date(2025, 2, 1), new Date(2025, 2, 5), null, 100, null],
    ['Write', 'Write paper', null, new Date(2025, 2, 9), 3 * 24 * 60 * 60 * 1000, 25, 'Research'],
    ['Edit', 'Edit paper', null, new Date(2025, 2, 10), 2 * 24 * 60 * 60 * 1000, 20, 'Write'],
  ];

  const data = [columns, ...rows];

  return (
    <Chart
      chartType="Gantt"
      width="100%"
      height="400px"
      data={data}
    />
  );
};

export default GanttChart;
