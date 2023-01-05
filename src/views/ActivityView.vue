<template>
  <div style="perspective: 1000px" v-show="step == 0" class="start">
    <bullet></bullet>
    <img class="icon" src="../assets/images/may_icon.png" alt="" />
    <img class="door" src="../assets/images/door.png" alt="" />
    <div class="glow"></div>
    <img class="avatar" src="../assets/images/avater.png" alt="" />
    <img class="bg" src="../assets/images/bg2.png" alt="" />
    <div class="content">
      <img class="text2" src="../assets/images/text2.png" alt="" />
      <img class="text1" src="../assets/images/text1.png" alt="" />
      <img class="line" src="../assets/images/line2.png" alt="" />
      <div class="number">
        <div>There are already</div>
        <scroll-number></scroll-number>
        <div>diamond-hands participating in the event!</div>
      </div>
    </div>
    <img
      @click="inputWallet"
      class="btn"
      src="../assets/images/start.png"
      alt=""
    />
    <!-- <div class="music">
      <img src="../assets/images/note.png" alt="" />
    </div> -->
  </div>
  <div v-show="step == 1" class="wallet">
    <img class="bg" src="../assets/images/bg4.png" alt="" />
    <div class="wallet_box">
      <img class="address" src="../assets/images/Please.png" alt="" />
      <div class="input">
        <input
          placeholder="Ethereum address only (0x...)"
          v-model="address"
          type="text"
        />
        <img
          v-show="showAddress"
          class="wrong"
          src="../assets/images/wrong.png"
          alt=""
        />
        <img
          v-show="showTimeout"
          class="wrong"
          src="../assets/images/timeout.png"
          alt=""
        />
      </div>
      <img @click="load" class="ok" src="../assets/images/ok.png" alt="" />
      <img class="partner" src="../assets/images/partners.png" alt="" />
      <div class="icons">
        <img
          v-for="(item, index) in 10"
          :key="index"
          :src="
            require('../assets/images/icon' +
              Number(Number(index) + 1) +
              '.png')
          "
          alt=""
        />
      </div>
    </div>
  </div>
  <div class="loading" id="canvas_container" v-show="step == 2">
    <div>Data support by NFTScan</div>
  </div>
  <page-one
    :diamondHanded1="diamondHanded"
    :paperhands1="paperhands"
    :gainss1="gainss"
    v-if="step == 3"
  ></page-one>
