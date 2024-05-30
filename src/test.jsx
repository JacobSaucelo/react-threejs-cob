import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import {
  EffectComposer,
  OrbitControls,
  OutputPass,
  RenderPixelatedPass,
} from "three/examples/jsm/Addons.js";

const TestComponent = () => {
  const refContainer = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    handleShit(300, 300);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWidth, setHeight]);

  const handleShit = (width, height) => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.4, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff, 0);
    // renderer.setSize(window.innerWidth, window.innerHeight);
    refContainer.current &&
      refContainer.current.appendChild(renderer.domElement);
    // document.body.appendChild(renderer.domElement);

    const composer = new EffectComposer(renderer);
    const renderPixelatedPass = new RenderPixelatedPass(4, scene, camera);
    composer.addPass(renderPixelatedPass);

    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxZoom = 2;

    const loader = new THREE.TextureLoader();
    const texture = pixelTexture(loader.load("/texture2.png"));

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 2;

    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
      composer.render();
    }

    function pixelTexture(texture) {
      texture.minFilter = THREE.NearestFilter;
      texture.magFilter = THREE.NearestFilter;
      texture.generateMipmaps = false;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    }

    if (WebGL.isWebGLAvailable()) {
      animate();
    } else {
      const warning = WebGL.getWebGLErrorMessage();
      document.getElementById("container").appendChild(warning);
    }
  };
  return (
    <div>
      <div
        ref={refContainer}
        style={{
          height: "300px",
          width: "300px",
          border: "1px solid red",
        }}
      ></div>
    </div>
  );
};

export default TestComponent;
