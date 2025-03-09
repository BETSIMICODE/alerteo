// DonutChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ remainingDays }) => {
    const data = {
        labels: ['Délai restant', 'Temps écoulé'],
        datasets: [
            {
                data: [remainingDays, 30 - remainingDays],
                backgroundColor: ['#4CAF50', '#FFC107'], 
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw || '';
                        return `${value} jours`;
                    },
                },
            },
        },
        cutout: '60%',
    };

    return (
        <div style={{ width: '100px', height: '100px' }}>
            <Pie data={data} options={options} />
        </div>
    );
};

export default DonutChart;
