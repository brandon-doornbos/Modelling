const M = 3;
const L = 5;
const x0 = 0.1;
const v0 = 0;
const g = 9.81;

let x = x0;
let v = v0;
let t = 0;
const dt = 0.1;

function iterate() {
	if(x > L) return;

	let m = M/L * x;
	let F = m * g;
	let a = F/M;
	v += a * dt;
	x += v * dt;
	t += dt;

	return {
		'xAxis': {
			't': t
		},
		'yAxis': {
			'x': x,
			'v': v
		}
	};
}