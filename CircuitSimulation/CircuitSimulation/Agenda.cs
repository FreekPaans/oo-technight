using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CircuitSimulation {
    public class Agenda {
        Agenda() {}

        static Agenda _instance = new Agenda();

        public static Agenda Instance {
            get {
                return _instance;
            }
        }
    }
}
