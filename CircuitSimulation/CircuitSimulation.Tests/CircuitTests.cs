using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CircuitSimulation.Tests {
    [TestClass]
    public class CircuitTests {
        private Agenda _agenda;

        
        [TestMethod]
        public void test_or_gate_in1_high() {
            var @out = SetupOrGate(afterOrInit:(in1,in2) => {
                in1.SetHigh();
            });

            AssertIsHigh(@out, "Or output should be high if in1 is high");
        }

        [TestMethod]
        public void test_or_gate_in2_high() {
            var @out = SetupOrGate(afterOrInit:(in1,in2) => {
                in2.SetHigh();
            });

            AssertIsHigh(@out, "Or output should be high if in2 is high");
        }

        [TestMethod]
        public void test_or_gate_in1_high_then_low() {
            var @out = SetupOrGate(afterOrInit:(in1,in2) => {
                in1.SetHigh();
                in1.SetLow();
            });

            AssertIsLow(@out, "Or output should be low if in1 and in2 are both low");
        }

        [TestMethod]
        public void test_new_wire_is_low() {
            var wire = new Wire();
            
            AssertIsLow(wire, "a new wire should be low");
        }

        [TestMethod]
        public void test_setting_a_wire_to_high_should_result_in_the_wire_being_high() {
            var wire = new Wire();
            wire.SetHigh();

            AssertIsHigh(wire, "wire not high after setting it to high");
        }

        [TestMethod]
        public void test_or_gate_delay() {
            var @out = SetupOrGate(afterOrInit:(in1,in2) => {
                in1.SetHigh();
            });

            AssertIsHigh(@out, "Or output should be high if in1 is high");
        }

        private void AssertIsLow(Wire wire,string msg) {
            Assert.IsFalse(@wire.IsHigh, "Wire is high. " + msg);
        }

        private void AssertIsHigh(Wire wire, string msg) {
            Assert.IsTrue(@wire.IsHigh, "Wire is low. " + msg);
        }

        private static Wire SetupOrGate(Action<Wire,Wire> initWires=null,Action<Wire,Wire> afterOrInit=null) {
            var in1 = new Wire();
            var in2 = new Wire();
            var @out = new Wire();

            if(initWires!=null) {
                initWires(in1,in2);
            }

            new OrGate(in1,in2,@out);

            if(afterOrInit!=null) {
                afterOrInit(in1,in2);
            }

            return @out;
        }

        [TestInitialize]
        public void Init() {
            _agenda = new Agenda();
        }
    }
}
