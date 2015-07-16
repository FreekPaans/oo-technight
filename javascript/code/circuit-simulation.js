console.log("loading circuit-simulation.js")

var Wire = function() {
	return function(op) {
		switch(op) {
			default:
				throw Error("Unknown msg "+op)

		}
	};
}

var OrGate = function(in1, in2, out) {
	return function() {};
}

var AndGate = function(in1, in2, out) {
	return function() {};
}

var Inverter = function(inp, out) {
	return function() {};
}

var HalfAdder = function(A, B, S, C) {
	var D = Wire();
	var E = Wire();
	OrGate(A, B, D);
	AndGate(A,B, C);
	Inverter(C, E);
	AndGate(D, E, S);
}

module.exports.Wire = Wire;
module.exports.OrGate = OrGate;
module.exports.HalfAdder = HalfAdder;
