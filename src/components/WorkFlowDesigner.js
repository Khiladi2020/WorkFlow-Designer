import { useRef, useEffect, useState } from "react";
import { Button } from "@material-ui/core";

import "./WorkFlowDesigner.css"
import PipelineStep from "./PipelineStep";
import PipelineConnection from "./PipelineConnection";

function WorkFlowDesigner(props) {
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
            active: true,
        });
        console.log("This is start of connection");

        // setting connection state active
        setConnection((prev) => ({
            ...prev,
            active: true,
        }));
    };

    // connection checks
    const checkDuplicateConnection = (conn) => {
        return props.designerState.connections.some(
            (val) =>
                val.startNode === conn.startNode && val.endNode === conn.endNode
        );
    };

    const checkSelfConnection = (conn) => {
        return conn.startNode === conn.endNode;
    };

    const connectionComplete = (endNode) => {
        // this function adds the completed connection to the main state
        if (connection.active) {
            let isValid = true;
            let newConnection = {
                ...connection,
                id: `${props.designerState.connections.length + 1}c`,
                endNode: endNode,
            };
            if (checkDuplicateConnection(newConnection)) {
                isValid = false;
                alert("Duplicate Connections are not allowed");
            } else if (checkSelfConnection(newConnection)) {
                isValid = false;
                alert("Self Connections are not allowed");
            }

            if (isValid) {
                console.log("adding new connection");
                props.onAddConnection(newConnection);
            }
        }
    };

    const updateConnectionsOnStepMove = (id, incomingPos, outgoingPos) => {
        console.log("Before Offsets", incomingPos, outgoingPos);
        incomingPos = resolveOffsets(incomingPos);
        outgoingPos = resolveOffsets(outgoingPos);
        console.log("After Offsets", incomingPos, outgoingPos);
        let newConnections = props.designerState.connections.map((value) => {
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

        props.onUpdateConnections(newConnections);
    };

    const updateStepPosition = (id, newPos) => {
        newPos = resolveOffsets(newPos);

        let newSteps = props.designerState.steps.map((value) => {
            let val = Object.assign({}, value);
            if (val.id === id) val.pos = newPos;

            return val;
        });
        props.onUpdateStepPos(newSteps)
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

        // setState((prev) => {
        //     return {
        //         ...prev,
        //         eventVars: {
        //             ...prev.eventVars,
        //             mouseX: e.mouseClientX,
        //             mouseY: e.mouseClientY,
        //         },
        //     };
        // });
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

    const stepComponents = props.designerState.steps.map((step, index) => {
        return (
            <PipelineStep
                key={index}
                title={step.title}
                id={step.id}
                pos={step.pos}
                onConnStart={connectionStart}
                onConnEnd={connectionComplete}
                onStepDrag={updateConnectionsOnStepMove}
                onUpdateStepPos={updateStepPosition}
                readOnly={props.readOnly ? props.readOnly : false}
                displayComponent={props.stepComponent}
            />
        );
    });

    const connectionComponents = props.designerState.connections.map(
        (connection, index) => {
            return <PipelineConnection key={index} {...connection} />;
        }
    );

    const addNewStep = () => {
        let stepName = prompt(
            "Enter Step name",
            `Step ${props.designerState.steps.length + 1}`
        );
        let newStep = {
            id: `${props.designerState.steps.length + 1}s`,
            title: stepName,
            pos: {
                x: 0,
                y: 0,
            },
        };
        props.onAddStep(newStep);
    };

    return (
        <div className="app">
            {!props.readOnly && (
                <div className="pipeline-actions">
                    <Button
                        variant="contained"
                        onClick={addNewStep}
                        color="primary"
                    >
                        Add Step
                    </Button>
                </div>
            )}
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

export default WorkFlowDesigner;
