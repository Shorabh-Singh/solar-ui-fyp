import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Line} from 'react-chartjs-2';
import palette from '../../lib/color';
import './PowerOutputChart.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

class PowerOutputChart extends Component {
  constructor(props) {
    super(props);

    const xAxisLabel = 'Time';
    const yAxisLabel = 'kW';

    this.initialPointRadius = 2;
    this.powerLineLabel = 'Power Output';
    this.powerLineBackgroundColor = palette.lightGreen.setAlpha(0.1).toString();
    this.powerLineBorderColor = palette.lightGreen.toString();
    this.timeLabels = ['-5s', '', '', '', '', 'Now'];

    this.options = {
      maintainAspectRatio: false,
      scales: {
        x: {
          title: { display: true, text: xAxisLabel },
          grid: { display: false }
        },
        y: {
          title: { display: true, text: yAxisLabel },
          beginAtZero: true,
          suggestedMax: 0.5,
          ticks: { stepSize: 0.1 }
        }
      },
      animation: {
        duration: 0
      },
      hover: {
        animationDuration: 0,
      },
      plugins: {
        tooltip: {
          callbacks: {
            title: context => context[0].dataset.label,
            label: context => context.parsed.y.toFixed(2) + ' kW'
          }
        },
        legend: { display: false }
      }
    };

    const initialTotalOutputPowerHistory = [null, null, null, null, null, null].map(() => {
      return PowerOutputChart.getTotalOutputPower(this.props.panels);
    });

    this.state = {
      totalOutputPowerHistory: initialTotalOutputPowerHistory,
      pointRadius: this.initialPointRadius
    };

    setInterval(this.updateTotalOutputPowerHistory.bind(this), 1000);
  }

  static getTotalOutputPower(panels) {
    return panels.reduce((accumulator, panel) => {
      const outputPowerW = panel.outputVoltageV * panel.outputCurrentA;
      const outputPowerKW = outputPowerW / 1000;
      return accumulator + outputPowerKW;
    }, 0);
  }

  updateTotalOutputPowerHistory() {
    this.setState((prevState, props) => {
      const totalOutputPowerHistory = prevState.totalOutputPowerHistory.concat();
      const totalOutputPower = PowerOutputChart.getTotalOutputPower(props.panels);
      totalOutputPowerHistory.shift();
      totalOutputPowerHistory.push(totalOutputPower);
      return {
        totalOutputPowerHistory: totalOutputPowerHistory
      };
    });
  }

  render() {
    const data = {
      labels: this.timeLabels,
      datasets: [{
        label: this.powerLineLabel,
        data: this.state.totalOutputPowerHistory,
        backgroundColor: this.powerLineBackgroundColor,
        borderColor: this.powerLineBorderColor,
        borderWidth: 1,
        pointBackgroundColor: this.powerLineBorderColor,
        pointRadius: this.state.pointRadius,
        pointHoverRadius: this.state.pointRadius
      }]
    };

    return (
      <div className='power-output-chart--chart-wrapper'>
        <Line data={data} options={this.options} />
      </div>
    );
  }
}

PowerOutputChart.propTypes = {
  panels: PropTypes.array.isRequired,
};

export default PowerOutputChart;
