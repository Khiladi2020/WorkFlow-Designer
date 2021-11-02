import { useEffect, useState } from "react";

const PipelineConnection = ({ x1, y1, x2, y2 }) => {
    console.log("Mounted");
    const curvedHorizontal = function (x1, y1, x2, y2) {
        let line = [];
        let mx = x1 + (x2 - x1) / 2;

        line.push("M", x1, y1);
        line.push("C", mx, y1, mx, y2, x2, y2);

        return line.join(" ");
    };
    const [d, setD] = useState("");
    useEffect(() => {
        setD(curvedHorizontal(x1, y1, x2, y2));
    }, [x1, y1, x2, y2]);
    return (
        <div className="pipeline-connection">
            <svg>
                <path stroke="black" stroke-width="2" fill="none" d={d}></path>
                {/* <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="dodgerblue" /> */}
            </svg>
        </div>
    );
};

export default PipelineConnection;
