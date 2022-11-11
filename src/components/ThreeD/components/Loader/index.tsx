import React from "react";
import { Html } from "@react-three/drei";
import { Spin } from "antd";

const Loader: React.FC = () => {
  return (
    <Html center>
      <Spin></Spin>
    </Html>
  );
};

export default Loader;
