//import logo from './logo.svg';
import "./App.scss";
//import { useHotKey } from './components/hooks/useHotKey';
import { useRef, useEffect, useState } from "react";

import PipelineStep from "./components/PipelineStep";
import PipelineConnection from "./components/PipelineConnection";

const initialState = {
  eventVars: {
    mouseX: 0,
    mouseY: 0,
    connections: [],
  },
};

function App() {
  const [state, setState] = useState(initialState);
  const [connection, setConnection] = useState({
    x1: 0,
    y1: 0,
    x2: -1,
    y2: -1,
  });

  const connectionStart = (pos) => {
    setConnection((prev) => ({ ...prev, x1: pos.x, x2: pos.y }));
    console.log("This is start of connection")
  };

  const connectionUpdate = (pos) => {
    setConnection((prev) => ({ ...prev, x2: pos.x, y2: pos.y }));
    console.log(connection)
  };

  const onPipelineStepsOuterHolderDown = (e) => {
    // console.log("Down",e.clientX,e.clientY)

    setState((prev) => {
      return {
        ...prev,
        eventVars: {
          ...prev.eventVars,
          mouseX: e.mouseClientX,
          mouseY: e.mouseClientY,
        },
      };
    });
  };

  const onPipelineStepsOuterHolderMove = (e) => {
    // console.log("Move",e.clientX,e.clientY)
  };

  const connectionComponents = state.eventVars.connections.map(
    (connection, index) => {
      return <PipelineConnection key={index} {...connection} />;
    }
  );

  return (
    <div className="pipeline-view">
      <div
        className="pipeline-steps-outer-holder"
        onMouseDown={onPipelineStepsOuterHolderDown}
        onMouseMove={onPipelineStepsOuterHolderMove}
      >
        <PipelineStep title="Step1" onDragStart={connectionStart} onDragMove={connectionUpdate}/>
        <PipelineStep title="Step2" onDragStart={connectionStart} onDragMove={connectionUpdate}/>
        <PipelineConnection x1={50} y1={10} x2={100} y2={100} />

        {connection.x2 != -1 ? (
          <PipelineConnection x1={connection.x1} y1={connection.y1} x2={connection.x2} y2={connection.y2} />
        ) : null}
        {/* <div className="connections">{connectionComponents}</div> */}
        {/* <svg width="500" height="500"><line x1="50" y1="50" x2="350" y2="50" stroke="red"/></svg>
      <svg>
        <path stroke="black" stroke-width="2" fill="none" id="path" d="M 5 5 C 200 5 181 209 357 209"></path>
       
        </svg> */}
      </div>
    </div>
  );
}

export default App;
