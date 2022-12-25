<template>
  <div v-show="step == 0" class="start">
    <img class="icon" src="../assets/images/may_icon.png" alt="" />
    <img class="door" src="../assets/images/door.png" alt="" />
    <!-- <img class="glow" src="../assets/images/glow.png" alt=""> -->
    <div class="glow"></div>
    <img class="avatar" src="../assets/images/avater.png" alt="" />
    <img class="bg" src="../assets/images/bg2.png" alt="" />
    <img class="text1" src="../assets/images/text1.png" alt="" />
    <img class="text2" src="../assets/images/text2.png" alt="" />
    <img
      @click="step = 1"
      class="btn"
      src="../assets/images/start.png"
      alt=""
    />
    <div class="music">
      <img src="../assets/images/note.png" alt="" />
    </div>
  </div>
  <div v-show="step == 1" class="wallet">
    <img class="bg" src="../assets/images/bg4.png" alt="" />
    <img src="../assets/images/putAddress.png" alt="" />
    <div class="input">
      <input type="text" />
    </div>
    <img @click="load" class="ok" src="../assets/images/ok.png" alt="" />
  </div>
  <div class="loading" id="canvas_container" v-show="step == 2"></div>
  <page-one v-if="step == 3"></page-one>
</template>
<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SphereGeometry } from "three/src/geometries/SphereGeometry";
import { SimplexNoise } from "three/examples/jsm/math/SimplexNoise";
import PageOne from "@/components/pageOne.vue";

let renderer,
  scene,
  camera,
  sphereBg,
  nucleus,
  stars,
  controls,
  timeout_Debounce,
  noise = new SimplexNoise(),
  cameraSpeed = 0,
  blobScale = 3;
