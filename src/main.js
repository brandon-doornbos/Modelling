let run = 0, selectedRun = 0;
const runs = [];

let iterations = 10000;
let index = 0;
function updateIterations(element) {
	iterations = element.value;
}

let rounding = 2;

const variableInput = document.getElementById('variable-input');
const modelInput = document.getElementById('model-input');
const trackedVars = document.getElementById('tracked-vars');
const trackingVars = {'t': {data: [], unit: 's'}, 'x': {data: [], unit: 'm'}};
const simulationRuns = document.getElementById('simulation-runs');
const displayVarX = document.getElementById('display-var-x');
const displayVarY = document.getElementById('display-var-y');

window.addEventListener('load', () => {
	for(let element of trackedVars.children) {
		if(element.type === 'checkbox') {
			element.checked = true;
		}
	}
});
window.addEventListener('resize', () => {
	const container = document.getElementsByClassName('chart-container')[0];
	const containerStyle = window.getComputedStyle(container);
	const columns = parseInt(containerStyle["grid-column-end"])-parseInt(containerStyle["grid-column-start"]);

	const gridStyle = window.getComputedStyle(document.getElementById('main-ui'));
	const columnWidth = parseFloat(gridStyle["grid-template-columns"].split('px')[0]);
	const columnGap = parseFloat(gridStyle["column-gap"].split('px')[0]);

	container.style.width = (columns*(columnWidth+columnGap))+'px';
});

function runModel() {
	Function(variableInput.value)();
	const iterate = Function(modelInput.value+'return 0;');

	for(let variable in trackingVars) {
		trackingVars[variable].data = [];
	}

	index = 0;
	while(index++ < iterations) {
		for(let variable in trackingVars) {
			trackingVars[variable].data.push(window[variable].toFixed(rounding));
		}

		if(iterate() !== 0) break;
	}

	addRun(trackingVars);

	plot.update();
}

function trackVar() {
	const variable = prompt('Welke variabele?');
	if(variable === null) return;

	const unit = prompt('Met welke eenheid?');

	trackingVars[variable] = {data: [], unit};

	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.checked = true;
	checkbox.onclick = Function('untrackVar(this, "'+variable+'")');

	const span = document.createElement('span');
	span.innerText = variable+' ('+unit+')';

	const button = trackedVars.children[trackedVars.children.length-1];
	button.remove();

	trackedVars.appendChild(checkbox);
	trackedVars.appendChild(span);
	trackedVars.appendChild(document.createElement('br'));
	trackedVars.appendChild(button);
}

function untrackVar(node, variable) {
	node.nextElementSibling.nextElementSibling.remove();
	delete trackingVars[variable];
	node.nextElementSibling.remove();
	node.remove();
}

function addRun(trackingVars) {
	const radio = document.createElement('input');
	radio.type = 'radio';
	radio.checked = true;
	radio.onclick = Function('showRun(this, '+run+')');

	const span = document.createElement('span');
	span.innerText = run;

	simulationRuns.appendChild(radio);
	simulationRuns.appendChild(span);
	simulationRuns.appendChild(document.createElement('br'));

	runs[run] = JSON.parse(JSON.stringify(trackingVars));

	showRun(radio, run++);
}

function showRun(radio, runToShow) {
	if(radio.checked === false) return;

	selectedRun = runToShow;

	for(let i = 0; i < simulationRuns.children.length; i++) {
		const node = simulationRuns.children[i];
		if(node.type === 'radio' && node.nextElementSibling.innerText !== runToShow.toString()) {
			node.checked = false;
		}
	}

	function deleteChildren(element) {
		for(let i = element.children.length-1; i >= 2; i--) {
			element.children[i].remove();
		}
	}
	deleteChildren(displayVarX);
	deleteChildren(displayVarY);

	function createDisplayVars(element, axis) {
		for(let i = 0; i < dataArray.length; i++) {
			const radio = document.createElement('input');
			radio.type = 'radio';
			if((axis === 'x' && i === 0) || (axis === 'y' && i === 1)) radio.checked = true;
			radio.onclick = Function('displayVar("'+axis+'", "'+dataArray[i][0]+'")');

			const span = document.createElement('span');
			span.innerText = dataArray[i][0]+' ('+dataArray[i][1].unit+')';

			element.appendChild(radio);
			element.appendChild(span);
			element.appendChild(document.createElement('br'));
		}
	}
	const dataArray = Object.entries(runs[runToShow]);
	createDisplayVars(displayVarX, 'x');
	createDisplayVars(displayVarY, 'y');

	plot.data.datasets[0].data = [];
	plot.data.datasets[0].label = '';

	displayVar('x', dataArray[0][0], false);
	displayVar('y', dataArray[1][0]);
}

function displayVar(axis, variable, updatePlot = true) {
	let element = displayVarY;
	if(axis === 'x') element = displayVarX;

	const data = runs[selectedRun];

	for(let i = 0; i < element.children.length; i++) {
		const node = element.children[i];
		if(node.type === 'radio' && node.nextElementSibling.innerText !== variable+' ('+data[variable].unit+')') {
			node.checked = false;
		}
	}

	plot.options.scales[axis].title.text = variable+' ('+data[variable].unit+')';
	for(let i = 0; i < data[variable].data.length; i++) {
		if(plot.data.datasets[0].data[i] === undefined) plot.data.datasets[0].data[i] = {x: 0, y: 0};
		plot.data.datasets[0].data[i][axis] = data[variable].data[i];
		if(axis === 'y') plot.data.datasets[0].label = variable;
	}

	if(updatePlot === true) plot.update();
}