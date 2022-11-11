import { Canvas, Color } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { Select, Slider, Button, Card, Space } from "antd";

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

interface Props {
  onSet: (boolean: boolean) => void;
}
const ThreeD: React.FC<Props> = ({ onSet }) => {
  const [preset, setPreset] = useState<Preset | undefined>(presetInfo[0].value);
  const [start, setStart] = useState(true);
  const [slider, setSlider] = useState(10);
  const [colors, setColors] = useState(getColorArray());
  const [color, setColor] = useState();
  const [camerPositon, setCamerPositon] = useState([0, 20, 20]);
  const [curMeshIndex, setCurMeshIndex] = useState(0);

  useEffect(() => {
    window.addEventListener("keypress", onKeyPress);
    return () => {
      window.removeEventListener("keypress", onKeyPress);
    };
  }, []);

  const onKeyPress = (e: any) => {
    if (e.key === "w") {
      setCamerPositon([100, 30, 300]);
    }
  };

  return (
    <div className="three_d">
      <Space
        direction="vertical"
        title="3D商店"
        size="large"
        style={{ display: "flex" }}
      >
        <Card
          title="3D商店"
          extra={
            <Button type="primary" onClick={() => onSet(true)}>
              上一站
            </Button>
          }
        >
          <div className="canvas-container">
            <Canvas
              style={{ borderRadius: 10 }}
              dpr={[1, 2]}
              camera={{ position: camerPositon, fov: 70 }}
            >
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
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 10 }}
            >
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
              style={{ textAlign: "left" }}
              defaultValue={presetInfo[0]}
              onChange={(e) => {
                setPreset(e as any);
              }}
              options={presetInfo}
            />
            <div className="next-btn" style={{ margin: 10 }}>
              <Button
                onClick={() => {
                  if (curMeshIndex > 0) {
                    setCurMeshIndex(curMeshIndex - 1);
                  } else {
                    setCurMeshIndex(2);
                  }
                  setColor("white" as any);
                }}
              >
                上一个
              </Button>
              <Button
                onClick={() => {
                  if (curMeshIndex < 2) {
                    setCurMeshIndex(curMeshIndex + 1);
                  } else {
                    setCurMeshIndex(0);
                  }
                  setColor("white" as any);
                }}
              >
                下一个
              </Button>
            </div>
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
        </Card>
      </Space>
    </div>
  );
};

export default ThreeD;
