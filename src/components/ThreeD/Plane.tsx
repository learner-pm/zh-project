import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";

import { useFrame, useLoader, useThree } from "@react-three/fiber";

interface props {
  start: boolean;
  slider: number;
  props?: any;
  color?: any;
}

const Plane: React.FC<props> = (props) => {
  const { gl, scene, camera } = useThree();
  const group = useRef<any>();
  const gltf = useGLTF("/gltf/fight_plane.gltf");

  console.log("gltf", Object.values(gltf.nodes));

  useFrame(({ clock, camera: abc }) => {
    if (group.current && props.start) {
      group.current.rotation.y = (clock.elapsedTime * props.slider) / 10;
    }
    // Object.values(gltf.nodes)[1].rotation.y = (clock.elapsedTime * props.slider) / 10;
  });

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

useGLTF.preload("/gltf/fight_plane.gltf");

export default Plane;
