using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CircuitSimulation {
    public class Wire {
        bool _isHigh;
        readonly List<Action> _actions = new List<Action>();

        public void SetHigh() {
            _isHigh = true;
            RunActions();
        }

        private void RunActions() {
            foreach(var action in _actions) {
                action();
            }
        }

        public bool IsHigh {
            get {
                return _isHigh;
            }
        }

        public void AddAction(Action act) {
            _actions.Add(act);
        }

        public void SetLow() {
            _isHigh = false;
            RunActions();
        }
    }
}
