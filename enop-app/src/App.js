import './App.css';

import React from 'react';
import { useState, useCallback, useMemo, useEffect } from 'react';
import 'chartjs-adapter-moment';

import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

import RAW_DATA from './data/Prices_and_Consumption.json';

ChartJS.register(
  TimeScale,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const DATETIME = new Date('2022-10-31T12:00:00+00:00');

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Prices and consumption',
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
      stacked: true,

    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      stacked: true,
      grid: {
        drawOnChartArea: false,
      },
    },
    x: {
      type: 'time',
      stacked: true,
      grid: {display: false}
    },
  },
};

var chartReference = {};

function App() {
  let startTimeInput = new Date(DATETIME);
  startTimeInput.setDate(DATETIME.getDate() - 2);
  const [startTime, setStartTime] = useState(
    startTimeInput.toISOString().split('T')[0]
  );
  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Price (snt/kWh)',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
        type: 'bar',
      },
      {
        label: 'Predicted price (snt/kWh)',
        data: [],
        borderColor: 'rgb(237, 93, 0)',
        backgroundColor: 'rgba(237, 93, 0, 0.5)',
        yAxisID: 'y',
        type: 'line',
        tension: 0.8,
      },
      {
        label: 'Consumption (kWh)',
        data: [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
        type: 'bar',
      },
    ],
  });
  const [parsedPriceAndConsumptionData, setParsedPriceAndConsumptionData] =
    useState([]);
  const [energyPointsYesterday, setEnergyPointsYesterday] = useState(0);
  const [energyPointsPastWeek, setEnergyPointsPastWeek] = useState(0);
  const [energyPointsPastMonth, setEnergyPointsPastMonth] = useState(0);
  const [energyPointsPastYear, setEnergyPointsPastYear] = useState(0);

  const updateGraph = useCallback((startTime) => {
    let lastGraphData = { ...graphData };
    lastGraphData['labels'] = [];
    lastGraphData['datasets'][0]['data'] = [];
    lastGraphData['datasets'][1]['data'] = [];
    lastGraphData['datasets'][2]['data'] = [];
    parsedPriceAndConsumptionData.forEach(function (item) {
      if (item['Datetime'] >= startTime) {
        lastGraphData['labels'].push(item['Datetime']);
        lastGraphData['datasets'][0]['data'].push(item['Price']);
        lastGraphData['datasets'][1]['data'].push(item['PricePrediction']);
        lastGraphData['datasets'][2]['data'].push(item['Consumption']);
      }
    });
    setGraphData(lastGraphData);
    chartReference.update('none');
  });

  const handleDateChange = useCallback((event) => {
    const date = new Date(event.target.value);
    setStartTime(date.toISOString().split('T')[0]);
    updateGraph(date);
  });

  useEffect(() => {
    const parsedPriceAndConsumptionData = parsePriceAndConsumptionData();
    const energyPointsYesterday = calculateEnergyPoints(
      1,
      parsedPriceAndConsumptionData
    );
    const energyPointsPastWeek = calculateEnergyPoints(
      7,
      parsedPriceAndConsumptionData
    );
    const energyPointsPastMonth = calculateEnergyPoints(
      30,
      parsedPriceAndConsumptionData
    );
    const energyPointsPastYear = calculateEnergyPoints(
      365,
      parsedPriceAndConsumptionData
    );
    setParsedPriceAndConsumptionData(parsedPriceAndConsumptionData);
    setEnergyPointsYesterday(energyPointsYesterday);
    setEnergyPointsPastWeek(energyPointsPastWeek);
    setEnergyPointsPastMonth(energyPointsPastMonth);
    setEnergyPointsPastYear(energyPointsPastYear);

    let startTime = new Date(DATETIME);
    startTime.setDate(DATETIME.getDate() - 2);
    let lastGraphData = { ...graphData };
    lastGraphData['labels'] = [];
    lastGraphData['datasets'][0]['data'] = [];
    lastGraphData['datasets'][1]['data'] = [];
    lastGraphData['datasets'][2]['data'] = [];

    parsedPriceAndConsumptionData.forEach(function (item) {
      if (item['Datetime'] >= startTime) {
        lastGraphData['labels'].push(item['Datetime']);
        lastGraphData['datasets'][0]['data'].push(item['Price']);
        lastGraphData['datasets'][1]['data'].push(item['PricePrediction']);
        lastGraphData['datasets'][2]['data'].push(item['Consumption']);
      }
    });

    setGraphData(lastGraphData);
  }, []);

  return (
    <div className='App'>
      <div className='Sidebar'>
        <div className='Logo'>
          <div>
            <h1>ENOP</h1>
          </div>
        </div>
        <div className='SidebarButton'>
          📊<div className='SidebarItem'>Analytics</div>
        </div>
        <div className='SidebarButton'>
          ⚡️<div className='SidebarItem'>Control room</div>
        </div>
      </div>
      <div className='Dashboard'>
        <div className='Headerbox'>
          <div className='HeaderText'>
            Hello, Ulla! Today is another perfect day to optimize your energy
            consumption at the location{' '}
            <b>Example address 8 A, 00100 Helsinki</b>.
            <h3>
              Date and time: {DATETIME.toDateString()} {DATETIME.getHours()}:00
            </h3>
          </div>
        </div>
        <div className='DashboardWrapper'>
          <div className='DashboardHeader'><h1>Analytics</h1></div>
          <div className='InputWrapper'>
            <h3>Select start date (UTC)</h3>
            <input
              type='date'
              onChange={handleDateChange}
              value={startTime}
            ></input>
          </div>
          <div className='GraphWrapper'>
            <Chart
              type='bar'
              options={options}
              data={graphData}
              ref={(reference) => (chartReference = reference)}
              redraw={true}
            />
          </div>
          <div className='DashboardHeader'><h1>Energy optimization score</h1></div>
          <div className='EnergyPointWrapper'>
            <div className='EnergyPoint'>
              <h3>Past day</h3>
              <div>
                <h2
                  style={{ color: getEnergyPointColor(energyPointsYesterday) }}
                >
                  {Math.round(energyPointsYesterday)}/100
                </h2>
              </div>
            </div>
            <div className='EnergyPoint'>
              <h3>Past week</h3>
              <div>
                <h2
                  style={{ color: getEnergyPointColor(energyPointsPastWeek) }}
                >
                  {Math.round(energyPointsPastWeek)}/100
                </h2>
              </div>
            </div>
            <div className='EnergyPoint'>
              <h3>Past month</h3>
              <div>
                <h2
                  style={{ color: getEnergyPointColor(energyPointsPastMonth) }}
                >
                  {Math.round(energyPointsPastMonth)}/100
                </h2>
              </div>
            </div>
            <div className='EnergyPoint'>
              <h3>Past year</h3>
              <div>
                <h2
                  style={{ color: getEnergyPointColor(energyPointsPastYear) }}
                >
                  {Math.round(energyPointsPastYear)}/100
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const getEnergyPointColor = (value) => {
  if (value < 40) return 'red';
  if (value < 70) return '#ff9216';
  return 'green';
};

const parsePriceAndConsumptionData = () => {
  RAW_DATA.forEach(function (item) {
    item['Datetime'] = new Date(item['Datetime']);
    if (item['Price'] < 0) item['Price'] = 0.0;
    if (item['PricePrediction'] < 0) item['PricePrediction'] = 0.0;
  });
  return RAW_DATA;
};

const calculateEnergyPoints = (daysBefore, priceAndConsumptionData) => {
  let startTime = new Date(DATETIME);
  startTime.setHours(0);
  startTime.setDate(DATETIME.getDate() - daysBefore);
  let actualResult = 0.0;
  let bestResult = 0.0;
  let worstResult = 0.0;
  let prices = [];
  let consumptions = [];
  let EP = 0.0;

  priceAndConsumptionData.forEach(function (item) {
    if (item['Datetime'] >= startTime) {
      if (item['Price'] !== null && item['Consumption'] !== null) {
        actualResult += item['Price'] * item['Consumption'];
        prices.push(item['Price']);
        consumptions.push(item['Consumption']);
      }
    }
  });
  consumptions.sort((a, b) => {
    return a - b;
  });
  prices.sort((a, b) => {
    return a - b;
  });
  for (let i = 0; i < consumptions.length; i++) {
    worstResult += prices[i] * consumptions[i];
    bestResult += prices[prices.length - i - 1] * consumptions[i];
  }
  const interval = worstResult - bestResult;
  if (interval === 0.0) {
    EP = 1.0;
  } else {
    EP = 1 - (actualResult - bestResult) / worstResult;
  }
  return EP * 100;
};

export default App;
