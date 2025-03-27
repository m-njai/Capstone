import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, TimeScale);

function FinancialPlan() {
  const [form, setForm] = useState({ budget: '', expectedCost: '', actualCost: '', date: '' });
  const [plans, setPlans] = useState([]);
  const chartRef = useRef(null);

  const token = localStorage.getItem('token');
  const headers = { Authorization: token };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/finance/save', form, { headers });
    fetchPlans();
  };

  const fetchPlans = async () => {
    const res = await axios.get('http://localhost:5000/api/finance/my-plans', { headers });
    setPlans(res.data);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Prepare data for Bar Chart
  const barChartData = {
    labels: plans.map((_, index) => `Plan ${index + 1}`),
    datasets: [
      {
        label: 'Budget',
        data: plans.map(p => p.budget),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Expected Cost',
        data: plans.map(p => p.expectedCost),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
      {
        label: 'Actual Cost',
        data: plans.map(p => p.actualCost),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  // Prepare data for Line Chart
  const lineChartData = {
    labels: plans.map(p => new Date(p.date)),
    datasets: [
      {
        label: 'Utilization (%)',
        data: plans.map(p => ((p.actualCost / p.budget) * 100).toFixed(2)),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Chart options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Budget Utilization Over Time',
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Utilization (%)',
        },
        min: 0,
        max: 200,
      },
    },
  };

  // Function to download charts as PDF
  const downloadChartsAsPDF = () => {
    const input = chartRef.current;
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      const imgWidth = 280;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('financial_charts.pdf');
    });
  };

  return (
    <div>
      <h2>Financial Planner</h2>
      <form onSubmit={handleSubmit}>
        <input name="budget" type="number" placeholder="Budget" onChange={handleChange} />
        <input name="expectedCost" type="number" placeholder="Expected Cost" onChange={handleChange} />
        <input name="actualCost" type="number" placeholder="Actual Cost" onChange={handleChange} />
        <input name="date" type="date" placeholder="Date" onChange={handleChange} />
        <button type="submit">Save Plan</button>
      </form>

      <div ref={chartRef}>
        <h3>Financial Overview</h3>
        <Bar data={barChartData} />

        {plans.length > 0 && (
          <>
            <h3>Budget Utilization Over Time</h3>
            <Line data={lineChartData} options={lineChartOptions} />
          </>
        )}
      </div>

      <button onClick={downloadChartsAsPDF} style={{ marginTop: 20 }}>
        Download Charts as PDF
      </button>
    </div>
  );
}

export default FinancialPlan;
