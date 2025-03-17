let colors = [];
let offsets = [];
let lengths = [];
let iframe;

function setup() {
  // 設置畫布為透明
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'absolute');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '1'); // 將畫布放在前景
  canvas.style('pointer-events', 'none'); // 讓滑鼠事件穿透畫布
  
  // 嵌入 iframe
  iframe = createElement('iframe', '');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  iframe.attribute('width', windowWidth);
  iframe.attribute('height', windowHeight);
  iframe.style('position', 'absolute');
  iframe.style('top', '0');
  iframe.style('left', '0');
  iframe.style('z-index', '-1'); // 將 iframe 放在背景
  
  let numLines = 90; // 線條數量，變為原來的三倍
  for (let j = 0; j < numLines; j++) {
    let r = random(255);
    let g = random(255);
    let b = random(255);
    colors.push([r, g, b]); // 隨機顏色
    offsets.push(random(TWO_PI)); // 隨機相位偏移量
    lengths.push(random(windowHeight / 4, windowHeight / 2)); // 隨機長度
  }
}

function draw() {
  clear(); // 清除畫布，保留背景
  let numLines = 40; // 線條數量，變為原來的三倍
  let spacing = windowWidth / numLines; // 線條之間的間距
  
  for (let j = 0; j < numLines; j++) {
    let x1 = spacing * j + spacing / 2;
    let y1 = windowHeight;
    let y2 = windowHeight - lengths[j]; // 使用隨機長度
    
    let [r, g, b] = colors[j];
    let offset = offsets[j];
    stroke(r, g, b, 150); // 使用預先生成的顏色，並設置透明度
    strokeWeight(20); // 增粗線條
    noFill();
    
    beginShape();
    for (let i = 0; i <= 100; i++) {
      let t = i / 100;
      let x = lerp(x1, x1 + sin(t * PI * 4 + frameCount * 0.01 + offset) * 50, t); // S 型曲線，慢慢左右運動
      let y = lerp(y1, y2, t);
      vertex(x, y);
    }
    endShape();
  }
}
