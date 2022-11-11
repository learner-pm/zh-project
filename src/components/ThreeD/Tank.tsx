import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";

import { useFrame, useLoader, useThree } from "@react-three/fiber";

interface props {
  start: boolean;
  slider: number;
  props?: any;
  color?: any;
}

const Tank: React.FC<props> = (props) => {
  const { gl, scene, camera } = useThree();
  const group = useRef<any>();
  const gltf = useGLTF("/gltf/tank.gltf");

  useFrame(({ clock, camera: abc }) => {
    if (group.current && props.start) {
      group.current.rotation.y = (clock.elapsedTime * props.slider) / 10;
    }
  });
  console.log("group", group.current);

  useEffect(() => {
    gltf.scene.traverse(function (obj: any) {
      if (obj.isMesh) {
        obj.material.color.set(props.color);
      }
    });
  }, [gltf, props.color]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive
        object={gltf.scene}
        onClick={(e: any) => {
          console.log(e);
        }}
      />
    </group>
  );
};

useGLTF.preload("/gltf/tank.gltf");

export default Tank;
