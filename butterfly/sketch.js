let click;
let bgAnim;
let font;
let butterflies = [];

let words = [
  "without",
  "hello",
  "fly",
  "dream",
  "love",
  "voyeurism",
  "fuck",
  "move",
  "soft",
  "free"
];

async function setup() {
  createCanvas(960, 540, WEBGL);
  ambient = loadSound("nature.wav");
  bgAnim = await loadImage('flowers_bg_5.gif');
  font = await loadFont('assets/Inconsolata-Regular.ttf');
  click = await loadSound('JIN_ENVSOUND_2.wav');
  textFont(font);
  textSize(30);
  textAlign(CENTER, CENTER);

  
  for (let i = 0; i < 10; i++) {
    butterflies.push({
      txt: words[i],
      seed: i * 100,
      tx: 0,
      ty: 0
    });
  }
}

function draw() {
  background(200);
  fill(255);
  noStroke();
  
  // Background GIF
  push();
  translate(0, 0, -150);
  texture(bgAnim);
  plane(1150, 646);
  pop();




  for (let i = 0; i < butterflies.length; i++) {
    let b = butterflies[i];

    
    if (mouseIsPressed) {
      b.tx = (noise(frameCount * 0.01 + b.seed) - 0.5) * 800;
      b.ty = (noise(frameCount * 0.01 + b.seed + 100) - 0.5) * 400;
    } else {
      b.tx = 0;
      b.ty = 0;
    }

    let flap = sin(frameCount * 0.12 + b.seed) * 0.8;


    push();
    translate(b.tx - 40, b.ty, 0);
    rotateY(-flap);
    text(b.txt, -15, 0);
    pop();


    push();
    translate(b.tx + 40, b.ty, 0);
    rotateY(flap);
    text(b.txt, 15, 0);
    pop();
  }
}

function mousePressed() {
  click.play();
}

function mouseReleased() {
  click.stop();
}

