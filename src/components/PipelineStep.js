import { useRef } from "react";
import { Box, Typography } from "@material-ui/core";
import Draggable from "react-draggable";

const PipelineStep = ({ title, ...props }) => {
  const incomingConnRef = useRef(null);
  const outgoingConnRef = useRef(null)

  const handleOutgoingMouseDown = (e) => {
    console.log(e.clientX, " ", e.clientY);
    let { x, y } = outgoingConnRef.current.getBoundingClientRect();
    props.onConnStart(props.id,{x,y})
  };

  const handleIncomingMouseDown = (e) => {
    console.log("End Position: Mouse Up",props.id);
    console.log(e.clientX, " ", e.clientY);
    props.onConnEnd(props.id)
  };

  return (
    <Draggable
      handle=".drag"
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      grid={[25, 25]}
      scale={1}
      onStart={() => {
        let { x, y } = outgoingConnRef.current.getBoundingClientRect();
        // props.onDragStart({ x, y });
      }}
      onDrag={(e) => {
        // console.log('drag elem',e)
        let { x, y } = outgoingConnRef.current.getBoundingClientRect();
        // props.onDragMove({ x, y });
      }}
    >
      <Box display="flex" alignItems="center" className="pipeline-step">
        <Box
          className="incoming-connection"
          onMouseDown={handleIncomingMouseDown}
          height={8}
          width={8}
          bgcolor="black"
          ref={incomingConnRef}
        ></Box>
        <Box
          height={100}
          width={100}
          bgcolor="red"
          color="white"
          display="flex"
          alignItems="center"
          className="drag"
        >
          <Box flexGrow={1}>
            <Typography align="center">{title}</Typography>
          </Box>
        </Box>
        <Box
          className="outgoing-connection"
          onMouseDown={handleOutgoingMouseDown}
          height={8}
          width={8}
          ref={outgoingConnRef}
          bgcolor="black"
        ></Box>
      </Box>
    </Draggable>
  );
};

export default PipelineStep;
