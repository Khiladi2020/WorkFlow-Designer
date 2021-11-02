//import logo from './logo.svg';
import "./App.scss";
//import { useHotKey } from './components/hooks/useHotKey';
import { useRef, useEffect, useState } from "react";
import { Button } from "@material-ui/core";

import PipelineStep from "./components/PipelineStep";
import PipelineConnection from "./components/PipelineConnection";

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
    // pipeline
    const [offsets, setOffsets] = useState({});
    const pipeLineContainerRef = useRef(null);

    const [connection, setConnection] = useState({
        active: false,
        startNode: undefined,
        x1: 0,
        y1: 0,
        x2: -1,
        y2: -1,
    });

    // get Offset position of pipeline steps container
    useEffect(() => {
        const coords = pipeLineContainerRef.current.getBoundingClientRect();
        setOffsets({ x: coords.x, y: coords.y });
        console.log("offset pos for pipeline container", coords);
    }, []);

    // const createConnection = (outgoingNode, incomingNode) => {
    //     let newConnection = {
    //         startNode: outgoingNode,
    //         endNode: incomingNode,
    //         xEnd: undefined,
    //         yEnd: undefined,
    //     };

    //     if (incomingNode)
    //         setState((prev) => ({
    //             ...prev,
    //             connections: prev.connections.concat(newConnection),
    //         }));
    //     else {
    //         // initialize newConnection in state
    //         setState((prev) => ({ ...prev, newConnection: newConnection }));
    //     }
    // };

    const resolveOffsets = (pos) => {
        // this function subtracts the offsets from mouse pointer position
        // as container might not be at top:0 left:0 position always so this function
        // subtracts the space btw page top and container top and same for left side
        return { x: pos.x - offsets.x, y: pos.y - offsets.y };
    };

    const connectionStart = (outgoingNode, pos) => {
        pos = resolveOffsets(pos);
        // createConnection(outgoingNode, undefined);
        console.log("received start position", pos);
        setConnection({
            x1: pos.x,
            y1: pos.y,
            x2: pos.x,
            y2: pos.y,
            startNode: outgoingNode,
        });
        console.log("This is start of connection");

        // setting connection state active
        setConnection((prev) => ({
            ...prev,
            active: true,
        }));
    };

    const connectionComplete = (endNode) => {
        // this function adds the completed connection to the main state
        if (true) {
            console.log("adding new connection");
            let newConnection = {
                ...connection,
                id: `${state.connections.length + 1}c`,
                endNode: endNode,
            };
            setState((prev) => ({
                ...prev,
                connections: prev.connections.concat(newConnection),
            }));
        }
    };

    const updateConnectionsOnStepMove = (id, incomingPos, outgoingPos) => {
        console.log("Before Offsets", incomingPos, outgoingPos);
        incomingPos = resolveOffsets(incomingPos);
        outgoingPos = resolveOffsets(outgoingPos);
        console.log("After Offsets", incomingPos, outgoingPos);
        let newConnections = state.connections.map((value) => {
            let val = Object.assign({}, value);

            if (val.startNode === id) {
                val.x1 = outgoingPos.x;
                val.y1 = outgoingPos.y;
            } else if (val.endNode === id) {
                val.x2 = incomingPos.x;
                val.y2 = incomingPos.y;
            }

            return val;
        });

        setState((prev) => ({ ...prev, connections: newConnections }));
    };

    const onPipelineStepsContainerDown = (e) => {
        // this function tracks the mouse movement on the container
        console.log("Pipe Holder: Mouse Down", e.clientX, e.clientY);

        // disabling active state of connection on click
        if (connection.active)
            setConnection((prev) => ({
                ...prev,
                active: false,
            }));
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

    const onPipelineStepsContainerMove = (e) => {
        // console.log("Move", e.clientX, e.clientY);
        let pos = resolveOffsets({ x: e.clientX, y: e.clientY });
        // console.log('Move After',pos)
        if (connection.active) {
            setConnection((prev) => ({
                ...prev,
                x2: pos.x,
                y2: pos.y,
            }));
        }
    };

    const onPipelineStepsContainerUp = (e) => {
        console.log("Pipe Holder: Mouse Up", e.clientX, e.clientY);
        // setConnection((prev) => ({ ...prev, active: false }));
    };

    const stepComponents = state.steps.map((step, index) => {
        return (
            <PipelineStep
                key={index}
                title={step.title}
                id={step.id}
                onConnStart={connectionStart}
                onConnEnd={connectionComplete}
                onStepDrag={updateConnectionsOnStepMove}
            />
        );
    });

    const connectionComponents = state.connections.map((connection, index) => {
        return <PipelineConnection key={index} {...connection} />;
    });

    const addNewStep = () => {
        let stepName = prompt(
            "Enter Step name",
            `Step ${state.steps.length + 1}`
        );
        let newStep = {
            id: `${state.steps.length + 1}s`,
            title: stepName,
        };
        setState((prev) => ({ ...prev, steps: prev.steps.concat(newStep) }));
    };

    return (
        <div className="app">
            <div className="pipeline-actions">
                <Button
                    variant="contained"
                    onClick={addNewStep}
                    color="primary"
                >
                    Add Step
                </Button>
            </div>
            <div
                className="pipeline-view"
                ref={pipeLineContainerRef}
                onMouseDown={onPipelineStepsContainerDown}
                onMouseMove={onPipelineStepsContainerMove}
                onMouseUp={onPipelineStepsContainerUp}
            >
                <div className="steps">{stepComponents}</div>
                <div className="connections">
                    {connectionComponents}
                    {connection.active && (
                        <PipelineConnection
                            x1={connection.x1}
                            y1={connection.y1}
                            x2={connection.x2}
                            y2={connection.y2}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
