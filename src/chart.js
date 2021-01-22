const plot = new Chart(document.getElementById('plot').getContext('2d'), {
	type: 'line',
	data: {
		datasets: [{
			label: '',
			data: [],
			fill: false,
			borderWidth: 1,
			lineTension: 0,
			pointRadius: 2.5,
			borderColor: ['rgba(150, 150, 150, 1)'],
			pointBorderWidth: 0,
			pointBackgroundColor: 'rgba(150, 150, 150, 1)'
		}]
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		layout: {
			padding: {
				left: 0,
				right: 20,
				top: 20,
				bottom: 0
			}
		},
		legend: {
			display: false
		},
		scales: {
			yAxes: [{
				gridLines: {
					color: '#444',
					drawBorder: true,
					zeroLineColor: '#444'
				},
				scaleLabel: {
					display: true,
					fontSize: 13,
					fontColor: '#FFF'
				},
				ticks: {
					beginAtZero: true,
					fontSize: 13,
					fontColor: '#FFF'
				}
			}],
			xAxes: [{
				type: 'linear',
				position: 'bottom',
				gridLines: {
					color: '#444',
					drawBorder: true,
					zeroLineColor: '#444'
				},
				scaleLabel: {
					display: true,
					fontSize: 13,
					fontColor: '#FFF'
				},
				ticks: {
					fontSize: 13,
					fontColor: '#FFF'
				}
			}]
		}
	}
});