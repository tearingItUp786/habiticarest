export function pieChartOptions({ text = 'Title' }) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      fontColor: 'white',
      fontSize: 20,
      fontStyle: 'normal',
      padding: 20,
      position: 'top',
      text
    },
    elements: {
      arc: {
        borderWidth: 1
      }
    },
    legend: {
      fullWidth: false,
      fontSize: '14px',
      fontStyle: 'normal',
      labels: {
        fontColor: 'white',
        padding: 20
      },
      position: 'left'
    }
  };
}

export function lineChartOptions({ text = 'Some Text' }) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      fontColor: 'white',
      fontSize: 20,
      fontStyle: 'normal',
      padding: 20,
      position: 'top',
      text
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: 'white'
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: 'white'
          }
        }
      ]
    },
    elements: {
      line: {
        tension: 0.1
      }
    }
  };
}

export function barChartOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      fullWidth: true,
      fontSize: '14px',
      fontStyle: 'normal',
      labels: {
        fontColor: 'white',
        padding: 20
      },
      position: 'bottom'
    },
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            fontColor: 'white'
          }
        }
      ],
      xAxes: [
        {
          stacked: false,
          beginAtZero: true,
          scaleLabel: {
            labelString: 'Month'
          },
          ticks: {
            fontColor: 'white',
            stepSize: 10,
            min: 0,
            autoSkip: true
          }
        }
      ]
    }
  };
}

export function formatDateWithMonths(unixDate) {
  const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'Sept', 'Oct', 'Nov', 'Dec'];

  const date = new Date(unixDate);
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const numberDay = date.getDate();
  return `${month} ${numberDay}, ${year}`;
}