export default {
  data() {
    return {
      container: null,
      step: 3,
    };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    PageOne,
  },
  mounted() {},
  methods: {
    load() {
      this.step = 2;
      this.$nextTick(() => {
        this.container = document.getElementById("canvas_container");
        /*     Resize     */
        window.addEventListener("resize", () => {
          clearTimeout(timeout_Debounce);
          timeout_Debounce = setTimeout(this.onWindowResize, 80);
        });
        this.init();
        this.animate();
      });
    },
    init() {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        0.01,
        1000
      );
      camera.position.set(0, 0, 230);

      const directionalLight = new THREE.DirectionalLight("#fff", 2);
      directionalLight.position.set(0, 50, -20);
      scene.add(directionalLight);

      let ambientLight = new THREE.AmbientLight("#ffffff", 1);
      ambientLight.position.set(0, 20, 20);
      scene.add(ambientLight);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      this.container.appendChild(renderer.domElement);

      //OrbitControl
      controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      controls.autoRotateSpeed = 4;
      controls.maxDistance = 350;
      controls.minDistance = 150;
      controls.enablePan = false;

      const loader = new THREE.TextureLoader();
      const textureSphereBg = loader.load(
        "https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg"
      );
      const texturenucleus = loader.load(
        "https://i.ibb.co/hcN2qXk/star-nc8wkw.jpg"
      );
      const textureStar = loader.load("https://i.ibb.co/ZKsdYSz/p1-g3zb2a.png");
      const texture1 = loader.load("https://i.ibb.co/F8by6wW/p2-b3gnym.png");
      const texture2 = loader.load("https://i.ibb.co/yYS2yx5/p3-ttfn70.png");
      const texture4 = loader.load("https://i.ibb.co/yWfKkHh/p4-avirap.png");

      /*  Nucleus  */
      texturenucleus.anisotropy = 16;
      // let icosahedronGeometry = new THREE.IcosahedronGeometry(30, 10);
      // let lambertMaterial = new THREE.MeshPhongMaterial({
      //   map: texturenucleus,
      // });
      // nucleus = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
      // scene.add(nucleus);

      /*    Sphere  Background   */
      textureSphereBg.anisotropy = 16;
      let geometrySphereBg = new THREE.SphereBufferGeometry(50, 10, 10);
      let materialSphereBg = new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        map: textureSphereBg,
      });
      sphereBg = new THREE.Mesh(geometrySphereBg, materialSphereBg);
      scene.add(sphereBg);

      /*    Moving Stars   */
      let starsGeometry = new THREE.Geometry();

      for (let i = 0; i < 20; i++) {
        let particleStar = randomPointSphere(50);

        particleStar.velocity = THREE.MathUtils.randInt(25, 100);

        particleStar.startX = particleStar.x;
        particleStar.startY = particleStar.y;
        particleStar.startZ = particleStar.z;

        starsGeometry.vertices.push(particleStar);
      }
      let starsMaterial = new THREE.PointsMaterial({
        size: 5,
        color: "#ffffff",
        transparent: true,
        opacity: 0.8,
        map: textureStar,
        blending: THREE.AdditiveBlending,
      });
      starsMaterial.depthWrite = false;
      stars = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(stars);

      /*    Fixed Stars   */
      function createStars(texture, size, total) {
        let pointGeometry = new THREE.Geometry();
        let pointMaterial = new THREE.PointsMaterial({
          size: size,
          map: texture,
          blending: THREE.AdditiveBlending,
        });

        for (let i = 0; i < total; i++) {
          let radius = THREE.MathUtils.randInt(50, 20);
          let particles = randomPointSphere(radius);
          pointGeometry.vertices.push(particles);
        }
        return new THREE.Points(pointGeometry, pointMaterial);
      }
      scene.add(createStars(texture1, 5, 10));
      scene.add(createStars(texture2, 5, 5));
      scene.add(createStars(texture4, 7, 5));

      function randomPointSphere(radius) {
        let theta = 2 * Math.PI * Math.random();
        let phi = Math.acos(2 * Math.random() - 1);
        let dx = 0 + radius * Math.sin(phi) * Math.cos(theta);
        let dy = 0 + radius * Math.sin(phi) * Math.sin(theta);
        let dz = 0 + radius * Math.cos(phi);
        return new THREE.Vector3(dx, dy, dz);
      }
    },

    animate() {
      //Stars  Animation
      stars.geometry.vertices.forEach(function (v) {
        v.x += (0 - v.x) / v.velocity;
        v.y += (0 - v.y) / v.velocity;
        v.z += (0 - v.z) / v.velocity;

        v.velocity -= 0.3;

        if (v.x <= 5 && v.x >= -5 && v.z <= 5 && v.z >= -5) {
          v.x = v.startX;
          v.y = v.startY;
          v.z = v.startZ;
          v.velocity = THREE.MathUtils.randInt(50, 300);
        }
      });

      //Nucleus Animation
      // nucleus.geometry.vertices.forEach(function (v) {
      //   let time = Date.now();
      //   v.normalize();
      //   let distance =
      //     nucleus.geometry.parameters.radius +
      //     noise.noise3D(
      //       v.x + time * 0.0005,
      //       v.y + time * 0.0003,
      //       v.z + time * 0.0008
      //     ) *
      //       blobScale;
      //   v.multiplyScalar(distance);
      // });
      // nucleus.geometry.verticesNeedUpdate = true;
      // nucleus.geometry.normalsNeedUpdate = true;
      // nucleus.geometry.computeVertexNormals();
      // nucleus.geometry.computeFaceNormals();
      // nucleus.rotation.y += 0.002;

      //Sphere Beckground Animation
      sphereBg.rotation.x += 0.002;
      sphereBg.rotation.y += 0.002;
      sphereBg.rotation.z += 0.002;

      controls.update();
      stars.geometry.verticesNeedUpdate = true;
      renderer.render(scene, camera);
      requestAnimationFrame(this.animate);
      setTimeout(() => {
        this.step = 3;
      }, 3000);
    },
    onWindowResize() {
      camera.aspect = this.container.clientWidth / this.container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    },
  },
};
</script>
<style lang="scss" scoped>
@keyframes glows {
  0% {
    opacity: 0.5;
  }
  50% {
    // background-position: 100% 0;
  }
  100% {
    opacity: 1;
  }
}
.bg {
  width: 100%;
  height: 813px;
  position: absolute;
  top: 0;
  left: 0;
}
.start {
  width: 100%;
  height: 813px;
  background: url("../assets/images/bg1.png");
  background-position: left top;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  .icon {
    position: absolute;
    top: 30px;
    left: 21px;
    width: 120px;
  }
  .avatar {
    width: 100%;
    height: 527px;
    position: absolute;
    top: 143px;
    left: 0;
  }
  .music {
    width: 34px;
    height: 34px;
    line-height: 36px;
    text-align: center;
    background: url("../assets/images/music_bg.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 33px;
    right: 22px;
  }
  .text1 {
    width: 362px;
    height: 204px;
    position: absolute;
    top: 330px;
    left: 0;
    margin-left: 7px;
  }
  .text2 {
    width: 303px;
    height: 34px;
    position: absolute;
    top: 537px;
    left: 37px;
  }
  .btn {
    width: 115px;
    height: 92px;
    position: absolute;
    bottom: 0;
    left: 148px;
  }
  .door {
    width: 260.87px;
    height: 531.56px;
    position: absolute;
    top: 104px;
    left: 57px;
  }
  .glow {
    width: 261.87px;
    height: 531.56px;
    position: absolute;
    top: 103px;
    left: 56px;
    background: url("../assets/images/glow.png") no-repeat;
    background-size: 100% 100%;
    animation: glows 1s ease-out infinite;
  }
}
.wallet {
  width: 100%;
  height: 813px;
  background: url("../assets/images/bg3.jpg") no-repeat;
  background-size: 100% 100%;
  img:nth-child(2) {
    width: 335px;
    height: 58px;
    position: absolute;
    top: 249px;
    left: 20px;
  }
  .input {
    width: 335px;
    height: 40px;
    padding-left: 2%;
    position: absolute;
    top: 343px;
    left: 20px;
    background: url("../assets/images/input.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    input {
      width: 98%;
      height: 100%;
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      text-align: center;
      text-transform: capitalize;
      color: #ffffff;
      background: none;
      border: none;
      outline: none;
    }
  }
  .ok {
    width: 116px;
    height: 44px;
    position: absolute;
    top: 453px;
    left: 130px;
  }
}
.loading {
  width: 100%;
  height: 100vh;
  background: url("../assets/images/bg3.jpg") no-repeat;
  background-size: 100% 100%;
}
</style>
