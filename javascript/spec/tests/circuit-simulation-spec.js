var circuit = require('../../code/circuit-simulation.js');

var Wire = circuit.Wire;
var OrGate=  circuit.OrGate;
var HalfAdder = circuit.HalfAdder;
var Probe = circuit.Probe;

describe("an half adder", function() {
	var inA,inB,outS,outC;
	
	beforeEach(function() {
		inA = Wire();
		inB = Wire();
		outS = Wire();
		outC = Wire();
		Probe("A", inA)
		Probe("B", inB)
		Probe("outS", outS)
		Probe("outC", outC)
		HalfAdder(inA, inB, outS, outC);
		
	})

	var truthTable = [
	  // A B C S
		// [0,0,0,0],
		// [0,1,0,1],
		// [1,0,0,1],
		[1,1,1,0],
	]

	truthTable.forEach(function(row) {
		it(JSON.stringify(row), function() {
			console.log(row)
			inA("set-signal", row[0]);
			inB("set-signal", row[1]);
			expect(outC("get-signal")).toBe(row[2], "C");
			expect(outS("get-signal")).toBe(row[3], "S");
			
		});
	})


})


describe("a wire", function() {
	it("should start low", function() {
		var wire = Wire();
		expect(wire("get-signal")).toBe(0)
	})
})

describe("an OR gate", function() {
	var in1,in2,out;
	describe("when in1 and in2 start low", function() {
		beforeEach(function() {
			in1 = Wire("in1");
			in2 = Wire("in2");
			out = Wire();
			OrGate(in1,in2,out);
		});

		it("should start with out low", function() {
			expect(out("get-signal")).toBe(0)
		})

		describe("when in1 becomes high", function() {
			beforeEach(function() {
				in1("set-high")
			})

			it("the output should become high", function() {
				expect(out("get-signal")).toBe(1)
			})
		});

		describe("when in2 becomes high", function() {
			beforeEach(function() {
				in2("set-high")
			})

			it("the output should become high", function() {
				expect(out("get-signal")).toBe(1)
			})
		});
	});
});