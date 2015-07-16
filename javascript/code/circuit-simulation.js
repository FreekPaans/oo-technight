console.log("loading circuit-simulation.js")

module.exports.Wire = function() {
	var signal = 0;

	var actions = [];

	var addAction = function(action) {
		actions.push(action)
	}

	var setHigh = function() {
		signal = 1;
		actions.forEach(function(action) {
			action();
		})
	}

	return function(op) {
		switch(op) {
			case "set-high":
				setHigh();
				return;
			case "get-signal":
				return signal;
			case "add-action":
				addAction(arguments[1])
				return;
			default:
				throw Error("Unknown msg "+op)

		}
	};
}

module.exports.OrGate = function(in1, in2, out) {
	var onChange = function() {
		if(in1("get-signal") || in2("get-signal")) {
			out("set-high")
		}
	}
	in1("add-action", onChange)
	in2("add-action", onChange)
	return function() {};
}