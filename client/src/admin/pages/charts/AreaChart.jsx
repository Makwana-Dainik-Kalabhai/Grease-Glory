import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);


export function AreaChart(labels, orders) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    
    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Completed',
                data: orders?.Completed,
                borderColor: 'green',
                backgroundColor: 'rgba(100, 255, 100, 0.5)',
            },
            {
                fill: true,
                label: 'Cancelled',
                data: orders?.Cancelled,
                borderColor: 'red',
                backgroundColor: 'rgba(255, 100, 100, 0.5)',
            },
        ],
    };
    return <Line options={options} data={data} />;
}