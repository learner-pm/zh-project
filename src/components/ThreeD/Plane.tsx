import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

import { useFrame, useLoader, useThree } from "@react-three/fiber";

interface props {
  start: boolean;
  props?: any;
}
const Plane: React.FC<props> = (props) => {
  const { gl, scene, camera } = useThree();
  const group = useRef<any>();
  const gltf = useGLTF("/gltf/123.gltf");

  console.log(gltf);

  useFrame(({ clock, camera: abc }) => {
    if (group.current && props.start) {
      group.current.rotation.y = clock.elapsedTime * 0.5;
    }
  });
  console.log("group", group.current);

  return (
    <group ref={group} {...props} dispose={null}>
      {/* <group>
        <mesh name="Headphones" geometry={gltf.nodes.战机06.geometry} material={gltf.materials.M_Headphone} {...extras} />
        </group> */}
      <primitive
        object={gltf.scene}
        onClick={(e: any) => {
          console.log(e);
        }}
      />
    </group>
  );
};

useGLTF.preload("/gltf/123.gltf");

export default Plane;