</template>
<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SphereGeometry } from "three/src/geometries/SphereGeometry";
import { SimplexNoise } from "three/examples/jsm/math/SimplexNoise";
import PageOne from "@/components/pageOne.vue";
import BulletView from "@/components/BulletView.vue";
import ScrollNumber from "@/components/ScrollNumber.vue";
import {
  getNumber,
  addPeople,
  getdiamondHanded,
  getgainsss,
  getpaperhands,
} from "@/services/index";
import Web3 from "web3";
import { getCurrentInstance } from "vue";

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
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
      container: null,
      step: 0,
      web3: null,
      address: null,
      showAddress: false,
      showTimeout: false,
      diamondHanded: {
        boughtNftVolume: 0, //现在持有的在2022年购买的NFT总购买价
        holdNftVolume: 0, //上述NFT现在的价值
        maxBoughtNftFloorPrice: 0, //购买的最高价的NFT现在的地板价
        maxBoughtNftName: null, //购买的最高价的NFT的名称
        maxBoughtNftHoldTime: 0, //购买的最高价的NFT的持有时间
        maxBoughtNftPrice: 0, //"购买的最高价的NFT的购买价格",
        maxBoughtNftCover: null,
      },
      paperhands: {
        maxDifferenceNftSellPrice: 0, //售价低于现价最大的一个NFT的出售价格
        maxDifferenceNftName: null, //售价低于现价最大的一个NFT的名称
        maxDifferenceNftBoughtPrice: 0, //售价低于现价最大的一个NFT的购买价格
        maxDifferenceNftFloorPrice: 0, //售价低于现价最大的一个NFT的地板价
        priceDifferenceTotal: 0, //在2022年出售价格低于现在价格的NFT在2022年的价差总和的以太坊价格
        maxDifferenceNftCover: null,
      },
      gainss: {
        maxDifferenceNftSellPrice: 0, //"价格差最大的一个NFT的出售价格",
        maxDifferenceNftName: null, //"价格差最大的一个NFT的名称",
        maxDifferenceGrowthRate: 0, //"价格差最大的一个NFT的增长的百分比",
        maxDifference: 0, //"价格差最大的一个NFT的价格差",
        differenceCount: 0, //"2022售价高于购买价的NFT数",
        allSellCount: 0, //"2022年所有售卖的NFT数",
        maxDifferenceNftBoughtPrice: 0, //"价格差最大的一个NFT的购买价格",
        maxDifferenceNftFloorPrice: 0, //"价格差最大的一个NFT的地板价",
        priceDifferenceTotal: 0, //“在2022年出售的价格高于购买价格的NFT，在2022年的价差总和的以太坊价格”
        maxDifferenceNftCover: null,
      },
      data: 0,
    };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    PageOne,
    bullet: BulletView,
    ScrollNumber,
  },
  mounted() {
    console.log(
      document.body.clientWidth,
      document.body.clientHeight,
      document.body.scrollWidth,
      document.body.scrollHeight,
      window.screen.availHeight,
      window.screen.availWidth,
      window.screen.width,
      window.screen.height,
      "尺寸"
    );
    var dom = document.querySelector("input");
    dom.onblur = () => {
      document.body.removeEventListener("touchmove", this.stop, {
        passive: false,
      });
      this.$nextTick(() => {
        document.querySelector(".wallet").style.height = "100%";
        document.querySelector(".bg").style.height = "100% !important";
        document.querySelector(".wallet").style.backgroundSize = "100% 100%";
      });
    };
    dom.onfocus = () => {
      document.body.addEventListener("touchmove", this.stop, {
        passive: false,
      }); // passive 参数不能省略，用来兼容ios和android
    };
    const instance = getCurrentInstance();
    instance?.appContext.config.globalProperties.$amplitude
      .getInstance()
      .logEvent("H5_2-22_HOME_PAGE");
    this.web3 = new Web3(Web3.givenProvider);
  },
  methods: {
    stop(e) {
      e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
    },
    inputWallet() {
      this.step = 1;
      window.addEventListener("resize", () => {
        if (window.orientation === 180 || window.orientation === 0) {
          document.querySelector(".mask").style.display = "none";
        }
      });
    },
    load() {
      var isAddress = this.web3.utils.isAddress(this.address);
      this.$amplitude
        .getInstance()
        .logEvent("H5_2022_WALLET_ENTER", { address: this.address });
      if (isAddress) {
        localStorage.setItem("wallet", this.address);
        addPeople()
          .then((res) => {})
          .catch(() => {
            this.showTimeout = true;
          });
        this.showAddress = false;
        this.step = 2;
        this.container = document.getElementById("canvas_container");
        /*     Resize     */
        window.addEventListener("resize", () => {
          clearTimeout(timeout_Debounce);
          timeout_Debounce = setTimeout(this.onWindowResize, 80);
        });
        this.$nextTick(() => {
          this.init();
          this.animate();
          getdiamondHanded({ wallet: this.address })
            .then((res) => {
              if (res.code == 200) {
                this.diamondHanded = res.data || this.diamondHanded;
              } else {
                this.showTimeout = true;
                this.step = 1;
              }
            })
            .catch(() => {
              this.showTimeout = true;
              this.step = 1;
            });
          getgainsss({ wallet: this.address })
            .then((res) => {
              if (res.code == 200) {
                this.gainss = res.data || this.gainss;
              } else {
                this.showTimeout = true;
                this.step = 1;
              }
            })
            .catch(() => {
              this.showTimeout = true;
              this.step = 1;
            });
          getpaperhands({ wallet: this.address })
            .then((res) => {
              if (res.code == 200) {
                this.paperhands = res.data || this.paperhands;
              } else {
                this.showTimeout = true;
                this.step = 1;
              }
            })
            .catch(() => {
              this.showTimeout = true;
              this.step = 1;
            });
        });
      } else {
        this.showAddress = true;
      }
    },
    init() {
      scene = new THREE.Scene();

      // camera = new THREE.PerspectiveCamera(
      //   55,
      //   window.innerWidth / window.innerHeight,
      //   0.01,
      //   1000
      // );
      camera = new THREE.PerspectiveCamera(
        55,
        this.container.clientWidth / this.container.clientHeight,
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
      // texturenucleus.anisotropy = 16;
      // let icosahedronGeometry = new THREE.IcosahedronGeometry(30, 10);
      // let lambertMaterial = new THREE.MeshPhongMaterial({ map: texturenucleus });
      // nucleus = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
      // scene.add(nucleus);

      /*    Sphere  Background   */
      textureSphereBg.anisotropy = 16;
      let geometrySphereBg = new THREE.SphereBufferGeometry(50, 40, 40);
      let materialSphereBg = new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        map: textureSphereBg,
      });
      sphereBg = new THREE.Mesh(geometrySphereBg, materialSphereBg);
      scene.add(sphereBg);

      /*    Moving Stars   */
      let starsGeometry = new THREE.Geometry();

      for (let i = 0; i < 50; i++) {
        let particleStar = randomPointSphere(150);

        particleStar.velocity = THREE.MathUtils.randInt(50, 200);

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
          let radius = THREE.MathUtils.randInt(149, 70);
          let particles = randomPointSphere(radius);
          pointGeometry.vertices.push(particles);
        }
        return new THREE.Points(pointGeometry, pointMaterial);
      }
      scene.add(createStars(texture1, 15, 20));
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
      }, 5000);
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
@media (min-aspect-ratio: 375/710) {
  .content {
    transform: scale(0.8);
    top: 32% !important;
  }
  .wallet_box {
    top: 15% !important;
  }
  .door,
  .glow {
    top: 50px !important;
  }
  .avatar {
    top: 110px !important;
  }
}
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
@keyframes wrapper-gradient {
  0% {
    transform: translateY(-50%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate3d(0, 0, -100px);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
#canvas_container {
  position: relative;
  div {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    text-align: center;

    color: #ffffff;
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 100px;
    left: 0px;
  }
}
.start {
  width: 100%;
  height: 100%;
  background: url("../assets/images/bg1.png");
  background-position: left top;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
  .icon {
    position: absolute;
    top: 17px;
    left: 21px;
    width: 120px;
  }
  .avatar {
    width: 100%;
    position: absolute;
    top: 130px;
    left: 0;
    animation: fadeIn 2s linear;
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
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 295px;
    .text1 {
      width: 362px;
      height: 177px;
      animation: wrapper-gradient 1s linear;
    }
    .text2 {
      width: 303px;
      height: 34px;
      animation: wrapper-gradient 1s linear;
    }
    .line {
      width: 338px;
      height: 8px;
      margin-top: 10px;
    }
    .number {
      width: 100%;
      height: 105px;
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 30px;
      /* or 214% */

      text-align: center;
      letter-spacing: 0.1em;

      color: #ffffff;
      div:nth-child(2) {
        display: flex;
        justify-content: center;
        span {
          display: block;
          width: 28px;
          height: 31px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.044) 0%,
            rgba(240, 240, 240, 0.096) 50%,
            rgba(255, 255, 255, 0.04375) 100%
          );
          backdrop-filter: blur(15px);
          // filter: blur(2px);
          border-right: 1px solid rgba($color: #fff, $alpha: 0.2);
          &:nth-child(4) {
            background: none;
            backdrop-filter: none;
          }
          &:nth-child(3),
          &:nth-child(7),
          &:nth-child(4) {
            border-right: none;
          }
        }
      }
    }
  }
  .btn {
    width: 115px;
    height: 92px;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -57.5px;
  }
  .door {
    width: 260.87px;
    height: 531.56px;
    position: absolute;
    top: 70px;
    left: 57px;
  }
  .glow {
    width: 261.87px;
    height: 531.56px;
    position: absolute;
    top: 70px;
    left: 56px;
    background: url("../assets/images/glow.png") no-repeat;
    background-size: 100% 100%;
    animation: glows 1s ease-out infinite;
  }
}
.wallet {
  width: 100%;
  height: 100%;
  background: url("../assets/images/bg3.jpg") no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  .bg {
    height: 100%;
  }
  .wallet_box {
    width: 100%;
    position: absolute;
    top: 25%;
    // left: 50%;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .address {
    width: 249px;
    height: 58px;
  }
  .input {
    width: 335px;
    margin-top: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      width: 100%;
      height: 40px;
      background: url("../assets/images/input.png") no-repeat;
      background-size: 100% 100%;
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 17px;
      text-align: center;
      color: #ffffff;
      border: none;
      outline: none;
      &::-webkit-input-placeholder {
        //兼容WebKit browsers（Chrome的内核）
        color: #fff;
        opacity: 0.4;
      }
      &::-moz-placeholder {
        //Mozilla Firefox 19+
        color: #fff;
        opacity: 0.4;
      }
      &::-ms-input-placeholder {
        //Internet Explorer 10+
        color: #fff;
        opacity: 0.4;
      }
    }
    .wrong {
      width: 115px;
      margin-top: 11px;
    }
  }
  .ok {
    width: 116px;
    height: 44px;
    margin-top: 43px;
  }
  .partner {
    width: 335px;
    margin-top: 50px;
  }
  .icons {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding-left: 36px;
    box-sizing: border-box;
    img {
      width: 45px;
      height: 45px;
      margin-right: 20px;
      margin-top: 20px;
    }
  }
}
.loading {
  width: 100%;
  height: 100vh;
  background: url("../assets/images/bg3.jpg") no-repeat;
  background-size: 100% 100%;
}
</style>
