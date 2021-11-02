//import logo from './logo.svg';
import "./App.scss";
import { useState } from "react";

import WorkFlowDesigner from "./components/WorkFlowDesigner";

const inititalSteps = [
    // {
    //     id: "1s",
    //     title: "Step1",
    // },
    // {
    //     id: "2s",
    //     title: "Step2",
    // },
];

const initialConnections = [
    // {
    //     id: "1c",
    //     startNode: undefined,
    //     endNode: undefined,
    //     x1: 0,
    //     y1: 0,
    //     x2: 160,
    //     y2: 200,
    // },
];

const initialState = {
    eventVars: {
        mouseX: 0,
        mouseY: 0,
    },
    newConnection: undefined,
    steps: inititalSteps,
    connections: initialConnections,
};

function App() {
    const [state, setState] = useState(initialState);

    const handleAddStep = (newStep) => {
        setState((prev) => ({ ...prev, steps: prev.steps.concat(newStep) }));
    };

    const handleAddConnection = (newConnection) => {
        setState((prev) => ({
            ...prev,
            connections: prev.connections.concat(newConnection),
        }));
    };

    const handleUpdateConnections = (newConnections) => {
        setState((prev) => ({ ...prev, connections: newConnections }));
    };

    return (
        <div className="app">
            <WorkFlowDesigner
                designerState={state}
                onAddStep={handleAddStep}
                onAddConnection={handleAddConnection}
                onUpdateConnections={handleUpdateConnections}
            />
        </div>
    );
}

export default App;
