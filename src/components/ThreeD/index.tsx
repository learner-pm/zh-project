import { Canvas, Color } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { Select, Slider, Button } from "antd";

import Loader from "./components/Loader";

import { Preset, presetInfo } from "./types";

import DamagedHelmet from "./DamagedHelmet";
import Plane from "./Plane";
import Tank from "./Tank";
import "./index.css";

function randomColor() {
  // 16进制的颜色的值字符范围为以下
  let code = "0123456789abcdef";
  let color = "";
  // 16进制的颜色长度为6位
  for (let i = 0; i < 6; i++) {
    // 获取一个0到code长度的随机值
    let ran = Math.floor(Math.random() * code.length);
    // 给color拼接上code的第ran个字符
    color += code.substring(ran, ran + 1);
  }
  return "#" + color;
}

function getColorArray() {
  const array = [];
  for (let i = 1; i < 20; i++) {
    const color = randomColor();
    array.push(color);
  }
  return array;
}

const ThreeD: React.FC = () => {
  const [preset, setPreset] = useState<Preset | undefined>(presetInfo[0].value);
  const [start, setStart] = useState(false);
  const [slider, setSlider] = useState(10);
  const [colors, setColors] = useState(getColorArray());
  const [color, setColor] = useState();
  const [camerPositon, setCamerPositon] = useState([0, 20, 20]);
  const [curMeshIndex, setCurMeshInde] = useState(0);

  useEffect(() => {
    window.addEventListener("keypress", onKeyPress);
    return () => {
      window.removeEventListener("keypress", onKeyPress);
    };
  }, []);

  const onKeyPress = (e: any) => {
    if (e.key === "w") {
      setCamerPositon([100, 30, 300]);
      console.log(123, e);
    }
  };
  console.log(" randomColor()", randomColor(), randomColor());

  return (
    <div className="three_d">
      <h1>取个名字真难队的神秘商店</h1>
      <div className="canvas-container">
        <Canvas dpr={[1, 2]} camera={{ position: camerPositon, fov: 70 }}>
          <ambientLight intensity={0.1} />
          <spotLight
            intensity={0.5}
            angle={0.1}
            penumbra={1}
            position={[10, 15, 10]}
            castShadow
          />
          <directionalLight color="#fffff" position={[0, 0, 5]} />
          <OrbitControls />
          <Suspense fallback={<Loader></Loader>}>
            <Environment preset={preset} background />
            {curMeshIndex === 0 && (
              <DamagedHelmet color={color} start={start} slider={slider} />
            )}
            {curMeshIndex === 1 && (
              <Tank color={color} start={start} slider={slider} />
            )}
            {curMeshIndex === 2 && (
              <Plane color={color} start={start} slider={slider} />
            )}
          </Suspense>
        </Canvas>
      </div>
      <div>
        {/** 控制旋转 */}
        <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
          <Button onClick={() => setStart(!start)}>
            {start ? "暂停" : "开始"}
          </Button>
          <Slider
            defaultValue={slider}
            tooltip={{ open: true }}
            onChange={(e) => {
              setSlider(e);
            }}
          />
        </div>
        {/** 背景 */}
        <Select
          defaultValue={presetInfo[0]}
          onChange={(e) => {
            setPreset(e as any);
          }}
          options={presetInfo}
        />
        {/** 颜色 */}
        <div>
          <Button
            onClick={() => {
              setColors(getColorArray());
            }}
          >
            换一换
          </Button>
          <div className="container">
            {colors.map((item) => {
              return (
                <div
                  onClick={() => setColor(item as any)}
                  className="item"
                  style={{ backgroundColor: item }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeD;
