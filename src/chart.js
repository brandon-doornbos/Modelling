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
		plugins: {
			legend: {
				display: false
			}
		},
		scales: {
			x: {
				type: 'linear',
				position: 'bottom',
				title: {
					display: true,
					color: '#FFF',
					font: {
						size: 13
					}
				},
				grid: {
					color: '#444',
					drawBorder: true
				},
				ticks: {
					color: '#FFF',
					font: {
						size: 13
					}
				}
			},
			y: {
				type: 'linear',
				title: {
					display: true,
					color: '#FFF',
					font: {
						size: 13
					}
				},
				grid: {
					color: '#444',
					drawBorder: true,
					zeroLineColor: '#444'
				},
				ticks: {
					beginAtZero: true,
					color: '#FFF',
					font: {
						size: 13
					}
				}
			}
		}
	}
});