import { useRef } from "react";
import { Box, Typography } from "@material-ui/core";
import Draggable from "react-draggable";

const DefaultDisplayComponent = (props) => {
    return (
        <Box
            flexGrow={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Typography align="center">{props.title}</Typography>
        </Box>
    );
};

const PipelineStep = (props) => {
    const incomingConnRef = useRef(null);
    const outgoingConnRef = useRef(null);
    const stepRef = useRef(null);

    const connectorBoxSize = props.connectorBoxSize || 10;
    const connOffset = connectorBoxSize / 2;

    const DisplayComponent = props.displayComponent
        ? props.displayComponent
        : DefaultDisplayComponent;

    const handleOutgoingMouseDown = (e) => {
        if (props.readOnly) {
            console.log("aborting connection start, ReadOnly Mode");
            return;
        }
        console.log(e.clientX, " ", e.clientY);
        let { x, y } = outgoingConnRef.current.getBoundingClientRect();
        props.onConnStart(props.id, { x: x + connOffset, y: y + connOffset });
    };

    const handleIncomingMouseDown = (e) => {
        if (props.readOnly) {
            console.log("aborting connection end, ReadOnly Mode");
            return;
        }
        console.log("End Position: Mouse Up", props.id);
        console.log(e.clientX, " ", e.clientY);
        props.onConnEnd(props.id);
    };

    const handleStepDrag = () => {
        console.log("Step is being dragged, Id:", props.id);
        let positionIn = incomingConnRef.current.getBoundingClientRect();
        let positionOut = outgoingConnRef.current.getBoundingClientRect();
        // this variable make the connection in center of the connector box

        props.onStepDrag(
            props.id,
            { x: positionIn.x + connOffset, y: positionIn.y + connOffset },
            { x: positionOut.x + connOffset, y: positionOut.y + connOffset }
        );
    };

    const handleUpdateStepPosition = () => {
        const stepCurrPos = stepRef.current.getBoundingClientRect();

        props.onUpdateStepPos(props.id, { x: stepCurrPos.x, y: stepCurrPos.y });
    };

    console.log(props.displayComponent);

    return (
        <Draggable
            handle=".drag"
            defaultPosition={{ x: props.pos.x, y: props.pos.y }}
            position={null}
            grid={[25, 25]}
            scale={1}
            disabled={props.readOnly}
            onStart={() => {
                handleStepDrag();
                handleUpdateStepPosition();
                // let { x, y } = outgoingConnRef.current.getBoundingClientRect();
                // props.onDragStart({ x, y });
            }}
            onDrag={(e) => {
                // console.log('drag elem',e)
                // let { x, y } = outgoingConnRef.current.getBoundingClientRect();
                handleStepDrag();
                handleUpdateStepPosition();
                // props.onDragMove({ x, y });
            }}
            onStop={() => {
                handleStepDrag();
                handleUpdateStepPosition();
            }}
        >
            <Box
                display="flex"
                alignItems="center"
                className="pipeline-step"
                ref={stepRef}
            >
                <Box
                    className="incoming-connection"
                    onMouseDown={handleIncomingMouseDown}
                    height={connectorBoxSize}
                    width={connectorBoxSize}
                    bgcolor="black"
                    ref={incomingConnRef}
                    borderRadius="50%"
                    sx={{
                        transform: `translateX(${connectorBoxSize / 2}px)`,
                    }}
                ></Box>
                <Box
                    height={100}
                    width={150}
                    bgcolor="white"
                    color="black"
                    display="flex"
                    className="drag"
                    border="1px solid grey"
                    borderRadius="10px"
                    overflow="hidden"
                >
                    <DisplayComponent {...props} />
                </Box>
                <Box
                    className="outgoing-connection"
                    onMouseDown={handleOutgoingMouseDown}
                    height={connectorBoxSize}
                    width={connectorBoxSize}
                    ref={outgoingConnRef}
                    bgcolor="black"
                    borderRadius="50%"
                    sx={{
                        transform: `translateX(${-connectorBoxSize / 2}px)`,
                    }}
                ></Box>
            </Box>
        </Draggable>
    );
};

export default PipelineStep;
