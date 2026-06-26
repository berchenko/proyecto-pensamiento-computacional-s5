# proyecto-pensamiento-computacional-s5
## Link de web pública (github pages)

https://berchenko.github.io/sketch-interactivo-alicia/

### Título del proyecto

Alicia y el mundo psicoldelico 

### Referencia de origen / bibliografía

Alicia en el país de las maravillas, Lewis Carroll 1865

### Imagen de referencia de proyecto

Deja acá una imagen de la "portada" de tu proyecto. Como si fuera un afiche. Puede ser un fotograma de toda la interacción.

### Integrantes

alicia berchenko @berchenko 

### Enlace de p5.js 

https://editor.p5js.org/a.berchenko/sketches/06IpnSfd3

### Relato inicial

Alicia está caminando, se cae por un hoyo y pasa a un mundo psicodelico

### Storyboard

Imágenes del storyboard, las que deben verse acá y estar subidas en el mismo repositorio

### Estados
#### Estado 1

En el primer estado alicia esta camimando mientras se hace scroll

```js
 if (scrollProgress < 500) {state = STATE_WALK;
    aliceX =map(scrollProgress,0 ,500 ,width * 0.15,width * 0.5);
// pos x 0, sensibilidad mov lado
    aliceY = groundY - 40;

```


#### Estado 2

Alicia cae por un hoyo

```js
//alicia cae
let holeOpen =
    constrain(
    map(scrollProgress,450,650,0,280),0,280);
  //que tan antes comienza, se activa dependiendo de pos alicia, si esta en 0 comienza oculto
```
```js
 } else {
    state = STATE_FALL;
    aliceX = width * 0.5;
    aliceY =map(scrollProgress,500,1500,groundY - 90,lowerTop + 580, true );

    if (scrollProgress >= 1450) {
      state = STATE_BOTTOM; }}

```
### Estado 3

Aparece y desarparece el gato del mundo mágico mientras haces "click"

```js
function mousePressed() {
  if (state === STATE_BOTTOM) {
    let lowerTop =
      height + 250;
    cheshire = {
      x: random(width * 0.25,width * 0.75 ),
y: lowerTop + 620
    }; }}
```
