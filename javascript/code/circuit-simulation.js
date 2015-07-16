console.log("loading circuit-simulation.js")

var Wire = function() {
	var signal = 0;

	var setSignal = function(value) {
		value = value?1:0;
		signal = value;
		actions.forEach(function(action) {
			action();
		});
	}

	var actions = [];

	var addAction = function(action) {
		actions.push(action)
		action()
	}

	return function(op) {
		switch(op) {
			case "set-signal":
				setSignal(arguments[1])
				return;
			case "get-signal":
				return signal;
			case "add-action":
				addAction(arguments[1])
				return;
			case "set-high":
				setSignal(1);
				return;
			default:
				throw Error("Unknown msg "+op)

		}
	};
}

var OrGate = function(in1, in2, out) {
	var handleChange = function() {
		out("set-signal", in1("get-signal") || in2("get-signal"))
	}

	in1("add-action", handleChange)
	in2("add-action", handleChange)
	return function() {};
}

var AndGate = function(in1, in2, out) {
	var handleChange = function() {
		out("set-signal", in1("get-signal") && in2("get-signal"))
	}

	in1("add-action", handleChange)
	in2("add-action", handleChange)
	return function() {};
}

var Inverter = function(inp, out) {
	inp("add-action", function() {
		out("set-signal", !inp("get-signal"))
	});
}

var HalfAdder = function(A, B, S, C) {
	var D = Wire();
	var E = Wire();
	Probe("E", E)
	Probe("D", D)
	OrGate(A, B, D);
	AndGate(A,B, C);
	Inverter(C, E);
	AndGate(D, E, S);
}

var Probe = function(name,wire) {
	wire("add-action", function() {
		console.log(name + " = " + wire("get-signal"))
	})
}

module.exports.Wire = Wire;
module.exports.OrGate = OrGate;
module.exports.HalfAdder = HalfAdder;
module.exports.Probe = Probe;
