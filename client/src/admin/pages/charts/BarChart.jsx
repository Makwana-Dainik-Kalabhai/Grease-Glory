import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function BarChart(labels, orders) {
    return <Bar data={{
        labels,
        datasets: [
            {
                id: 1,
                label: 'Completed',
                data: orders?.Completed,
                backgroundColor: "rgba(100, 255, 100, 0.8)",
                hoverBackgroundColor: "rgba(100, 255, 100, 1)"
            },
            {
                id: 2,
                label: 'Cancelled',
                data: orders?.Cancelled,
                backgroundColor: "rgba(255, 100, 100, 0.8)",
                hoverBackgroundColor: "rgba(255, 100, 100, 1)"
            },
        ],
    }} />;
}