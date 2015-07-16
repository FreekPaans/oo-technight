using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CircuitSimulation {
    public class OrGate {
        public OrGate(Wire in1,Wire in2,Wire @out) {
            Action a = ()=>{
                if(in1.IsHigh || in2.IsHigh) {
                    @out.SetHigh();
                }
                else {
                    @out.SetLow();
                }
            };
            in1.AddAction(a);
            in2.AddAction(a);
        }
    }
}
