// escena 1 
//alicia camina hacia el centro de la pantalla mientras se hace scroll 

//escena 2 
//al llegar al centro de la pantalla comienza a caer por un hoyo "magico" lleno de colores, tazas flotando y tonos morados y azules

//escena 3
//al llegar "abajo" aparece un texto de hacer click y que presionarlo aparece el gato de la pelicula en lugares random de la pantalla 


let scrollProgress = 0;

let aliceX;
let aliceY;

let cheshire = null;

let particles = [];
let cups = [];

const STATE_WALK = 0;
const STATE_FALL = 1;
const STATE_BOTTOM = 2;

let state = STATE_WALK;


function setup() {

  createCanvas(windowWidth, windowHeight);
 
  aliceX = width * 0.15;
  aliceY = height * 0.66 - 80;

// Partículas mágicas
  for (let i = 0; i < 220; i++) { 

    particles.push({
      x: random(width),
      y: random(height + 300, height + 2300),
      //ancho y alto de su distribuición 
      size: random(2, 8),
      speed: random(0.2, 1),
      phase: random(TWO_PI)});}
  
// Tazas flotando

  for (let i = 0; i < 28; i++) { cups.push({
 x: random(width * 0.2, width * 0.800),
 y: random(height + 300, height + 2300),
    //ANCHO, ALTO ESPACIO
angle: random(TWO_PI),
rotSpeed: random(-0.2, 0.02),
scale: random(0.7, 2.3) 
    //TAMAÑO
});}}

function draw() {
  background(0);

  // CÁMARA
  let cameraY = 0;
if (scrollProgress > 500) {cameraY = map(scrollProgress,500,1500,0,1200,true);}
//numeros grandes bajan a destiempo
  push();
translate(0, -cameraY);drawWorld();pop()

  // TEXTO FINAL (click)
 if (state === STATE_BOTTOM) {
 let glow = 200 + sin(frameCount * 0.08) * 55;

    fill(glow);
    textAlign(CENTER, CENTER);
    textSize(28);
    text("CLICK", width / 2, height * 0.2); }}

// MUNDO
function drawWorld() {
  let skyHeight = height * 0.76;
  let groundY = skyHeight;

  // CIELO
  let darkness =
    map( scrollProgress,300,1200,0,220,true);
  //que tan rapido cambia, desde claro a oscuro,opacidad, cuanto 
  
  noStroke();
  fill(140 - darkness * 0.5,
       200 - darkness * 0.7,
       255 - darkness);
  //trancision de tonos de azul cielo
  rect(0, 0, width, skyHeight);
  //espacio que ocupa el cielo

// APERTURA DEL AGUJERO
  let holeOpen =
    constrain(
    map(scrollProgress,450,650,0,280),0,280);
  //que tan antes comienza, se activa dependiendo de pos alicia, si esta en 0 comienza oculto, lo mismo xd
  
  // SUELO VERDE
  fill(90, 170, 90);
  rect(0,groundY,width / 2 - holeOpen / 2,height);
  rect(width / 2 + holeOpen / 2,groundY,width,height);
 
  // TÚNEL
  let lowerTop = height + 250;
  //altura suelo 2
  drawWonderTunnel(lowerTop);
  drawTunnelWalls(lowerTop);

  // PARTÍCULAS
  drawParticles();
  
  // TAZAS
  drawFlyingCups();

  // SUELO INFERIOR
  fill(40, 30, 90);
  rect(0,lowerTop + 650,width,300);
  //desde donde empieza lado, nº altura, grosor

  // MOVIMIENTO DE ALICIA
  if (scrollProgress < 500) {state = STATE_WALK;
    aliceX =map(scrollProgress,0 ,500 ,width * 0.15,width * 0.5);
// pos x 0, sensibilidad mov lado
    aliceY = groundY - 40;
  } else {
    state = STATE_FALL;
    aliceX = width * 0.5;
    aliceY =map(scrollProgress,500,1500,groundY - 90,lowerTop + 580, true );

    if (scrollProgress >= 1450) {
      state = STATE_BOTTOM; }}

  // FOCO MÁGICO
  if (scrollProgress > 650) {
    //se prende a los 650 s
    blendMode(ADD);

    for (let r = 550; r > 0; r -= 12) {
      let alpha =map(r,600,0,0,14);
      //amplitud aura, opacidad, brillo, degrade
      fill(180,150,255,alpha);
      //color morado
      ellipse(aliceX,aliceY,r,r * 1.6);}
    //le da la forma de ovalo, nº que tan estirado
    blendMode(BLEND);}

  // ALICIA
  drawAlice(aliceX, aliceY);

  // GATO
  if (cheshire) {
    drawCheshire(cheshire.x,cheshire.y);}}

// TÚNEL 
function drawWonderTunnel(topY) {
  push();translate(width / 2,topY + 900);
  noStroke();
  for (let r = 1800; r > 0;r -= 10 ) 
  { if ((r / 90) % 2 === 0) {
      fill(35, 25, 255);} else {
    fill(5, 5, 70);}
    ellipse(0,0,r * 1.2,r);}pop();}

