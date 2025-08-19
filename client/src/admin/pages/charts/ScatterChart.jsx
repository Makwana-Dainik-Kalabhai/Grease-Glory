import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);


export function ScatterChart(orders) {
    const options = {
        responsive: true,
        pointBackgroundColor: 'rgba(200, 80, 80, 0.8)',
        pointBorderColor: 'rgba(200, 0, 0, 1)',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: 'rgba(200, 0, 0, 1)',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
        pointHitRadius: 10,
        pointStyle: 'circle',
        showLine: true,
        borderColor: 'rgba(200, 0, 0, 1)',
        borderWidth: 2,
        borderDash: [8, 5], // for dashed lines
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
        tension: 0.4, // for curved lines
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Days of the month',
                    color: '#666',
                    font: {
                        size: 13,
                        weight: 'bold'
                    },
                    padding: { top: 10, bottom: 10 }
                },
                min: 0, // Set minimum value for x-axis
                max: 31, // Set maximum value for x-axis
                ticks: {
                    stepSize: 1, // Set tick interval
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Time of the Order (Hour)',
                    color: '#666',
                    font: {
                        size: 13,
                        weight: 'bold'
                    },
                    padding: { top: 10, bottom: 10 }
                },
                min: 0,
                max: 24,
                ticks: {
                    stepSize: 3,
                },
                beginAtZero: true,
            },
        },
    };

    const data = {
        datasets: [
            {
                label: 'Orders of the Month',
                data: orders,
                // data: [{ x: 10, y: 20 }, { x: 15, y: 10 }, { x: 20, y: 30 }],
                backgroundColor: 'rgba(255, 80, 80, 1)',
            },
        ],
    };

    return <Scatter options={options} data={data} />;
}