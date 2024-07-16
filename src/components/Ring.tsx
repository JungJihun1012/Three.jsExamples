import * as THREE from 'three';
import { MeshReflectorMaterial, useGLTF } from "@react-three/drei";
import React from 'react';
import { GLTF } from 'three-stdlib';


// Three.js 타입 정의

interface GLTFResult extends GLTF {
    nodes: {
        mesh_0: THREE.Mesh;
        mesh_4: THREE.InstancedMesh;
        mesh_9: THREE.Mesh;
    };
    materials: {
        WhiteMetal: THREE.Material;
    }
}

interface RingProps {
    frame: string;
    diamonds: string;
    env: THREE.Texture | null;
    [key: string]: any;
}

const Ring: React.FC<RingProps> = ({ frame, diamonds, env, ...props }) => {
    const { nodes, materials } = useGLTF('/3-stone-transformed.glb') as GLTFResult;
    return (
      <group {...props} dispose={null}>
        <mesh castShadow geometry={nodes.mesh_0.geometry}>
          <meshStandardMaterial color={frame} roughness={0.15} metalness={1} envMapIntensity={1.5} />
        </mesh>
        <mesh castShadow geometry={nodes.mesh_9.geometry} material={materials.WhiteMetal} />
        <instancedMesh castShadow args={[nodes.mesh_4.geometry, undefined, 65]} instanceMatrix={nodes.mesh_4.instanceMatrix}>
          <MeshReflectorMaterial
            color={diamonds}
            side={THREE.DoubleSide}
            envMap={env}
            toneMapped={false}
            mirror={0.75}   // 필수 속성 추가
          />
        </instancedMesh>
      </group>
    );
  };
  

export default Ring;