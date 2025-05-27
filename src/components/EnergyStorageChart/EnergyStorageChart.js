import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import PropTypes from 'prop-types';
import palette from '../../lib/color';
import './EnergyStorageChart.css';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

class EnergyStorageChart extends Component {
  constructor(props) {
    super(props);

    const xAxisLabel = 'Battery';
    const yAxisLabel = 'kW\u00b7h';

    this.occupiedBarLabel = 'Energy Stored';
    this.vacantBarLabel = 'Free Space';

    this.occupiedBarBackgroundColors = [
      palette.lightGreen.toString(),
      palette.lightGreen.toString(),
      palette.lightGreen.toString()
    ];

    this.vacantBarBackgroundColors = [
      palette.lightGray.setAlpha(0.1).toString(),
      palette.lightGray.setAlpha(0.1).toString(),
      palette.lightGray.setAlpha(0.1).toString()
    ];

    this.options = {
      maintainAspectRatio: false,
      hover: {
        animationDuration: 0,
      },
      scales: {
        x: {
          stacked: true,
          title: { display: true, text: xAxisLabel },
          grid: { display: false }
        },
        y: {
          stacked: true,
          title: { display: true, text: yAxisLabel },
          beginAtZero: true,
          suggestedMax: 15,
          ticks: { stepSize: 5 }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            title: context => context[0].dataset.label,
            label: context => context.parsed.y.toFixed(1) + ' kW\u00b7h'
          }
        },
        legend: { display: false }
      }
    };
  }

  render() {
    const batteries = this.props.batteries,
      batteryIds = [],
      storedEnergiesKWh = [],
      vacanciesKWh = [];

    batteries.forEach((battery) => {
      const storedEnergyKWh = battery.storedEnergyKWh,
        vacancyKWh = battery.energyCapacityKWh - storedEnergyKWh;

      batteryIds.push(battery.id);
      storedEnergiesKWh.push(storedEnergyKWh);
      vacanciesKWh.push(vacancyKWh)
    });

    const data = {
      labels: batteryIds,
      datasets: [{
        label: this.occupiedBarLabel,
        data: storedEnergiesKWh,
        backgroundColor: this.occupiedBarBackgroundColors,
        borderColor: this.occupiedBarBackgroundColors,
        borderWidth: 1
      }, {
        label: this.vacantBarLabel,
        data: vacanciesKWh,
        backgroundColor: this.vacantBarBackgroundColors,
        borderColor: this.vacantBarBackgroundColors,
        borderWidth: 1
      }]
    };

    return (
      <div className='energy-storage-chart--chart-wrapper'>
        <Bar data={data} options={this.options} />
      </div>
    );
  }
}

EnergyStorageChart.propTypes = {
  batteries: PropTypes.array.isRequired
};

export default EnergyStorageChart;
