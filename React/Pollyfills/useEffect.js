import { useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const [state, setState] = useState(0);
  const [state2, setState2] = useState(2);

// Need to simulate componentDidUnMount --> cleanUp of Empty Dependency  
  function useCustomUseEffect(fun, deps) {
    const isMounted = useRef(false);
    const prev = useRef();
    const prevCleanUp = useRef();
    const mountCleanUp = useRef()

    if (!isMounted.current) {
      prev.current = deps ? [...deps] : null;
      mountCleanUp.current = fun();
      isMounted.current = true;
    } else if (Array.isArray(deps)) {
      if (deps.length) {
        if (prev.current) {
          const res = prev.current.every((item, index) => {
            return item == deps[index];
          });
          if (!res) {
            if(typeof prevCleanUp.current == 'function')
            prevCleanUp.current();
            prevCleanUp.current = fun();
            prev.current = [...deps];
          }
        }
      }
    } else {
      prevCleanUp.current();
      prevCleanUp.current = fun();
    }
  }

  function test() {
    console.log("Hello", state, state2);
    return () => {
      console.log("Chatkila", state, state2);
    };
  }
  useCustomUseEffect(test, [state]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <p>
        {state} {state2}
      </p>

      <button onClick={() => setState(state + 1)}>Increment</button>
      <button onClick={() => setState2(state2 + 1)}>Increment</button>
    </div>
  );
}
