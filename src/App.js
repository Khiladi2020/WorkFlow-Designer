//import logo from './logo.svg';
import "./App.scss";
import { useState } from "react";

import WorkFlowDesigner from "./components/WorkFlowDesigner";
import { Box, Typography } from "@material-ui/core";

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
    readOnly: false,
};

// initialState Server
const initialState1 = {
    eventVars: {mouseX: 0, mouseY: 0},
    steps: [
        {
            id: "1s",
            title: "Step 1",
            pos: {x: 125, y: 175},
        },
        {
            id: "2s",
            title: "Step 2",
            pos: {x: 775, y: 125},
        },
        {
            id: "3s",
            title: "Step 3",
            pos: {x: 500, y: 25},
        },
        {
            id: "4s",
            title: "Step 4",
            pos: {x: 500, y: 175},
        },
        {
            id: "5s",
            title: "Step 5",
            pos: {x: 500, y: 325},
        },
        {
            id: "6s",
            title: "Step 6",
            pos: {x: 1000, y: 275},
        },
        {
            id: "7s",
            title: "Step 7",
            pos: {x: 1225, y: 100},
        },
    ],
    connections: [
        {
            x1: 287,
            y1: 226,
            x2: 510,
            y2: 76,
            startNode: "1s",
            active: true,
            id: "1c",
            endNode: "3s",
        },
        {
            x1: 662,
            y1: 76,
            x2: 785,
            y2: 176,
            startNode: "3s",
            active: true,
            id: "2c",
            endNode: "2s",
        },
        {
            x1: 287,
            y1: 226,
            x2: 510,
            y2: 226,
            startNode: "1s",
            active: true,
            id: "3c",
            endNode: "4s",
        },
        {
            x1: 287,
            y1: 226,
            x2: 510,
            y2: 376,
            startNode: "1s",
            active: true,
            id: "4c",
            endNode: "5s",
        },
        {
            x1: 662,
            y1: 376,
            x2: 1010,
            y2: 326,
            startNode: "5s",
            active: true,
            id: "5c",
            endNode: "6s",
        },
        {
            x1: 662,
            y1: 226,
            x2: 785,
            y2: 176,
            startNode: "4s",
            active: true,
            id: "6c",
            endNode: "2s",
        },
        {
            x1: 1162,
            y1: 326,
            x2: 1235,
            y2: 151,
            startNode: "6s",
            active: true,
            id: "7c",
            endNode: "7s",
        },
        {
            x1: 937,
            y1: 176,
            x2: 1235,
            y2: 151,
            startNode: "2s",
            active: true,
            id: "8c",
            endNode: "7s",
        },
        {
            x1: 937,
            y1: 176,
            x2: 1010,
            y2: 326,
            startNode: "2s",
            active: true,
            id: "9c",
            endNode: "6s",
        },
    ],
    readOnly: true,
};

const StepComponent = (props) => {
    return (
        <Box flexGrow={1} display="flex" flexDirection="column">
            <Box
                flexGrow={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Typography align="center">{props.title}</Typography>
            </Box>
            <Box bgcolor="#E0E0E0">
                <Typography align="center">Ready</Typography>
            </Box>
        </Box>
    );
};

function App() {
    const [state, setState] = useState(initialState);

    const handleAddStep = (newStep) => {
        setState((prev) => ({ ...prev, steps: prev.steps.concat(newStep) }));
    };

    const handleUpdateStepPos = (newSteps) => {
        setState((prev) => ({
            ...prev,
            steps: newSteps,
        }));
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
                onUpdateStepPos={handleUpdateStepPos}
                readOnly={state.readOnly}
                // stepComponent={StepComponent}
            />
        </div>
    );
}

export default App;
