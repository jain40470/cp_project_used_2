import LadderA from "./Components/LaddersA";
import Compiler from "./Components/compiler";
import React from "react";
import { useState } from "react";

import "./App.css";
import Home from "./Components/Home";
import Cfvis from "./Components/Cfvis";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <button
          onClick={() => {
            setCount(0);
          }}
        >
          Home
        </button>
        <button
          onClick={() => {
            setCount(1);
          }}
        >
          {" "}
          Compiler{" "}
        </button>
        <button
          onClick={() => {
            setCount(2);
          }}
        >
          {" "}
          Ladder{" "}
        </button>

        <button
          onClick={() => {
            setCount(3);
          }}
        >
          {" "}
          Cf Visualizer{" "}
        </button>

        <button> Services </button>
      </div>

      <br />

      <div>
        {count === 0 && <Home />}
        {count === 1 && <Compiler />}
        {count === 2 && <LadderA />}
        {count === 3 && <Cfvis />}
      </div>
    </>
  );
}

export default App;
