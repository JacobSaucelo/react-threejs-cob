// import {
//   Environment,
//   OrbitControls,
//   PerspectiveCamera,
// } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";

import TestComponent from "./test";

function App() {
  return (
    <main>
      <h1>ello</h1>

      <TestComponent />
      {/* <Canvas>
        <PerspectiveCamera makeDefault position={[2, 3, 4]} />
        <OrbitControls
          autoRotate={true}
          autoRotateSpeed={20}
          enableZoom={false}
        />
        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
        <Environment preset={"city"} />
      </Canvas> */}
    </main>
  );
}

export default App;
