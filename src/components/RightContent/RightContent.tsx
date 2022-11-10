import React, { useEffect, useRef, useState } from "react";
import "./index.css";

interface Props {
  img: string;
}

const RightContent: React.FC<Props> = (props) => {
  const { img } = props;
  const cvs = useRef<any>(null) as any;
  const [ctx, setCtx] = useState(null) as any;

  const initCanvas = () => {
    if (cvs.current && cvs.current.getContext) {
      setCtx(cvs.current.getContext("2d"));
    }
  };

  // 处理像素级别
  const drawImage = () => {
    if (!ctx) return;
    // const img = document.createElement("img");
    // img.src = img;
    // img.onload = () => {
    ctx.drawImage(document.getElementById("imgs"), 400, 400);
    const imgData = ctx.getImageData(0, 0, 400, 400);
    ctx.putImageData(imgData, 0, 0);
    // };
  };

  useEffect(() => {
    if (img && ctx) {
      drawImage();
    }
  }, [img, ctx]);
  useEffect(() => {
    initCanvas();
    console.log(cvs);
  }, [cvs]);
  return (
    <>
      <div className="app_right">
        <img src={img} id="imgs"></img>
        <canvas id="canvas" ref={cvs} className="canvas" width={400} height={400}></canvas>
      </div>
    </>
  );
};

export default RightContent;
