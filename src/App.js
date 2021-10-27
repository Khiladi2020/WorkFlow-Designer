//import logo from './logo.svg';
import "./App.scss";
//import { useHotKey } from './components/hooks/useHotKey';
import { Box, Typography } from "@material-ui/core";
import Draggable from "react-draggable";
import { useRef, useEffect } from 'react';

function App() {
  return (
    <div className="pipeline-view">
      <Step title="Step1"/>
      <Step title="Step2"/>
      <Connection x1={10} y1={10} x2={200} y2={200} />
      {/* <svg width="500" height="500"><line x1="50" y1="50" x2="350" y2="50" stroke="red"/></svg>
      <svg>
        <path stroke="black" stroke-width="2" fill="none" id="path" d="M 5 5 C 200 5 181 209 357 209"></path>
       
        </svg> */}
    </div>
  );
}

const Step = ({title}) => {
  return <Draggable
  handle=".drag"
  defaultPosition={{ x: 0, y: 0 }}
  position={null}
  grid={[25, 25]}
  scale={1}
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
    <Box height={4} width={4} bgcolor="black"></Box>
    <Box flexGrow={1}>
      <Typography align="center">{title}</Typography>
    </Box>
    <Box height={4} width={4} bgcolor="black"></Box>
  </Box>
</Draggable>
}

const Connection = ({x1, y1, x2, y2 }) => {
  const curvedHorizontal = function (x1, y1, x2, y2) {
    let line = [];
    let mx = x1 + (x2 - x1) / 2;
  
    line.push("M", x1, y1);
    line.push("C", mx, y1, mx, y2, x2, y2);
  
    return line.join(" ");
  };
  const pathRef = useRef(null);
  useEffect(() => {
    if(pathRef) {
      pathRef.current.d = curvedHorizontal(x1, y1, x2, y2);
    }
  }, [x1, y1, x2, y2, pathRef])
  return  <svg >
  <path ref={pathRef} stroke="black" stroke-width="2" fill="none" id="path" d="M 5 5 C 200 5 181 209 357 209"></path>
 
  </svg>
}

export default App;
