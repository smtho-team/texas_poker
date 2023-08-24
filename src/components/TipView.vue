<template>
    <div class="tip">
      <!-- <img src="../assets/image/warning.png" alt="" /> -->
      <svg class="spinner" width="16px" height="16px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
     <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
  </svg>
    </div>
  </template>
  
  <script>
  export default {
      props: ['message']
  };
  </script>
  
  <style lang="scss" scoped>
  @use 'sass:math';
  $offset: 187;
  $duration: 1.4s;
  
  .spinner {
    animation: rotator $duration linear infinite;
  }
  
  @keyframes rotator {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(270deg); }
  }
  
  .path {
    stroke-dasharray: $offset;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation:
      dash $duration ease-in-out infinite;
    stroke: #fff;
      // colors ($duration*4) ease-in-out infinite;
  }
  
  // @keyframes colors {
  // 	0% { stroke: #4285F4; }
  // 	25% { stroke: #DE3E35; }
  // 	50% { stroke: #F7C223; }
  // 	75% { stroke: #1B9A59; }
  //   100% { stroke: #4285F4; }
  // }
  
  @keyframes dash {
   0% { stroke-dashoffset: $offset; }
   50% {
     stroke-dashoffset:math.div($offset,4);
     transform:rotate(135deg);
   }
   100% {
     stroke-dashoffset: $offset;
     transform:rotate(450deg);
   }
  }
  .tip {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 20px;
      height: 20px;
      margin-right: 12px;
    }
    span {
      font-family: "Cairo";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      /* identical to box height, or 21px */
      letter-spacing: 0.02em;
      color: #666666;
    }
  }
  </style>