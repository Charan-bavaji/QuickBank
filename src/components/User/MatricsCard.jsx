// src/components/MetricsCard.jsx
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MetricsCard = () => {
    const [timeRange, setTimeRange] = useState('Last week');

    const handleTimeRangeChange = (event) => {
        setTimeRange(event.target.value);
    };

    // Line chart data and options
    const data = {
        labels: ['02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb'],
        datasets: [
            {
                label: 'Transactions',
                data: [10, 20, 25, 30, 40],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
                tension: 0.4, // Curved lines
            },
            {
                label: 'Transfer',
                data: [12, 6, 20, 5, 18],
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Hide legend, you can turn this on if needed
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                display: true,
            },
            y: {
                display: true,
            },
        },
    };

    return (
        <div className="w-full max-w-sm p-4 bg-black rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <div className="text-sm">Transactions</div>
                    <div className="text-xl font-bold">218</div>
                </div>
                <div>
                    <div className="text-sm">Transfer</div>
                    <div className="text-xl font-bold">26</div>
                </div>
                <select
                    value={timeRange}
                    onChange={handleTimeRangeChange}
                    className="p-2 border rounded-md text-black"
                >
                    <option>Last week</option>
                    <option>Last month</option>
                    <option>Last year</option>
                </select>
            </div>

            <div className="">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default MetricsCard;
