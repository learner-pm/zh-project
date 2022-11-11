import { Canvas, Color } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Select, Slider, Button, Card, Space, List } from "antd";

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
  for (let i = 1; i < 31; i++) {
    const color = randomColor();
    array.push(color);
  }
  return array;
}

const dataSource = [
  {
    title: "名称",
    value: "茂茂牌头盔",
  },
  {
    title: "需求背景",
    value:
      "近几年高空抛物/跳楼呈增加趋势，还在担心自己成为那个“幸运儿吗”，有了它，您便不在担心",
  },
  {
    title: "产品描述",
    value: "采用钢铁侠盔甲同款振金材质，抗击、抗摔能力都是业内一流",
  },
];

const dataSource1 = [
  {
    title: "名称",
    value: "林龙号",
  },
  {
    title: "需求背景",
    value:
      "还在为买什么车发愁吗？还在为自己的爱车不够拉风而烦恼吗？还在考虑什么车性价比最高吗？，有了它，您便不再烦恼",
  },
  {
    title: "产品描述",
    value:
      "回头率100%，不再担心迟到，劳斯莱斯、兰博基尼看到都要退让三分，上刀山下火海都如履平地",
  },
];

const dataSource2 = [
  {
    title: "名称",
    value: "涛涛号",
  },
  {
    title: "需求背景",
    value:
      "小时候我们都有一个环球世界的梦想，它不仅能带您的家人朋友一起旅行，还能携带“小男孩儿”去你想去的地方。",
  },
  {
    title: "产品描述",
    value: "搭载全球顶尖科技，领先世界20年",
  },
];

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

  const abc = useMemo(() => {
    if (curMeshIndex === 0) {
      return dataSource;
    }
    if (curMeshIndex === 1) {
      return dataSource1;
    }
    return dataSource2;
  }, [curMeshIndex]);

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
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <Card title="3D商店">
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

            <div style={{ margin: 10, textAlign: "left" }}>
              <Button
                style={{ marginRight: "10px" }}
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
            <div style={{ marginLeft: 10, textAlign: "left" }}>
              {/** 背景 */}
              <Select
                style={{ marginRight: "10px" }}
                defaultValue={presetInfo[0]}
                onChange={(e) => {
                  setPreset(e as any);
                }}
                options={presetInfo}
              />
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
      <Space
        direction="vertical"
        size="large"
        style={{ display: "flex", width: "600px" }}
      >
        <Card
          title="产品介绍"
          extra={
            <Button type="primary" onClick={() => onSet(true)}>
              上一站
            </Button>
          }
        >
          <List
            style={{ textAlign: "left" }}
            dataSource={abc}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={item.value}
                ></List.Item.Meta>
              </List.Item>
            )}
          ></List>
        </Card>
      </Space>
    </div>
  );
};

export default ThreeD;
