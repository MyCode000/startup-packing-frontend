import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
function Shape({ shape, color, width, height, length, logo }) {
  const geometry = useMemo(() => {
    const w = parseFloat(width) || 1;
    const h = parseFloat(height) || 1;
    const l = parseFloat(length) || 1;

    switch (shape) {
      case "triangle":
        const triangleShape = new THREE.Shape();
        triangleShape.moveTo(0, 0);
        triangleShape.lineTo(w / 2, h);
        triangleShape.lineTo(w, 0);
        triangleShape.closePath();

        const extrudeSettings = {
          steps: 1,
          depth: l,
          bevelEnabled: false,
        };

        return new THREE.ExtrudeGeometry(triangleShape, extrudeSettings);

      case "square":
        return new THREE.BoxGeometry(w, h, l);

      case "circle":
        return new THREE.CylinderGeometry(w / 2, w / 2, h, 32);

      default:
        return new THREE.BoxGeometry(1, 1, 1);
    }
  }, [shape, width, height, length]);

  // Use `THREE.TextureLoader` to load the texture if a logo is uploaded
  const material = useMemo(() => {
    if (logo) {
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(logo); // Use the uploaded logo as the texture
      return new THREE.MeshStandardMaterial({ map: texture });
    } else {
      return new THREE.MeshStandardMaterial({ color });
    }
  }, [logo, color]);

  return <mesh geometry={geometry} material={material} />;
}

function CustomShape3D({ shape, color, width, height, length, logo }) {
  return (
    <Canvas camera={{ position: [5, 5, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Shape
        shape={shape}
        color={color}
        width={width}
        height={height}
        length={length}
        logo={logo} // Pass the uploaded logo to the Shape component
      />
      <OrbitControls />
    </Canvas>
  );
}

export default CustomShape3D;
