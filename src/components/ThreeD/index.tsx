import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useState } from "react";
import { Select } from "antd";

import Loader from "./components/Loader";

import { Preset, presetInfo } from "./types";

import DamagedHelmet from "./DamagedHelmet";
import Plane from "./Plane";
import "./index.css";

const ThreeD: React.FC = () => {
  const [preset, setPreset] = useState<Preset | undefined>(presetInfo[0].value);
  const [start, setStart] = useState(true);
  return (
    <div className="three_d">
      <h1>取个名字真难队的神秘商店</h1>
      <Canvas camera={{ position: [0, 20, 20], fov: 70 }}>
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

        <Suspense>
          <Environment preset={preset} background />
          <Plane start={start}></Plane>
        </Suspense>
      </Canvas>
      <div>
        <Select
          defaultValue={presetInfo[0]}
          onChange={(e) => {
            setPreset(e as any);
          }}
          options={presetInfo}
        />
        <span onClick={() => setStart(!start)}>{start ? "开始" : "暂停"}</span>
      </div>
    </div>
  );
};

export default ThreeD;