// PAREDES DEL TÚNEL
function drawTunnelWalls(topY) {
  fill(85, 70, 180);
  beginShape();
  vertex(0, topY);
  for (let y = 0;y < 1800;y += 50) {
    let offset =
      sin(y * 0.02 +frameCount * 0.01) * 30;
    vertex(width * 0.18 + offset,topY + y);
  }
  vertex(0, topY + 1800);
  endShape(CLOSE);
  beginShape();
  vertex(width, topY);

  for (let y = 0; y < 1800; y += 50) {
    let offset =sin( y * 0.02 + 5 + frameCount * 0.01) * 30;

    vertex(width -width * 0.18 +offset,topY + y);}
  vertex(width, topY + 1800);
  endShape(CLOSE);}

// TAZAS VOLADORAS
function drawFlyingCups() {
  for (let c of cups) {
    push();
    translate(c.x, c.y);
    rotate(frameCount *c.rotSpeed +c.angle);
    scale(c.scale);

    fill(255, 245, 220);
    rect(-15,-10,30,20,4 );
    noFill();
    stroke(255);
    ellipse(15,0,12,12);
 noStroke();
fill(255,120,180);
    rect(-15,-10,30,4);
    fill(255);
    ellipse(0,-10,24,5);
    pop();
  }}
// ALICIA
function drawAlice(x, y) {
  push();
  translate(x, y);
  if (state === STATE_FALL) {
    rotate(-0.35);
  }
  // cabello
  fill(245, 220, 90);
  ellipse(-2,-14,55,90);
  
  // cabeza
  fill(255, 225, 200);
  ellipse( 0,-25,30,36);

  // ojos
  fill(0);
  circle(-5, -28, 5);
  circle(5, -28, 5);

  // vestido
  fill(70, 150, 255);
  beginShape();
  vertex(-10, -5);
  vertex(10,-5);
  vertex(40, 70);
  vertex(-40, 70);
  endShape(CLOSE);


  // delantal
  fill(255);
  beginShape();
  vertex(-18, 35);
  vertex(18, 35);
  vertex(30, 60);
  vertex(-30, 60);
  endShape(CLOSE);

  // brazos
  stroke(255, 225, 200);
  strokeWeight(4);
  line(-20, 10, -40, 30);
  line(20, 10,40, 40);

  // piernas
  line(-10, 70, -30, 100);
  line(10, 70, 30,100);
  noStroke();

  // zapatos
  fill(20);
  ellipse(-30, 100, 12, 7);
  ellipse(30, 100, 12, 7);
  pop();
}
// GATO DE CHESHIRE
function drawCheshire(x, y) {
  push();
  translate(x, y);
  // cuerpo
  fill(130, 60, 255);
  ellipse(0,25,70, 40);

  // rayas
  fill(70, 180, 255);
  rect(-22, 5, 8, 40);
  rect(-5, 5, 8, 40);
  rect(12, 5, 8, 40);

  // cabeza
fill(130, 60, 255);
ellipse(0,-25,90,70);

  // rayas cabeza
fill(70, 180, 255);
  rect(-28, -55, 10, 50);
  rect(-5, -60, 10, 60);
  rect(18, -55, 10, 50);

  // orejas
  triangle(-30, -40,
    -10, -80,
    0, -40);

  triangle(30, -40,
    10, -80,
    0, -40);

  // ojos
  fill(255, 255, 100);
  ellipse(-20, -25, 16, 24);
  ellipse(20, -25, 16, 24);

  fill(0);
  ellipse(-20, -25, 4, 14);
  ellipse(20, -25, 4, 14);

  // sonrisa
  noFill();
  stroke(255);
strokeWeight(4);

  arc(0,0,75,40,0.1,PI - 0.1);
  for (let i = -28;
    i <= 28;
    i += 6) {
    line(i, 12, i, 0);}pop();
}

// PARTÍCULAS MÁGICAS
function drawParticles() {
  noStroke();

  for (let p of particles) {
    p.y -= p.speed;
    p.x +=sin(frameCount * 0 +p.phase) * 0.5;

    if (p.y < height + 150) {
      p.y =height +random( 1500, 2200);
      p.x = random(width);}

    let mix =map(
        sin(frameCount * 0.04 +p.phase ),-1,1,0,1);

    let c =lerpColor(
        color(80, 220, 255),
        color(190, 70, 255),mix);

    fill(red(c),green(c),blue(c),200);
    circle(p.x,p.y,p.size); }}

// SCROLL
function mouseWheel(event) {
  scrollProgress += event.delta * 0.5;
  scrollProgress =
    constrain(scrollProgress, 0,1600);
  return false;
}
// CLICK
function mousePressed() {
  if (state === STATE_BOTTOM) {
    let lowerTop =
      height + 250;
    cheshire = {
      x: random(width * 0.25,width * 0.75 ),
y: lowerTop + 620
    }; }}
// RESIZE
function windowResized() {
  resizeCanvas(
    windowWidth,
    windowHeight
  );
}