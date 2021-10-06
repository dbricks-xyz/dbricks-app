<template>
  <div v-if="protocol===Protocol.Serum">
    <svg :width="size" :height="size" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 251 283.9" style="enable-background:new 0 0 251 283.9" xml:space="preserve"><linearGradient id="a" gradientUnits="userSpaceOnUse" x1="125.5" y1="52.088" x2="125.5" y2="253.088" gradientTransform="matrix(1 0 0 -1 0 285.976)"><stop offset="0" style="stop-color:#05aac5"/><stop offset="1" style="stop-color:#71e0ec"/></linearGradient>
      <path d="M125.5 233.9c-43.1 0-78.1-35-78.1-78.1 0-41.9 70.7-115.9 73.7-119l3.7-3.9 3.8 3.8c3.1 3.1 75 77.1 75 119 0 43.2-35 78.2-78.1 78.2zM124.9 48c-6.2 6.7-19.2 21.2-32.1 38.2-22.9 30.2-35 54.2-35 69.5 0 37.3 30.4 67.7 67.7 67.7s67.7-30.4 67.7-67.7c0-15.3-12.3-39.3-35.6-69.5-13.1-16.9-26.4-31.5-32.7-38.2z" style="fill:url(#a)"/>
      <linearGradient id="b" gradientUnits="userSpaceOnUse" x1="125.6" y1="27.088" x2="125.6" y2="269.363" gradientTransform="matrix(1 0 0 -1 0 285.976)"><stop offset="0" style="stop-color:#05aac5"/>
        <stop offset="1" style="stop-color:#71e0ec"/></linearGradient>
      <path d="M125.5 258.9c-56.9 0-103.1-46.3-103.1-103.1 0-55.6 77.6-133.2 80.9-136.4 2-2 5.4-2 7.4 0s2 5.4 0 7.4c-.8.8-77.8 77.8-77.8 129 0 51.1 41.6 92.7 92.7 92.7s92.7-41.6 92.7-92.7c0-21-13.6-50-39.4-84.1-19.8-26.1-39.7-45.9-39.9-46.1-2.1-2-2.1-5.3 0-7.4 2-2.1 5.3-2.1 7.4 0 3.4 3.3 82.4 81.9 82.4 137.6-.2 56.8-46.4 103.1-103.3 103.1z" style="fill:url(#b)"/>
      <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="125.5" y1="2.088" x2="125.5" y2="285.976" gradientTransform="matrix(1 0 0 -1 0 285.976)"><stop offset="0" style="stop-color:#05aac5"/>
        <stop offset="1" style="stop-color:#71e0ec"/></linearGradient>
      <path d="M125.5 283.9C56.3 283.9 0 227.6 0 158.4c0-28.6 14.4-63.8 42.7-104.5C63.6 23.9 84.1 2.5 85 1.6c2-2.1 5.3-2.1 7.4-.1s2.1 5.3.1 7.4c-.2.2-20.9 21.8-41.3 51.1-26.7 38.3-40.8 72.3-40.8 98.4 0 63.4 51.6 115.1 115.1 115.1s115.1-51.6 115.1-115.1c0-26.1-14.2-60.1-41.1-98.4C178.9 30.7 158 9.1 157.8 8.9c-2-2.1-2-5.4.1-7.4s5.4-2 7.4.1c3.5 3.6 85.7 89 85.7 156.8 0 69.2-56.3 125.5-125.5 125.5z" style="fill:url(#c)"/></svg>
  </div>
  <div v-else-if="protocol===Protocol.Mango">
    <svg :width="size" :height="size" viewBox="0 0 985 1006" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="m472.746 272.289.014-.019c36.29 18.62 76 25 114 24.89 22.08 20.28 40.45 44.1 57.71 68.56a275.472 275.472 0 0 1 19.32 32c13.199 25.416 22.906 52.308 32.728 79.517 2.88 7.98 5.771 15.988 8.762 23.993a478.585 478.585 0 0 0 2.937 10.284l.053-.014c15.17 52.03 37.32 107.61 67 153.5l-.029.012A340.392 340.392 0 0 0 808.13 707.7c2.376 2.57 4.806 5.116 7.239 7.665l.001.001.001.001.003.003c11.368 11.91 22.816 23.904 29.306 38.91 8.08 18.7 7.46 40.21 2.6 60-22.93 93.28-112.76 117.79-198.61 120.05l.041-.107c-32.189.641-64.155-1.758-92.501-4.663 0 0-136.71-14.15-252.59-98.87l-3.74-2.78.001-.001A417.733 417.733 0 0 1 261.24 795.3c-32.48-31-61.38-66.16-83.48-104.76l.443-.445a366.271 366.271 0 0 1-7.523-14.265c-21.38-42.79-34.41-89.37-35-138.88-1.006-83.077 27.415-168.155 81.438-229.837a9.544 9.544 0 0 1-.058-.153c29.25-32.04 65.81-57.21 109.09-71.54a250.58 250.58 0 0 1 84.22-12.87 208.823 208.823 0 0 0 62.376 49.739ZM406.153 815.85c19.558-7.139 38.087-16.74 55.365-28.571-17.387 11.75-35.943 21.358-55.365 28.571Z" fill="url(#paint0_linear)"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="m756.498 204.628.042-.001 1.18-.76c-152.42-260-351.72-55.3-351.72-55.3l.285.501-.035.009c114.606 200.933 332.414 67.01 350.248 55.551Z" fill="url(#paint1_linear)"/>
      <path d="M567.56 652.44c-42 100.4-122.64 166.88-220.34 176.95-2.1.28-28.84 2.39-43.6 1.3 115.88 84.72 252.59 98.87 252.59 98.87 29.27 3 62.4 5.46 95.65 4.59 11.71-30.57 18.3-65.57 16.41-105.28-4.39-92.23 49.09-139.58 107-163.87-29.68-45.89-51.83-101.47-67-153.5-45.22 12.03-102.65 49.86-140.71 140.94Z" fill="url(#paint2_linear)"/>
      <path d="M666.44 828.22c1.9 39.71-6.06 75.54-17.77 106.11 85.85-2.26 175.68-26.77 198.61-120.05 4.86-19.79 5.48-41.3-2.6-60-7.88-18.22-23.07-32-36.55-46.58a340.474 340.474 0 0 1-34.19-44.7c-57.86 24.3-111.89 73-107.5 165.22Z" fill="url(#paint3_linear)"/>
      <path d="M705.28 501.23c-13.19-35.3-24.42-70.64-41.49-103.51a275.472 275.472 0 0 0-19.32-32c-17.26-24.46-35.63-48.28-57.71-68.56-38 .11-77.71-6.27-114-24.89-36.76 52.14-78.82 140.59-40.32 241.55 56.85 149.1-58.52 251-132.56 314.09l3.74 2.78a226.176 226.176 0 0 0 41.68-.6c97.69-10.08 183-78.16 225-178.55 38.07-91.08 93.45-125.68 138.61-137.72a480.41 480.41 0 0 1-3.63-12.59Z" fill="url(#paint4_linear)"/>
      <path d="M221.09 302.67c-56.6 62-86.44 149.19-85.41 234.28.59 49.51 13.62 96.09 35 138.88a367.48 367.48 0 0 0 10.2 19c118.99-119.44 76-297.41 40.21-392.16Z" fill="url(#paint5_linear)"/>
      <path d="M434.44 513.82c-38.5-101 2.62-188.87 39.33-241a208.815 208.815 0 0 1-63.4-50.27 250.58 250.58 0 0 0-84.22 12.87c-43.28 14.33-79.84 39.5-109.09 71.54 35 92.67 77.06 266.76-39.3 383.58 22.1 38.6 51 73.76 83.48 104.76a417.77 417.77 0 0 0 40.64 34.09c74.04-63.06 189.41-166.47 132.56-315.57Z" fill="url(#paint6_linear)"/>
      <path d="M578 165.13c80.57 31.79 137 40.4 177.91 39.17l1.18-.76c-152.42-260-351.72-55.3-351.72-55.3l.29.51c42.99-7.62 105.47-9.99 172.34 16.38Z" fill="url(#paint7_linear)"/>
      <path d="M579 163.33C512.17 137 449.33 138 405.62 148.75c114.61 200.94 332.43 67 350.25 55.55-40.94 1.23-96.3-9.18-176.87-40.97Z" fill="url(#paint8_linear)"/>
      <defs>
        <linearGradient id="paint0_linear" x1="46.5" y1="344.5" x2="978.5" y2="903" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E54033"/>
          <stop offset=".49" stop-color="#FECA1A"/>
          <stop offset="1" stop-color="#AFD803"/>
        </linearGradient>
        <linearGradient id="paint1_linear" x1="263767" y1="31225.5" x2="205421" y2="-28791.6" gradientUnits="userSpaceOnUse">
          <stop offset=".15" stop-color="#6CBF00"/>
          <stop offset="1" stop-color="#AFD803"/>
        </linearGradient>
        <linearGradient id="paint2_linear" x1="207.43" y1="837.73" x2="791.43" y2="695.73" gradientUnits="userSpaceOnUse">
          <stop offset=".21" stop-color="#E54033"/>
          <stop offset=".84" stop-color="#FECA1A"/>
        </linearGradient>
        <linearGradient id="paint3_linear" x1="667.54" y1="798.34" x2="847.74" y2="799.69" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FECA1A"/>
          <stop offset=".4" stop-color="#FECA1A"/>
          <stop offset="1" stop-color="#AFD803"/>
        </linearGradient>
        <linearGradient id="paint4_linear" x1="259.65" y1="841.37" x2="629.1" y2="341.2" gradientUnits="userSpaceOnUse">
          <stop offset=".16" stop-color="#E54033"/>
          <stop offset=".84" stop-color="#FECA1A"/>
        </linearGradient>
        <linearGradient id="paint5_linear" x1="205.85" y1="344.39" x2="189.49" y2="667.45" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FECA1A"/>
          <stop offset=".76" stop-color="#E54033"/>
        </linearGradient>
        <linearGradient id="paint6_linear" x1="386.58" y1="260.5" x2="287.91" y2="635.17" gradientUnits="userSpaceOnUse">
          <stop offset=".16" stop-color="#FECA1A"/>
          <stop offset="1" stop-color="#E54033"/>
        </linearGradient>
        <linearGradient id="paint7_linear" x1="424.8" y1="81.12" x2="790.13" y2="215.78" gradientUnits="userSpaceOnUse">
          <stop offset=".15" stop-color="#6CBF00"/>
          <stop offset="1" stop-color="#AFD803"/>
        </linearGradient>
        <linearGradient id="paint8_linear" x1="263766" y1="31225.2" x2="205420" y2="-28791.9" gradientUnits="userSpaceOnUse">
          <stop offset=".15" stop-color="#6CBF00"/>
          <stop offset="1" stop-color="#AFD803"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
  <div v-else-if="protocol===Protocol.Saber">
    <svg :width="size" :height="size" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="96.52" fill="#000" stroke="#6764FB" stroke-width="6.96"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M140 64a4 4 0 0 0-4-4H75.852c-2.629 0-4.928.381-6.9 1.144-1.971.82-3.614 1.906-4.928 3.255-1.369 1.407-2.382 2.991-3.039 4.75A16.444 16.444 0 0 0 60 74.78v12.374A4.846 4.846 0 0 0 64.846 92H116L92 76h44a4 4 0 0 0 4-4v-8Zm-80.002 72a4 4 0 0 0 4 4h60.148c2.628 0 4.928-.381 6.899-1.144 1.972-.821 3.614-1.906 4.928-3.255 1.369-1.407 2.382-2.991 3.039-4.751.657-1.818.986-3.695.986-5.63v-12.374a4.845 4.845 0 0 0-4.846-4.846H83.998l24 16h-44a4 4 0 0 0-4 4v8Z" fill="#6764FB"/>
    </svg>
  </div>
  <div v-else-if="protocol===Protocol.Solend">
    <svg :width="size" :height="size" viewBox="0 0 685 544" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient x1="0%" y1="34.579%" x2="82.116%" y2="50%" id="linearGradient-1">
          <stop stop-color="#FF9351" offset="0%"/>
          <stop stop-color="#FF5C28" offset="100%"/>
        </linearGradient>
        <linearGradient x1="0%" y1="68.057%" x2="106.817%" y2="32.79%" id="linearGradient-2">
          <stop stop-color="#FF9351" offset="0%"/>
          <stop stop-color="#FF5C28" offset="100%"/>
        </linearGradient>
        <linearGradient x1="0%" y1="67.613%" x2="106.817%" y2="33.213%" id="linearGradient-3">
          <stop stop-color="#FF9351" offset="0%"/>
          <stop stop-color="#FF5C28" offset="100%"/>
        </linearGradient>
      </defs>
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g id="1280" transform="translate(-298 -369)" stroke-width="84.829">
          <g id="sendlend-logo-vector" transform="translate(340 412)">
            <g id="Group-10" transform="translate(.425 .379)">
              <path d="M102.267 0 42.25 61.557c-56.188 57.628-55.605 149.721 1.308 206.634h0c56.71 56.71 148.402 57.52 206.105 1.82l84.117-81.195c61.149-59.025 158.187-58.605 218.819.948h0c65.887 64.71 61.882 172.06-8.65 231.676l-42.366 35.808" id="Path" stroke="url(#linearGradient-1)"/>
              <path d="M151.924 165.52S249.166 49.655 354.685 20.69" id="Path" stroke="url(#linearGradient-2)"/>
              <path d="M435.927 310.84s-97.182 116.218-203.19 143.339" id="Path" stroke="url(#linearGradient-3)"/>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </div>
  <div v-else-if="protocol===Protocol.Raydium">
    <img :height="size" :width="size" src="../assets/logos/raydium.png"/>
  </div>
  <div v-else-if="protocol===Protocol.Wormhole">
    <svg :width="size" :height="size" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 620 600" id="svg2" version="1.1">
      <defs id="defs4">
        <radialGradient xlink:href="#linearGradient3101" id="radialGradient3107" cx="-136.881" cy="809.345" fx="-136.881" fy="809.345" r="52.059" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-1.33765 -1.33618 .42983 -1.58714 -644.427 1876.868)"/>
        <radialGradient xlink:href="#linearGradient3101-4" id="radialGradient3107-9" cx="-137.043" cy="813.465" fx="-137.043" fy="813.465" r="52.059" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-1.36185 -1.20347 .38938 -1.6252 -615.057 1925.77)"/>
        <radialGradient xlink:href="#linearGradient3918" id="radialGradient3925" cx="288.626" cy="685.031" fx="288.626" fy="685.031" r="261.857" gradientTransform="matrix(0 .3705 -.28136 0 509.435 622.176)" gradientUnits="userSpaceOnUse"/>
        <radialGradient xlink:href="#linearGradient3879-7" id="radialGradient3889-1" cx="369.083" cy="651.247" fx="369.083" fy="651.247" r="46.636" gradientTransform="matrix(1.85088 -2.38091 .83257 1.03017 -858.067 891.643)" gradientUnits="userSpaceOnUse"/>
        <radialGradient xlink:href="#linearGradient3939" id="radialGradient3937" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-.87573 -.5121 .4237 -.72457 456.896 1456.401)" cx="343.12" cy="736.337" fx="343.12" fy="736.337" r="50.844"/>
        <radialGradient xlink:href="#linearGradient4166" id="radialGradient4174" cx="315.52" cy="840.967" fx="315.52" fy="840.967" r="283.761" gradientTransform="matrix(.81396 0 0 .35795 58.698 378.3)" gradientUnits="userSpaceOnUse"/>
        <radialGradient xlink:href="#linearGradient3939" id="radialGradient4219" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-.87573 -.5121 .4237 -.72457 456.896 1456.401)" cx="343.12" cy="736.337" fx="343.12" fy="736.337" r="50.844"/>
        <radialGradient xlink:href="#linearGradient3939" id="radialGradient4242" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-.87573 -.5121 .4237 -.72457 327.704 1456.401)" cx="343.12" cy="736.337" fx="343.12" fy="736.337" r="50.844"/>
        <radialGradient xlink:href="#linearGradient3939" id="radialGradient4244" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-.87573 -.5121 .4237 -.72457 -152.596 1456.401)" cx="343.12" cy="736.337" fx="343.12" fy="736.337" r="50.844"/>
        <radialGradient xlink:href="#linearGradient3101" id="radialGradient3155" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-1.33765 -1.33618 .42983 -1.58714 -644.427 1876.868)" cx="-136.881" cy="809.345" fx="-136.881" fy="809.345" r="52.059"/>
        <radialGradient xlink:href="#linearGradient3939" id="radialGradient3157" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-.87573 -.5121 .4237 -.72457 -152.596 1456.401)" cx="343.12" cy="736.337" fx="343.12" fy="736.337" r="50.844"/>
        <radialGradient xlink:href="#linearGradient3939" id="radialGradient3205" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-.87573 -.5121 .4237 -.72457 327.704 1456.401)" cx="343.12" cy="736.337" fx="343.12" fy="736.337" r="50.844"/>
        <radialGradient xlink:href="#linearGradient3939" id="radialGradient3265" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-.87573 -.5121 .4237 -.72457 327.704 1456.401)" cx="343.12" cy="736.337" fx="343.12" fy="736.337" r="50.844"/>
        <radialGradient xlink:href="#linearGradient3939" id="radialGradient4045" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-.87573 -.5121 .4237 -.72457 327.404 1456.401)" cx="343.12" cy="736.337" fx="343.12" fy="736.337" r="50.844"/>
        <radialGradient xlink:href="#linearGradient3939" id="radialGradient4050" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-.87573 -.5121 .4237 -.72457 -172.296 1456.401)" cx="343.12" cy="736.337" fx="343.12" fy="736.337" r="50.844"/>
        <radialGradient xlink:href="#linearGradient3101" id="radialGradient4052" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-1.33765 -1.33618 .42983 -1.58714 -644.427 1876.868)" cx="-136.881" cy="809.345" fx="-136.881" fy="809.345" r="52.059"/>
        <radialGradient xlink:href="#linearGradient4166" id="radialGradient4148" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.81396 0 0 .35795 58.698 378.3)" cx="315.52" cy="840.967" fx="315.52" fy="840.967" r="283.761"/>
        <radialGradient xlink:href="#linearGradient3918" id="radialGradient4177" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 .3705 -.28136 0 509.435 622.176)" cx="288.626" cy="685.031" fx="288.626" fy="685.031" r="261.857"/>
        <radialGradient xlink:href="#linearGradient4166" id="radialGradient4222" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.81396 0 0 .35795 58.698 378.3)" cx="315.52" cy="840.967" fx="315.52" fy="840.967" r="283.761"/>
        <radialGradient xlink:href="#linearGradient3918" id="radialGradient4291" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 .3705 -.28136 0 509.435 622.176)" cx="288.626" cy="685.031" fx="288.626" fy="685.031" r="261.857"/>
        <radialGradient xlink:href="#linearGradient3939" id="radialGradient4315" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-.87573 -.5121 .4237 -.72457 327.704 1456.401)" cx="343.12" cy="736.337" fx="343.12" fy="736.337" r="50.844"/>
        <radialGradient xlink:href="#linearGradient3939" id="radialGradient4383" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-.87573 -.5121 .4237 -.72457 327.704 1456.401)" cx="343.12" cy="736.337" fx="343.12" fy="736.337" r="50.844"/>
        <radialGradient xlink:href="#linearGradient3939" id="radialGradient4398" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-.87573 -.5121 .4237 -.72457 327.704 1456.401)" cx="343.12" cy="736.337" fx="343.12" fy="736.337" r="50.844"/>
        <radialGradient xlink:href="#linearGradient3101" id="radialGradient4571" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-1.33765 -1.33618 .42983 -1.58714 -644.427 1876.868)" cx="-136.881" cy="809.345" fx="-136.881" fy="809.345" r="52.059"/>
        <radialGradient xlink:href="#linearGradient3939" id="radialGradient4573" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-.87573 -.5121 .4237 -.72457 -172.296 1456.401)" cx="343.12" cy="736.337" fx="343.12" fy="736.337" r="50.844"/>
        <radialGradient xlink:href="#linearGradient3879" id="radialGradient4579" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1.85088 -2.38091 .83257 1.03017 -858.067 891.643)" cx="369.083" cy="651.247" fx="369.083" fy="651.247" r="46.636"/>
        <radialGradient xlink:href="#linearGradient4087" id="radialGradient4581" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-.7063 .7096 -.20325 -.18186 584.847 761.237)" cx="237.452" cy="787.651" fx="237.452" fy="787.651" r="86.734"/>
        <radialGradient xlink:href="#linearGradient3939" id="radialGradient4587" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-.87573 -.5121 .4237 -.72457 895.345 1456.401)" cx="343.12" cy="736.337" fx="343.12" fy="736.337" r="50.844"/>
        <radialGradient xlink:href="#linearGradient4166" id="radialGradient4589" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.81396 0 0 .35795 58.698 378.3)" cx="315.52" cy="840.967" fx="315.52" fy="840.967" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4166" id="radialGradient4591" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.81396 0 0 .35795 58.698 378.3)" cx="315.52" cy="840.967" fx="315.52" fy="840.967" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4166" id="radialGradient4593" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.81396 0 0 .35795 58.698 378.3)" cx="315.52" cy="840.967" fx="315.52" fy="840.967" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4166" id="radialGradient4595" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.81396 0 0 .35795 58.698 378.3)" cx="315.52" cy="840.967" fx="315.52" fy="840.967" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4166" id="radialGradient4597" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.81396 0 0 .35795 58.698 378.3)" cx="315.52" cy="840.967" fx="315.52" fy="840.967" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4166" id="radialGradient4599" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.81396 0 0 .35795 58.698 378.3)" cx="315.52" cy="840.967" fx="315.52" fy="840.967" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4166" id="radialGradient4601" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.81396 0 0 .35795 58.698 378.3)" cx="315.52" cy="840.967" fx="315.52" fy="840.967" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4166" id="radialGradient4603" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.81396 0 0 .35795 58.698 378.3)" cx="315.52" cy="840.967" fx="315.52" fy="840.967" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4166" id="radialGradient4605" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.81396 0 0 .35795 58.698 378.3)" cx="315.52" cy="840.967" fx="315.52" fy="840.967" r="283.761"/>
        <radialGradient xlink:href="#linearGradient3918" id="radialGradient4607" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 .3705 -.28136 0 509.435 622.176)" cx="288.626" cy="685.031" fx="288.626" fy="685.031" r="261.857"/>
        <radialGradient xlink:href="#linearGradient3918" id="radialGradient4609" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 .3705 -.28136 0 509.435 622.176)" cx="288.626" cy="685.031" fx="288.626" fy="685.031" r="261.857"/>
        <radialGradient xlink:href="#linearGradient3918" id="radialGradient4611" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 .3705 -.28136 0 509.435 622.176)" cx="288.626" cy="685.031" fx="288.626" fy="685.031" r="261.857"/>
        <radialGradient xlink:href="#linearGradient3918" id="radialGradient4613" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 .3705 -.28136 0 509.435 622.176)" cx="288.626" cy="685.031" fx="288.626" fy="685.031" r="261.857"/>
        <radialGradient xlink:href="#linearGradient3918" id="radialGradient4615" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 .3705 -.28136 0 509.435 622.176)" cx="288.626" cy="685.031" fx="288.626" fy="685.031" r="261.857"/>
        <radialGradient xlink:href="#linearGradient3918" id="radialGradient4617" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 .3705 -.28136 0 509.435 622.176)" cx="288.626" cy="685.031" fx="288.626" fy="685.031" r="261.857"/>
        <radialGradient xlink:href="#linearGradient3918" id="radialGradient4619" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 .3705 -.28136 0 509.435 622.176)" cx="288.626" cy="685.031" fx="288.626" fy="685.031" r="261.857"/>
        <radialGradient xlink:href="#linearGradient3918" id="radialGradient4621" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 .3705 -.28136 0 509.435 622.176)" cx="288.626" cy="685.031" fx="288.626" fy="685.031" r="261.857"/>
        <radialGradient xlink:href="#linearGradient3918" id="radialGradient4623" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 .3705 -.28136 0 509.435 622.176)" cx="288.626" cy="685.031" fx="288.626" fy="685.031" r="261.857"/>
        <radialGradient xlink:href="#linearGradient3918" id="radialGradient4625" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 .3705 -.28136 0 509.435 622.176)" cx="288.626" cy="685.031" fx="288.626" fy="685.031" r="261.857"/>
        <radialGradient xlink:href="#linearGradient3918" id="radialGradient4627" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 .3705 -.28136 0 509.435 622.176)" cx="288.626" cy="685.031" fx="288.626" fy="685.031" r="261.857"/>
        <radialGradient xlink:href="#linearGradient3918" id="radialGradient4629" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 .3705 -.28136 0 509.435 622.176)" cx="288.626" cy="685.031" fx="288.626" fy="685.031" r="261.857"/>
        <radialGradient xlink:href="#linearGradient3918" id="radialGradient4631" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 .39408 -.3121 0 528.318 629.797)" cx="236.723" cy="691.476" fx="236.723" fy="691.476" r="261.857"/>
        <radialGradient xlink:href="#linearGradient3918" id="radialGradient4633" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 .3705 -.28136 0 509.435 622.176)" cx="288.626" cy="685.031" fx="288.626" fy="685.031" r="261.857"/>
        <radialGradient xlink:href="#linearGradient3918" id="radialGradient4635" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 .3705 -.28136 0 509.435 622.176)" cx="288.626" cy="685.031" fx="288.626" fy="685.031" r="261.857"/>
        <radialGradient xlink:href="#linearGradient3101" id="radialGradient4192" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-1.33765 -1.33618 .42983 -1.58714 -644.427 1876.868)" cx="-136.881" cy="809.345" fx="-136.881" fy="809.345" r="52.059"/>
        <radialGradient xlink:href="#linearGradient3939" id="radialGradient4194" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-.87573 -.5121 .4237 -.72457 -172.296 1456.401)" cx="343.12" cy="736.337" fx="343.12" fy="736.337" r="50.844"/>
        <radialGradient xlink:href="#linearGradient3879" id="radialGradient4200" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1.85088 -2.38091 .83257 1.03017 -858.067 891.643)" cx="369.083" cy="651.247" fx="369.083" fy="651.247" r="46.636"/>
        <radialGradient xlink:href="#linearGradient4087" id="radialGradient4202" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-.7063 .7096 -.20325 -.18186 584.847 761.237)" cx="237.452" cy="787.651" fx="237.452" fy="787.651" r="86.734"/>
        <radialGradient xlink:href="#linearGradient3918" id="radialGradient4257" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0 .3705 -.28136 0 509.435 622.176)" cx="288.626" cy="685.031" fx="288.626" fy="685.031" r="261.857"/>
        <radialGradient xlink:href="#linearGradient3879" id="radialGradient3320" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1.85088 -2.38091 .83257 1.03017 -864.053 436.849)" cx="369.083" cy="651.247" fx="369.083" fy="651.247" r="46.636"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4108" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" gradientUnits="userSpaceOnUse"/>
        <radialGradient xlink:href="#linearGradient4112" id="radialGradient4118" cx="315.875" cy="736.213" fx="315.875" fy="736.213" r="244.898" gradientTransform="matrix(1 0 0 1.0524 0 -39.4)" gradientUnits="userSpaceOnUse"/>
        <radialGradient xlink:href="#linearGradient4126" id="radialGradient4124" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient3101" id="radialGradient4223" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-1.33765 -1.33618 .42983 -1.58714 -644.427 1876.868)" cx="-136.881" cy="809.345" fx="-136.881" fy="809.345" r="52.059"/>
        <radialGradient xlink:href="#linearGradient3101" id="radialGradient4225" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-1.33765 -1.33618 .42983 -1.58714 -644.427 1876.868)" cx="-136.881" cy="809.345" fx="-136.881" fy="809.345" r="52.059"/>
        <radialGradient xlink:href="#linearGradient3101" id="radialGradient4388" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-1.33765 -1.33618 .42983 -1.58714 -644.427 1876.868)" cx="-136.881" cy="809.345" fx="-136.881" fy="809.345" r="52.059"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4453" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4455" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4457" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4459" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4461" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4463" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4465" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4467" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4469" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4471" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4473" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4475" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4477" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4479" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4481" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4483" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4485" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4487" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4489" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4491" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4493" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4495" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4497" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4499" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient4102" id="radialGradient4501" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.85376 0 0 .84085 45.772 116.892)" cx="312.999" cy="732.381" fx="312.999" fy="732.381" r="283.761"/>
        <radialGradient xlink:href="#linearGradient3939" id="radialGradient4527" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-.87573 -.5121 .4237 -.72457 322.018 1453.67)" cx="343.12" cy="736.337" fx="343.12" fy="736.337" r="50.844"/>
        <radialGradient xlink:href="#linearGradient3101" id="radialGradient4577" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-1.33765 -1.33618 .42983 -1.58714 -644.427 1876.868)" cx="-136.881" cy="809.345" fx="-136.881" fy="809.345" r="52.059"/>
        <radialGradient xlink:href="#linearGradient3939" id="radialGradient4580" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-.87573 -.5121 .4237 -.72457 322.018 2353.67)" cx="343.12" cy="736.337" fx="343.12" fy="736.337" r="50.844"/>
        <linearGradient id="linearGradient4126">
          <stop id="stop4128" offset="0" style="stop-color:#534c72;stop-opacity:1"/>
          <stop style="stop-color:#554d73;stop-opacity:.63529414" offset=".343" id="stop4130"/>
          <stop id="stop4132" offset="1" style="stop-color:#637ea1;stop-opacity:1"/>
        </linearGradient>
        <linearGradient id="linearGradient4112">
          <stop style="stop-color:#f55;stop-opacity:1" offset="0" id="stop4114"/>
          <stop style="stop-color:#f55;stop-opacity:0" offset="1" id="stop4116"/>
        </linearGradient>
        <linearGradient id="linearGradient4102">
          <stop style="stop-color:#534c72;stop-opacity:1" offset="0" id="stop4104"/>
          <stop id="stop4122" offset=".5" style="stop-color:#5b6589;stop-opacity:1"/>
          <stop style="stop-color:#637ea1;stop-opacity:1" offset="1" id="stop4106"/>
        </linearGradient>
        <linearGradient id="linearGradient4166">
          <stop style="stop-color:#585c81;stop-opacity:1" offset="0" id="stop4168"/>
          <stop style="stop-color:#637ea1;stop-opacity:1" offset="1" id="stop4170"/>
        </linearGradient>
        <linearGradient id="linearGradient4087">
          <stop style="stop-color:#7877ed;stop-opacity:1" offset="0" id="stop4089"/>
          <stop style="stop-color:#b9bafc;stop-opacity:1" offset="1" id="stop4091"/>
        </linearGradient>
        <linearGradient id="linearGradient4069">
          <stop style="stop-color:#fff;stop-opacity:1" offset="0" id="stop4071"/>
          <stop style="stop-color:#ddf1fa;stop-opacity:1" offset="1" id="stop4073"/>
        </linearGradient>
        <linearGradient id="linearGradient4018">
          <stop style="stop-color:#fff;stop-opacity:1" offset="0" id="stop4020"/>
          <stop style="stop-color:#e4f7fd;stop-opacity:1" offset="1" id="stop4022"/>
        </linearGradient>
        <linearGradient id="linearGradient3939">
          <stop id="stop3941" offset="0" style="stop-color:#ddaf99;stop-opacity:1"/>
          <stop style="stop-color:#c7527c;stop-opacity:1" offset=".83" id="stop3943"/>
          <stop id="stop3945" offset="1" style="stop-color:#a95482;stop-opacity:1"/>
        </linearGradient>
        <linearGradient id="linearGradient3918">
          <stop style="stop-color:#504369;stop-opacity:1" offset="0" id="stop3921"/>
          <stop style="stop-color:#637ea1;stop-opacity:1" offset="1" id="stop3923"/>
        </linearGradient>
        <linearGradient id="linearGradient3879">
          <stop style="stop-color:#645fe9;stop-opacity:1" offset="0" id="stop3882"/>
          <stop id="stop3891" offset=".5" style="stop-color:#b7afff;stop-opacity:1"/>
          <stop style="stop-color:#eedafa;stop-opacity:0" offset="1" id="stop3884"/>
        </linearGradient>
        <linearGradient id="linearGradient3869">
          <stop style="stop-color:#dff4fe;stop-opacity:1" offset="0" id="stop3871"/>
          <stop id="stop4014" offset=".239" style="stop-color:#e1eefa;stop-opacity:1"/>
          <stop id="stop4012" offset=".648" style="stop-color:#b4c2f8;stop-opacity:1"/>
          <stop style="stop-color:#8eb5ff;stop-opacity:1" offset="1" id="stop3873"/>
        </linearGradient>
        <linearGradient id="linearGradient3916">
          <stop style="stop-color:#817ff4;stop-opacity:1" offset="0" id="stop3918"/>
          <stop id="stop3930" offset=".25" style="stop-color:#83a5f2;stop-opacity:1"/>
          <stop id="stop3928" offset=".5" style="stop-color:#adbaf9;stop-opacity:1"/>
          <stop style="stop-color:#a2c7fc;stop-opacity:1" offset="1" id="stop3920"/>
        </linearGradient>
        <linearGradient id="linearGradient3906">
          <stop style="stop-color:#e0f2fc;stop-opacity:1" offset="0" id="stop3908"/>
          <stop style="stop-color:#9dbafc;stop-opacity:1" offset="1" id="stop3910"/>
        </linearGradient>
        <linearGradient id="linearGradient3886">
          <stop style="stop-color:#ddaf99;stop-opacity:1" offset="0" id="stop3888"/>
          <stop id="stop3894" offset=".572" style="stop-color:#c7527c;stop-opacity:1"/>
          <stop style="stop-color:#a95482;stop-opacity:1" offset="1" id="stop3890"/>
        </linearGradient>
        <linearGradient id="linearGradient3101">
          <stop id="stop3877" offset="0" style="stop-color:#dff0f9;stop-opacity:1"/>
          <stop style="stop-color:#eaf0fd;stop-opacity:1" offset=".406" id="stop3883"/>
          <stop style="stop-color:#d3d7fd;stop-opacity:1" offset=".603" id="stop3881"/>
          <stop style="stop-color:#a8cbff;stop-opacity:1" offset=".843" id="stop3879"/>
          <stop style="stop-color:#8db4f9;stop-opacity:1" offset="1" id="stop3105"/>
        </linearGradient>
        <linearGradient id="linearGradient3101-4">
          <stop id="stop3877-6" offset="0" style="stop-color:#dceffe;stop-opacity:1"/>
          <stop style="stop-color:#cfdffd;stop-opacity:1" offset=".406" id="stop3883-0"/>
          <stop style="stop-color:#c2c9f9;stop-opacity:1" offset=".603" id="stop3881-3"/>
          <stop style="stop-color:#89a4f9;stop-opacity:1" offset=".85" id="stop3879-6"/>
          <stop style="stop-color:#84afe3;stop-opacity:1" offset="1" id="stop3105-2"/>
        </linearGradient>
        <linearGradient xlink:href="#linearGradient3869" id="linearGradient3875" x1="90.007" y1="501.966" x2="245.127" y2="497.722" gradientUnits="userSpaceOnUse"/>
        <linearGradient id="linearGradient3879-7">
          <stop style="stop-color:#645fe9;stop-opacity:1" offset="0" id="stop3882-4"/>
          <stop id="stop3891-0" offset=".5" style="stop-color:#b7afff;stop-opacity:1"/>
          <stop style="stop-color:#eedafa;stop-opacity:0" offset="1" id="stop3884-9"/>
        </linearGradient>
        <linearGradient xlink:href="#linearGradient3869" id="linearGradient3159" gradientUnits="userSpaceOnUse" x1="90.007" y1="501.966" x2="245.127" y2="497.722"/>
        <linearGradient xlink:href="#linearGradient3869" id="linearGradient4054" gradientUnits="userSpaceOnUse" x1="90.007" y1="501.966" x2="245.127" y2="497.722"/>
        <linearGradient xlink:href="#linearGradient3869" id="linearGradient4575" gradientUnits="userSpaceOnUse" x1="90.007" y1="501.966" x2="245.127" y2="497.722"/>
        <linearGradient xlink:href="#linearGradient3906" id="linearGradient4577" gradientUnits="userSpaceOnUse" x1="169.696" y1="678.03" x2="457.329" y2="678.03"/>
        <linearGradient xlink:href="#linearGradient4018" id="linearGradient4583" gradientUnits="userSpaceOnUse" gradientTransform="translate(654.676)" x1="-357.073" y1="667.739" x2="-459.301" y2="549.56"/>
        <linearGradient xlink:href="#linearGradient4069" id="linearGradient4585" gradientUnits="userSpaceOnUse" gradientTransform="translate(575.666 -9.425)" x1="-216.056" y1="801.505" x2="-88.453" y2="940.709"/>
        <linearGradient xlink:href="#linearGradient3906" id="linearGradient4198" gradientUnits="userSpaceOnUse" x1="169.696" y1="678.03" x2="457.329" y2="678.03"/>
        <linearGradient xlink:href="#linearGradient4018" id="linearGradient4204" gradientUnits="userSpaceOnUse" gradientTransform="translate(654.676)" x1="-357.073" y1="667.739" x2="-459.301" y2="549.56"/>
        <linearGradient xlink:href="#linearGradient4069" id="linearGradient4206" gradientUnits="userSpaceOnUse" gradientTransform="translate(575.666 -9.425)" x1="-216.056" y1="801.505" x2="-88.453" y2="940.709"/>
        <linearGradient xlink:href="#linearGradient3906" id="linearGradient3309" gradientUnits="userSpaceOnUse" x1="169.696" y1="678.03" x2="457.329" y2="678.03"/>
        <linearGradient xlink:href="#linearGradient3869" id="linearGradient4582" gradientUnits="userSpaceOnUse" x1="90.007" y1="501.966" x2="245.127" y2="497.722"/>
        <filter id="filter4026" x="-.108" width="1.217" y="-.134" height="1.269" color-interpolation-filters="sRGB">
          <feGaussianBlur stdDeviation="9.48" id="feGaussianBlur4028"/>
        </filter>
        <filter id="filter4057" x="-.204" width="1.407" y="-.289" height="1.578" color-interpolation-filters="sRGB">
          <feGaussianBlur stdDeviation="8.607" id="feGaussianBlur4059"/>
        </filter>
        <filter id="filter4077" x="-.12" width="1.239" y="-.12" height="1.241" color-interpolation-filters="sRGB">
          <feGaussianBlur stdDeviation="10.694" id="feGaussianBlur4079"/>
        </filter>
      </defs>
      <g id="layer1" transform="translate(-.3 -452.062)">
        <g id="g4744">
          <g transform="translate(0 -900)" id="g4563">
            <path style="fill:url(#radialGradient4577);fill-opacity:1;stroke:none" id="path3591" d="M-102.703 747.777c0 28.639-23.216 51.855-51.855 51.855-28.639 0-51.855-23.216-51.855-51.855 0-28.639 23.216-51.855 51.855-51.855 28.639 0 51.855 23.216 51.855 51.855z" transform="matrix(5.09466 0 0 2.65274 1098.222 -189.601)"/>
            <path id="path4048" d="M260.22 1591.456c11.514 8.37 19.094 22.63 19.094 38.844 0 13.64-5.38 25.895-13.938 34.437l-.218.219c-.018.06-.087.148-.22.25-2.208 2.506-5.91 5.377-10.655 8.656 16.306-5.101 35.7-8.094 56.53-8.094 2.02 0 4.01.04 6 .094 1.837.051 3.66.091 5.47.188.145.01.292.023.437.03.324.019.646.044.969.063 1.528.09 3.055.19 4.562.312.094.01.188.024.282.031l.75.062c1.394.121 2.781.26 4.156.407.269.029.544.064.812.094.292.033.584.06.875.094 1.09.126 2.174.263 3.25.406.946.124 1.878.27 2.813.406.247.036.503.056.75.094 1.124.17 2.236.344 3.344.531.135.023.27.04.406.062.831.143 1.647.316 2.469.47 2.594.48 5.165.984 7.656 1.562.002 0-.002.03 0 .03 3.494.811 6.858 1.701 10.125 2.688.054-.038.107-.086.156-.125-3.747-2.536-6.995-5.063-9.75-7.469-.178-.131-.316-.218-.406-.312-.027-.024-.036-.07-.063-.094-.02-.03-.056-.071-.062-.094-8.887-8.562-14.5-21.063-14.5-35 0-16.213 7.58-30.473 19.094-38.844a741.076 741.076 0 0 1-50.094 1.688c-17.08 0-33.834-.586-50.094-1.688z" style="fill:url(#radialGradient4580);fill-opacity:1;stroke:none"/>
            <path style="fill:url(#linearGradient4582);fill-opacity:1;stroke:#637ea1;stroke-width:.30462307;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" id="path3995" d="M278.981 501.088c0 39.204-51.423 70.986-114.857 70.986-63.435 0-114.858-31.782-114.858-70.986 0-39.205 51.423-70.986 114.858-70.986 63.434 0 114.857 31.781 114.857 70.986z" transform="matrix(2.49638 0 0 1.55405 -99.416 704.11)"/>
          </g>
          <path style="opacity:.59999999999999998;fill:#c2cbfb;fill-opacity:1;stroke:none;stroke-width:1.0131572499999999;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" id="path4415" d="M-102.703 747.777a51.855 51.855 0 1 1-103.71 0 51.855 51.855 0 1 1 103.71 0z" transform="matrix(.84493 0 0 .41507 441.035 457.58)"/>
          <g style="stroke:url(#radialGradient4118)" transform="translate(-5.686 -2.732)" id="g4084">
            <path id="path3877" transform="translate(5.986 454.794)" d="M436.75 99.188c-20.997.561-46.8 10.321-72.031 28.906-40.248 29.644-66.556 72.623-66.938 105.281 4.006.103 8.15.17 12.563.188 28.168.105 60.624-2.802 74.406-8.844 19.541-8.566 25.062-8.915 35.219-13.063 3.765-1.538 18.964-4.866 38.844-8.281 20.489-28.94 29.126-59.826 20.062-81.094-6.574-15.425-21.287-23.066-40.125-23.094-.667 0-1.323-.018-2 0zm-.719 130.656c-2.081.393-4.171.813-6.281 1.187 2.093-.37 4.153-.735 6.219-1.125l.062-.062zm-39.281 6.094zm-7.563.875zm-16.968 1.656zm-9.531.75zm-64.532 1.75c.002.01-.001.02 0 .031 1.514.024 3.044.016 4.563.031-1.522-.014-3.047-.038-4.563-.062z" style="opacity:.80000000000000004;fill:url(#radialGradient3320);fill-opacity:1;stroke:url(#radialGradient4118)"/>
            <path transform="matrix(1.54727 0 0 1.63196 -125.483 -502.013)" id="path4004" d="M241.776 836.153c-28.905 14.07-58.235 15.486-66.997 3.667-8.204-11.066 18.239-16.221 43.388-34.164 25.15-17.943 36.91-26.498 51.193-27.334 10.08-.59 18.832-3.78 23.225 1.2 12.034 13.643-17.319 40.328-50.81 56.63z" style="opacity:.80000000000000004;fill:url(#radialGradient4202);fill-opacity:1;stroke:url(#radialGradient4118);filter:url(#filter4057)"/>
            <path style="opacity:.80000000000000004;fill:url(#linearGradient4204);fill-opacity:1;stroke:url(#radialGradient4118);filter:url(#filter4026)" d="M290.715 685.14c4.051-3.785 17.039 2.617 23.926.724-4.178-33.557-53.583-116.413-81.202-168.93-36.166 6.04-108.973 30.27-128.691 75.403 65.918 20.252 109.358 45.455 185.967 92.802z" id="path4016"/>
            <path style="opacity:.80000000000000004;fill:url(#linearGradient4206);fill-opacity:1;stroke:url(#radialGradient4118);filter:url(#filter4077)" d="M328.8 771.627c6.82-.699 23.579 1.211 27.92-.96 30.58 34.567 164.886 94.037 187.224 88.222 8.441 37.105-3.43 94.58-110.736 125.091-24.338-56.213-90.547-142.234-104.409-212.353z" id="path4067"/>
          </g>
          <g id="g4512">
            <path id="path3061" d="M545.97 645.643c-47.748 1.357-117.032 14.545-125.709 18.09-10.157 4.147-15.685 4.47-35.226 13.037-13.782 6.041-46.21 8.948-74.377 8.842-42.47-.16-65.816-4.577-75.47-8.344-2.079-.811-14.655-5.557-23.718-7.28-30.147-5.736-73.344-9.68-101.875-8.407" style="fill:none;stroke:#637ea1;stroke-width:.60000002;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
            <path style="fill:none;stroke:#637ea1;stroke-width:.60000002;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" d="M211.44 686.41c11.313-2.785 37.015-5.562 37.015-5.562" id="path3848"/>
            <path style="fill:none;stroke:#637ea1;stroke-width:.60000002;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" d="M452.557 678.63c-34.844-3.816-63.513-2.909-63.513-2.909" id="path3844"/>
            <path style="fill:none;stroke:#637ea1;stroke-width:.60000002;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" d="M334.143 692.764a703.264 703.264 0 0 1-6.17-7.49" id="path3846"/>
          </g>
          <g id="g4550">
            <path transform="matrix(.84493 0 0 .41507 441.035 457.58)" style="opacity:.59999999999999998;fill:none;stroke:#534c72;stroke-width:1.0131572499999999;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1" d="M-206.413 747.777c0-28.639 23.216-51.855 51.855-51.855 28.639 0 51.855 23.216 51.855 51.855" id="path4237"/>
            <path style="fill:none;stroke:#534c72;stroke-width:.60000002;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" d="M355.746 691.092c0 11.438-20.188 20.71-45.09 20.71-24.902 0-45.09-9.272-45.09-20.71" id="path4027"/>
            <path style="fill:none;stroke:#534c72;stroke-width:.60000002;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" d="M306.816 746.513c.902-21.703.659-37.663.039-53.264" id="path3872"/>
            <path style="fill:none;stroke:#534c72;stroke-width:.60000002;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" d="M322.032 747.2c-1.708-13.284-3.13-31.825-.603-54.138" id="path3876"/>
            <path style="fill:none;stroke:#534c72;stroke-width:.60000002;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" d="M289.727 748.993c7.237-13.724 6.909-38.336 4.6-56.018" id="path3878"/>
            <path style="fill:none;stroke:#534c72;stroke-width:.60000002;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" d="M276.418 754.403c7.72-8.963 14.252-33.508 4.408-61.836" id="path3880"/>
            <path style="fill:none;stroke:#534c72;stroke-width:.60000002;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" d="M334.314 749.912c-3.56-17.652-7.428-36.286-.827-57.124" id="path3884"/>
          </g>
          <g id="g4346">
            <g id="g4192" transform="translate(-5.686 -2.732)">
              <path style="fill:none;stroke:#6a84a7;stroke-width:.32020774;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" id="path3999" d="M278.981 501.088c0 39.204-51.423 70.986-114.857 70.986-63.435 0-114.858-31.782-114.858-70.986 0-39.205 51.423-70.986 114.858-70.986 63.434 0 114.857 31.781 114.857 70.986z" transform="matrix(2.35426 0 0 1.49137 -70.404 -157.297)"/>
              <path transform="matrix(2.21291 0 0 1.4036 -47.205 -109.583)" d="M278.981 501.088c0 39.204-51.423 70.986-114.857 70.986-63.435 0-114.858-31.782-114.858-70.986 0-39.205 51.423-70.986 114.858-70.986 63.434 0 114.857 31.781 114.857 70.986z" id="path4001" style="fill:none;stroke:#637ea1;stroke-width:.34044507;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path style="fill:none;stroke:#627c9f;stroke-width:.3635473;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" id="path4003" d="M278.981 501.088c0 39.204-51.423 70.986-114.857 70.986-63.435 0-114.858-31.782-114.858-70.986 0-39.205 51.423-70.986 114.858-70.986 63.434 0 114.857 31.781 114.857 70.986z" transform="matrix(2.0661 0 0 1.31835 -23.108 -62.592)"/>
              <path transform="matrix(1.92479 0 0 1.24062 .083 -18.835)" d="M278.981 501.088c0 39.204-51.423 70.986-114.857 70.986-63.435 0-114.858-31.782-114.858-70.986 0-39.205 51.423-70.986 114.858-70.986 63.434 0 114.857 31.781 114.857 70.986z" id="path4005" style="fill:none;stroke:#627a9d;stroke-width:.38827622;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path style="fill:none;stroke:#61779b;stroke-width:.4176631;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" id="path4007" d="M278.981 501.088c0 39.204-51.423 70.986-114.857 70.986-63.435 0-114.858-31.782-114.858-70.986 0-39.205 51.423-70.986 114.858-70.986 63.434 0 114.857 31.781 114.857 70.986z" transform="matrix(1.7862 0 0 1.15536 22.828 28.868)"/>
              <path transform="matrix(1.64423 0 0 1.07513 46.129 74.77)" d="M278.981 501.088c0 39.204-51.423 70.986-114.857 70.986-63.435 0-114.858-31.782-114.858-70.986 0-39.205 51.423-70.986 114.858-70.986 63.434 0 114.857 31.781 114.857 70.986z" id="path4009" style="fill:none;stroke:#607598;stroke-width:.45127371;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path style="fill:none;stroke:#5f7497;stroke-width:.49129629;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" id="path4011" d="M278.981 501.088c0 39.204-51.423 70.986-114.857 70.986-63.435 0-114.858-31.782-114.858-70.986 0-39.205 51.423-70.986 114.858-70.986 63.434 0 114.857 31.781 114.857 70.986z" transform="matrix(1.50673 0 0 .98987 68.696 122.83)"/>
              <path transform="matrix(1.37244 0 0 .90211 90.915 173.037)" d="M278.981 501.088c0 39.204-51.423 70.986-114.857 70.986-63.435 0-114.858-31.782-114.858-70.986 0-39.205 51.423-70.986 114.858-70.986 63.434 0 114.857 31.781 114.857 70.986z" id="path4013" style="fill:none;stroke:#5e7093;stroke-width:.53923166;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path style="fill:none;stroke:#5f7195;stroke-width:.59937316;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" id="path4015" d="M278.981 501.088c0 39.204-51.423 70.986-114.857 70.986-63.435 0-114.858-31.782-114.858-70.986 0-39.205 51.423-70.986 114.858-70.986 63.434 0 114.857 31.781 114.857 70.986z" transform="matrix(1.23435 0 0 .81184 113.757 224.677)"/>
              <path id="path4017" d="M442.038 639.074c0 28.746-56.276 52.05-125.696 52.05-69.42 0-125.696-23.304-125.696-52.05 0-28.747 56.276-52.05 125.696-52.05 69.42 0 125.696 23.303 125.696 52.05z" style="fill:none;stroke:#5d6a8e;stroke-width:.60000002;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path style="fill:none;stroke:#5c688c;stroke-width:.76538277;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" id="path4019" d="M278.981 501.088c0 39.204-51.423 70.986-114.857 70.986-63.435 0-114.858-31.782-114.858-70.986 0-39.205 51.423-70.986 114.858-70.986 63.434 0 114.857 31.781 114.857 70.986z" transform="matrix(.95599 0 0 .64282 159.442 324.388)"/>
              <path transform="matrix(.819 0 0 .55772 181.925 376.096)" d="M278.981 501.088c0 39.204-51.423 70.986-114.857 70.986-63.435 0-114.858-31.782-114.858-70.986 0-39.205 51.423-70.986 114.858-70.986 63.434 0 114.857 31.781 114.857 70.986z" id="path4021" style="fill:none;stroke:#5b6488;stroke-width:.88777387;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path style="fill:none;stroke:#5a6185;stroke-width:1.06154227;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" id="path4023" d="M278.981 501.088c0 39.204-51.423 70.986-114.857 70.986-63.435 0-114.858-31.782-114.858-70.986 0-39.205 51.423-70.986 114.858-70.986 63.434 0 114.857 31.781 114.857 70.986z" transform="matrix(.68626 0 0 .46552 203.71 432.365)"/>
              <path transform="matrix(.55012 0 0 .37332 226.054 490.647)" d="M278.981 501.088c0 39.204-51.423 70.986-114.857 70.986-63.435 0-114.858-31.782-114.858-70.986 0-39.205 51.423-70.986 114.858-70.986 63.434 0 114.857 31.781 114.857 70.986z" id="path4025" style="fill:none;stroke:#585d82;stroke-width:1.32397592;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path id="path4039" d="M271.253 693.824c0-11.439 20.187-20.711 45.09-20.711 24.902 0 45.089 9.272 45.089 20.71" style="fill:none;stroke:#57587d;stroke-width:.60000002;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
            </g>
            <g id="g4327">
              <path style="fill:none;stroke:#637ea1;stroke-width:.17273384;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" id="path4365" d="M-102.703 747.777c0 28.639-23.216 51.855-51.855 51.855-28.639 0-51.855-23.216-51.855-51.855 0-28.639 23.216-51.855 51.855-51.855 28.639 0 51.855 23.216 51.855 51.855z" transform="matrix(4.81174 0 0 2.50753 1054.494 -987.831)"/>
              <path transform="matrix(4.53344 0 0 2.3613 1011.48 -885.006)" d="M-102.703 747.777c0 28.639-23.216 51.855-51.855 51.855-28.639 0-51.855-23.216-51.855-51.855 0-28.639 23.216-51.855 51.855-51.855 28.639 0 51.855 23.216 51.855 51.855z" id="path4367" style="fill:none;stroke:#637ea1;stroke-width:.18338384;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path style="fill:none;stroke:#637ea1;stroke-width:.19583283;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" id="path4369" d="M-102.703 747.777c0 28.639-23.216 51.855-51.855 51.855-28.639 0-51.855-23.216-51.855-51.855 0-28.639 23.216-51.855 51.855-51.855 28.639 0 51.855 23.216 51.855 51.855z" transform="matrix(4.26691 0 0 2.19998 970.286 -770.597)"/>
              <path transform="matrix(3.98532 0 0 2.04551 926.764 -661.677)" d="M-102.703 747.777c0 28.639-23.216 51.855-51.855 51.855-28.639 0-51.855-23.216-51.855-51.855 0-28.639 23.216-51.855 51.855-51.855 28.639 0 51.855 23.216 51.855 51.855z" id="path4371" style="fill:none;stroke:#637ea1;stroke-width:.2101448;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path style="fill:none;stroke:#627c9f;stroke-width:.2265096;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" id="path4373" d="M-102.703 747.777c0 28.639-23.216 51.855-51.855 51.855-28.639 0-51.855-23.216-51.855-51.855 0-28.639 23.216-51.855 51.855-51.855 28.639 0 51.855 23.216 51.855 51.855z" transform="matrix(3.70373 0 0 1.89448 883.242 -555.502)"/>
              <path transform="matrix(3.4186 0 0 1.74688 839.172 -452.428)" d="M-102.703 747.777c0 28.639-23.216 51.855-51.855 51.855-28.639 0-51.855-23.216-51.855-51.855 0-28.639 23.216-51.855 51.855-51.855 28.639 0 51.855 23.216 51.855 51.855z" id="path4375" style="fill:none;stroke:#607699;stroke-width:.24552511;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path style="fill:none;stroke:#607699;stroke-width:.2678836;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" id="path4377" d="M-102.703 747.777c0 28.639-23.216 51.855-51.855 51.855-28.639 0-51.855-23.216-51.855-51.855 0-28.639 23.216-51.855 51.855-51.855 28.639 0 51.855 23.216 51.855 51.855z" transform="matrix(3.14354 0 0 1.59585 796.66 -345.898)"/>
              <path transform="matrix(2.84988 0 0 1.44825 751.273 -242.824)" d="M-102.703 747.777c0 28.639-23.216 51.855-51.855 51.855-28.639 0-51.855-23.216-51.855-51.855 0-28.639 23.216-51.855 51.855-51.855 28.639 0 51.855 23.216 51.855 51.855z" id="path4379" style="fill:none;stroke:#5f7396;stroke-width:.29533616;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path style="fill:none;stroke:#5e7093;stroke-width:.32890639;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" id="path4392" d="M-102.703 747.777c0 28.639-23.216 51.855-51.855 51.855-28.639 0-51.855-23.216-51.855-51.855 0-28.639 23.216-51.855 51.855-51.855 28.639 0 51.855 23.216 51.855 51.855z" transform="matrix(2.5928 0 0 1.28348 711.537 -127.094)"/>
              <path transform="matrix(2.30314 0 0 1.13245 666.768 -21.987)" d="M-102.703 747.777c0 28.639-23.216 51.855-51.855 51.855-28.639 0-51.855-23.216-51.855-51.855 0-28.639 23.216-51.855 51.855-51.855 28.639 0 51.855 23.216 51.855 51.855z" id="path4405" style="fill:none;stroke:#5d6c90;stroke-width:.37151974;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path transform="matrix(1.72332 0 0 .85098 577.153 170.334)" d="M-102.703 747.777c0 28.639-23.216 51.855-51.855 51.855-28.639 0-51.855-23.216-51.855-51.855 0-28.639 23.216-51.855 51.855-51.855 28.639 0 51.855 23.216 51.855 51.855z" id="path4409" style="fill:none;stroke:#5b6589;stroke-width:.49545991;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path id="path3251" style="fill:none;stroke:#5c698d;stroke-width:.42629841;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" d="M-102.703 747.777c0 28.639-23.216 51.855-51.855 51.855-28.639 0-51.855-23.216-51.855-51.855 0-28.639 23.216-51.855 51.855-51.855 28.639 0 51.855 23.216 51.855 51.855z" transform="matrix(2.01846 0 0 .98142 622.77 82.764)"/>
              <path style="fill:none;stroke:#5775a2;stroke-width:.59322113;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" id="path4411" d="M-102.703 747.777c0 28.639-23.216 51.855-51.855 51.855-28.639 0-51.855-23.216-51.855-51.855 0-28.639 23.216-51.855 51.855-51.855 28.639 0 51.855 23.216 51.855 51.855z" transform="matrix(1.44732 0 0 .70681 534.495 267.46)"/>
              <path transform="matrix(1.16075 0 0 .56782 489.848 358.933)" d="M-102.703 747.777c0 28.639-23.216 51.855-51.855 51.855-28.639 0-51.855-23.216-51.855-51.855 0-28.639 23.216-51.855 51.855-51.855 28.639 0 51.855 23.216 51.855 51.855z" id="path4413" style="fill:none;stroke:#595d82;stroke-width:.73905116;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path id="path4034" d="M350.046 758.744c2.701 2.795 4.212 5.92 4.212 9.22 0 11.887-19.616 21.523-43.814 21.523s-43.814-9.636-43.814-21.523c0-3.118 1.349-6.08 3.776-8.755" style="fill:none;stroke:#57587d;stroke-width:.59999996;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1"/>
              <path transform="matrix(4.81174 0 0 2.50753 1054.494 -987.831)" d="M-102.703 747.777c0 28.639-23.216 51.855-51.855 51.855-28.639 0-51.855-23.216-51.855-51.855 0-28.639 23.216-51.855 51.855-51.855 28.639 0 51.855 23.216 51.855 51.855z" id="path4213" style="fill:none;stroke:#637ea1;stroke-width:.17273384;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path transform="matrix(5.09466 0 0 2.65274 1098.222 -1089.601)" d="M-102.703 747.777c0 28.639-23.216 51.855-51.855 51.855-28.639 0-51.855-23.216-51.855-51.855 0-28.639 23.216-51.855 51.855-51.855 28.639 0 51.855 23.216 51.855 51.855z" id="path4217" style="fill:none;stroke:#567dae;stroke-width:.16320983;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
            </g>
          </g>
          <g style="stroke:url(#radialGradient4108)" transform="translate(-5.686 -2.732)" id="g4263">
            <g style="stroke:url(#radialGradient4473)" id="g4251">
              <path id="path3852" d="M48.702 625.573c127.024 16.432 180.09 43.858 199.055 56.575" style="fill:none;stroke:url(#radialGradient4453);stroke-width:.60000002;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path id="path3854" d="M29.496 581.015c157.88 46.2 211.006 84.182 228.186 103.218" style="fill:none;stroke:url(#radialGradient4455);stroke-width:.60000002;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path id="path3856" d="M55.547 539.35c108.684 53.074 187.04 103.801 214.102 146.584" style="fill:none;stroke:url(#radialGradient4457);stroke-width:.60000002;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path id="path3858" d="M116.123 506.459c95.687 75.446 152.094 141.847 167.695 180.773" style="fill:none;stroke:url(#radialGradient4459);stroke-width:.60000002;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path id="path3860" d="M200.222 484.603c39.158 62.894 85.073 144.308 97.75 203.379" style="fill:none;stroke:url(#radialGradient4461);stroke-width:.60000002;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path id="path3868" d="M355.904 686.295c29.13-58.295 149.032-133.017 198.707-161.92" style="fill:none;stroke:url(#radialGradient4463);stroke-width:.60000002;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path id="path3870" d="M368.488 684.993c39.146-51.235 174.455-102.51 227.93-122.536" style="fill:none;stroke:url(#radialGradient4465);stroke-width:.60000002;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path id="path3866" d="M342.472 687.51c20.095-66.989 106.365-156.637 140.56-191.623" style="fill:none;stroke:url(#radialGradient4467);stroke-width:.60000002;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path id="path3864" d="M393.632 479.335c-49.056 112.176-65.362 193.77-66.233 208.888" style="fill:none;stroke:url(#radialGradient4469);stroke-width:.60000002;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path id="path3862" d="M312.392 688.316c-4.947-116.378-15.33-193.51-16.859-212.797" style="fill:none;stroke:url(#radialGradient4471);stroke-width:.60000002;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
            </g>
            <g id="g3900" style="stroke:url(#radialGradient4501);stroke-width:.60000002;stroke-miterlimit:4;stroke-dasharray:none">
              <path id="path4046" d="M448.063 1016.097c-22.881-38.873-113.637-185.038-118.428-263.766-1.327-21.816 4.199-41.277 20.007-57.209" style="fill:none;stroke:url(#radialGradient4124);stroke-width:.60000002;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path id="path4050" d="M531.816 976.501c-97.41-80.125-175.436-158.687-188.814-211.708-7.896-31.291-.448-56.093 23.092-70.606" style="fill:none;stroke:url(#radialGradient4475);stroke-width:.60000002;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path id="path4052" d="M575.59 869.805c-96.12-25.706-170.581-54.722-213.715-99.121" style="fill:none;stroke:url(#radialGradient4477);stroke-width:.60000002;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path id="path4054" d="M537.088 821.075c-22.534-1.307-44.43-5.508-64.987-8.912-54.198-8.973-93.09-28.503-110.576-44.037" style="fill:none;stroke:url(#radialGradient4479);stroke-width:.60000002;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path id="path4060" d="M129.66 994.674c64.516-69.237 165.036-179.752 165.036-248.876 0-26.21-7.79-36.814-26.849-51.472" style="fill:none;stroke:url(#radialGradient4481);stroke-width:.60000002;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path id="path4062" d="M69.99 946.378c48.09-29.362 177.45-107.157 209.272-174.72 7.233-15.356 7.96-32.288 4.51-49.77" style="fill:none;stroke:url(#radialGradient4483);stroke-width:.60000002;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path style="fill:none;stroke:url(#radialGradient4485);stroke-width:.60000002;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" d="M52.475 891.77c62.867-21.582 139.467-54.812 177.058-82.368 28.873-21.165 47.267-40.33 47.695-49.575" id="path4064"/>
              <path id="path3051" d="M75.642 840.175c76.053-12.487 136.717-31.807 166.925-52.002 13.348-8.924 24.265-15.54 28.484-20.69" style="fill:none;stroke:url(#radialGradient4487);stroke-width:.60000002;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path id="path3053" d="M131.451 798.606c71.992 1.163 111.92-13.877 131.265-23.946" style="fill:none;stroke:url(#radialGradient4489);stroke-width:.60000002;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path id="path3055" d="M209.272 771.03c27.965 8.408 51.999 4.925 52.038 4.555" style="fill:none;stroke:url(#radialGradient4491);stroke-width:.60000002;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path id="path3057" d="M470.937 785.175c-80.643 8.334-108.144-15.412-108.008-15.832" style="fill:none;stroke:url(#radialGradient4493);stroke-width:.60000002;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path id="path3059" d="M388.656 764.425c-17.672 7.874-24.137 6.23-24.137 6.23" style="fill:none;stroke:url(#radialGradient4495);stroke-width:.60000002;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path id="path4044" d="M338.825 1033.86c-9.06-91.509-20.947-224.031-20.947-282.909.343-16.647-.599-39.577 5.01-55.108" style="fill:none;stroke:url(#radialGradient4497);stroke-width:.60000002;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
              <path id="path4056" d="M224.842 1025.843c35.612-90.656 80.945-208.6 80.945-279.633 0-20.606-3.833-38.053-15.653-50.842" style="fill:none;stroke:url(#radialGradient4499);stroke-width:.60000002;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
            </g>
          </g>
          <g id="g4573">
            <path style="opacity:.5;fill:url(#radialGradient4527);fill-opacity:1;stroke:none" d="M260.22 691.456c11.514 8.37 19.094 22.63 19.094 38.844 0 13.64-5.38 25.895-13.938 34.437l-.218.219c-.018.061-.087.148-.22.25-2.208 2.506-5.91 5.377-10.655 8.656 16.306-5.101 35.7-8.094 56.53-8.094 2.02 0 4.01.04 6 .094 1.837.05 3.66.092 5.47.188.145.008.292.023.437.03.324.019.646.044.969.063 1.528.092 3.055.19 4.562.313.094.008.188.023.282.031l.75.063c1.394.12 2.781.258 4.156.406.269.028.544.064.812.094.292.032.584.06.875.093 1.09.126 2.174.264 3.25.406.946.125 1.878.27 2.813.407.247.036.503.056.75.093 1.124.17 2.236.345 3.344.532.135.023.27.039.406.062.831.143 1.647.316 2.469.469 2.594.481 5.165.985 7.656 1.562.002 0-.002.031 0 .032 3.494.81 6.858 1.7 10.125 2.687.055-.038.107-.086.156-.125-3.747-2.536-6.995-5.063-9.75-7.469-.178-.131-.316-.218-.406-.312-.027-.024-.036-.07-.063-.094-.02-.028-.056-.07-.062-.094-8.887-8.561-14.5-21.062-14.5-35 0-16.212 7.58-30.472 19.094-38.843a741.076 741.076 0 0 1-50.094 1.687c-17.08 0-33.834-.586-50.094-1.687z" id="path4419"/>
            <path id="path3273" d="M260.22 691.456c11.514 8.37 19.094 22.63 19.094 38.844 0 13.64-5.38 25.895-13.938 34.437l-.218.219c-.018.061-.087.148-.22.25-2.208 2.506-5.91 5.377-10.655 8.656 16.306-5.101 35.7-8.094 56.53-8.094 2.02 0 4.01.04 6 .094 1.837.05 3.66.092 5.47.188.145.008.292.023.437.03.324.019.646.044.969.063 1.528.092 3.055.19 4.562.313.094.008.188.023.282.031l.75.063c1.394.12 2.781.258 4.156.406.269.028.544.064.812.094.292.032.584.06.875.093 1.09.126 2.174.264 3.25.406.946.125 1.878.27 2.813.407.247.036.503.056.75.093 1.124.17 2.236.345 3.344.532.135.023.27.039.406.062.831.143 1.647.316 2.469.469 2.594.481 5.165.985 7.656 1.562.002 0-.002.031 0 .032 3.494.81 6.858 1.7 10.125 2.687.055-.038.107-.086.156-.125-3.747-2.536-6.995-5.063-9.75-7.469-.178-.131-.316-.218-.406-.312-.027-.024-.036-.07-.063-.094-.02-.028-.056-.07-.062-.094-8.887-8.561-14.5-21.062-14.5-35 0-16.212 7.58-30.472 19.094-38.843a741.076 741.076 0 0 1-50.094 1.687c-17.08 0-33.834-.586-50.094-1.687z" style="fill:none;stroke:#534c72;stroke-width:.60000002;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
          </g>
        </g>
      </g>
    </svg>
  </div>
  <div v-else-if="protocol===Protocol.Sunny">
    <img :height="size" :width="size" src="../assets/logos/sunny.png"/>
  </div>
  <div v-else-if="protocol===Protocol.Orca">
    <img :height="size" :width="size" src="../assets/logos/orca.png"/>
  </div>
  <div v-else-if="protocol===Protocol.Solfarm">
    <img :height="size" :width="size" src="../assets/logos/solfarm.png"/>
  </div>
  <div v-else-if="protocol===Protocol.Parrot">
    <img :height="size" :width="size" src="../assets/logos/parrot.png"/>
  </div>
  <div v-else-if="protocol===Protocol.Marinade">
    <img :height="size" :width="size" src="../assets/logos/marinade.png"/>
  </div>
  <div v-else-if="protocol===Protocol.Mercurial">
    <img :height="size" :width="size" src="../assets/logos/mercurial.png"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Protocol } from '@dbricks/dbricks-ts';

export default defineComponent({
  props: {
    protocol: String,
    size: Number,
  },
  setup() {
    return {
      Protocol,
    };
  },
});
</script>

<style scoped>

</style>
