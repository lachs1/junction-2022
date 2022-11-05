import logo from './logo.svg';
import './App.css';

import React from 'react';
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
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Energy prediction',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Predicted',
      data: [3, 2, 4,3,5,10,9],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'True prices',
      data: [1, 1, 3,5,4,6,9],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};



function App() {
  return (
    <div className='App'>
      <div className='Sidebar'>
          <div className='Logo'>
            ⚡️<div><h1>ENOP</h1></div>
          </div>
          <div className='SidebarButton'>
          🏠<div>Home</div>
          </div>
          <div className='SidebarButton'>
            📉<div>Analytics</div>
          </div>
        </div>
        <div className='Dashboard'>
        <div className='Headerbox'>
          <div className='HeaderText'>Hello, Ulla! Today is another perfect day to optimize your energy consumption at the location. </div>
          </div>
        <div className='Wrapper'>
          <Line options={options} data={data} />
          </div>
          <div className='Wrapper'>
          <Line options={options} data={data} />
          </div>
        </div>
    </div>

  );
}

export default App;
