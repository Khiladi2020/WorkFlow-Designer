import { useEffect,useRef } from "react";

const PipelineConnection = ({x1, y1, x2, y2 }) => {
  
    const curvedHorizontal = function (x1, y1, x2, y2) {
      let line = [];
      let mx = x1 + (x2 - x1) / 2;
    
      line.push("M", x1, y1);
      line.push("C", mx, y1, mx, y2, x2, y2);
    
      return line.join(" ");
    };
    const pathRef = useRef(null);
    useEffect(() => {
      // if(pathRef) {
      //   pathRef.current.d = curvedHorizontal(x1, y1, x2, y2);
      // }
      console.log("pipe",x1,y1,x2,y2)
    }, [x1, y1, x2, y2, pathRef])
    return  <svg >
    {/* <path ref={pathRef} stroke="black" stroke-width="2" fill="none" id="path" d="M 5 5 C 200 5 181 209 357 209"></path> */}
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="red"/>
    </svg>
  }

  export default PipelineConnection