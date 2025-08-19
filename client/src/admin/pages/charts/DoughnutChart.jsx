import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export function DoughnutChart(labels, orders) {
    const data = {
        labels,
        datasets: [
            {
                label: 'Completed',
                data: orders.Completed,
                backgroundColor: [
                    // 'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    // 'rgba(255, 206, 86, 0.2)',
                    // 'rgba(75, 192, 192, 0.2)',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    // 'rgba(255, 99, 132, 1)',
                    // 'rgba(54, 162, 235, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
                offset: 5,                   // Segment offset on hover
                borderRadius: 7,
                spacing: 3,
            },
            {
                label: 'Cancelled',
                data: orders.Cancelled,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    // 'rgba(54, 162, 235, 0.2)',
                    // 'rgba(255, 206, 86, 0.2)',
                    // 'rgba(75, 192, 192, 0.2)',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    // 'rgba(54, 162, 235, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
                offset: 5,                   // Segment offset on hover
                borderRadius: 7,
                spacing: 3,
            },
        ],
    };
    return <Doughnut options={{
        responsive: true,
        aspectRatio: 2,

        // Cutout percentage (0 = pie, >0 = doughnut)
        cutout: '50%', // or number like 50

        // Radius configuration
        radius: '100%', // or percentage string 

        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                        const value = context.parsed;
                        const percentage = ((value / total) * 100).toFixed(2) + '%';
                        return label + percentage;
                    }
                }
            }
        }
    }} data={data} />;
}