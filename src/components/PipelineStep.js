import { useRef } from "react";
import { Box, Typography } from "@material-ui/core";
import Draggable from "react-draggable";

const PipelineStep = ({ title, ...props }) => {
  const connectionPointRef = useRef(null);

  const handleMouseDown = (e) => {
    console.log(e.clientX, " ", e.clientY);
  };

  const handleMouseUp = (e) => {
    console.log("End Position");
    console.log(e.clientX, " ", e.clientY);
  };

  return (
    <Draggable
      handle=".drag"
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      grid={[25, 25]}
      scale={1}
      onStart={()=> {
        let {x,y} = connectionPointRef.current.getBoundingClientRect()
        props.onDragStart({x,y})
        }
      }
      onDrag={(e) => {
        // console.log('drag elem',e)
        let {x,y} = connectionPointRef.current.getBoundingClientRect()
        props.onDragMove({x,y})
      }}
    >
      <Box
        height={100}
        width={100}
        bgcolor="red"
        color="white"
        display="flex"
        alignItems="center"
        margin={2}
        className="drag"
      >
        <Box
          className="incoming-connection"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          height={8}
          width={8}
          ref={connectionPointRef}
          bgcolor="black"
        ></Box>
        <Box flexGrow={1}>
          <Typography align="center">{title}</Typography>
        </Box>
        <Box
          className="outgoing-connection"
          height={8}
          width={8}
          bgcolor="black"
        ></Box>
      </Box>
    </Draggable>
  );
};

export default PipelineStep;
