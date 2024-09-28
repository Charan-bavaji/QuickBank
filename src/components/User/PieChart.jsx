// src/components/PieChart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ['Deposit', 'withdraw', 'ballance'],
    datasets: [
      {
        label: '# of Votes',
        data: [6000, 2000, 4000],
        backgroundColor: [
          'rgba(255, 224, 73, 100)',
          'rgba(255, 186, 67, 100)',
          'rgba(60, 151, 243, 100)',
        ],
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        // ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
