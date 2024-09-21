import React, { useMemo, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const createLogoWithBackground = (logo, color) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = logo;
    img.onload = () => {
      // Set canvas size to match the image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the background color
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the logo on top
      ctx.drawImage(img, 0, 0);

      // Convert the canvas to a data URL and resolve the promise
      resolve(canvas.toDataURL());
    };
  });
};

function Shape({ shape, color, width, height, length, logo }) {
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    if (logo) {
      createLogoWithBackground(logo, color).then((combinedLogo) => {
        const textureLoader = new THREE.TextureLoader();
        const loadedTexture = textureLoader.load(combinedLogo);
        setTexture(loadedTexture);
      });
    }
  }, [logo, color]);

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
    if (texture) {
      return new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        opacity: 1,
      });
    } else {
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        metalness: 0.5,
        roughness: 0.5,
        transparent: true,
        opacity: 1,
      });
    }
  }, [texture, color]);

  return <mesh geometry={geometry} material={material} />;
}

function CustomShape3D({ shape, color, width, height, length, logo }) {
  return (
    <Canvas camera={{ position: [5, 5, 5] }}>
      <ambientLight intensity={5} />
      <pointLight position={[10, 10, 10]} intensity={1.0} />
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
