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

  const material = useMemo(() => {
    if (logo) {
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(logo);
      return new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        opacity: 1,
      });
    } else {
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        metalness: 0.5, // Add metalness for better reflection
        roughness: 0.5, // Control the roughness
        transparent: true,
        opacity: 1,
      });
    }
  }, [logo, color]);

  return <mesh geometry={geometry} material={material} />;
}

function CustomShape3D({ shape, color, width, height, length, logo }) {
  return (
    <Canvas camera={{ position: [5, 5, 5] }}>
      <ambientLight intensity={4} /> {/* Increase ambient light intensity */}
      <pointLight position={[10, 10, 10]} intensity={1.0} />{" "}
      {/* Add point light */}
      <Shape
        shape={shape}
        color={color}
        width={width}
        height={height}
        length={length}
        logo={logo}
      />
      <OrbitControls />
    </Canvas>
  );
}

export default CustomShape3D;
