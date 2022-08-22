//Agregar el evento click al boton
let btnStart = document.querySelector(".start");

btnStart.addEventListener("click", () => {
  console.log("inicia el juegooooooooo");
});

//Imagenes

const trexito = new Image();
trexito.src = "trex1.webp";

const cactusImg = new Image();
cactusImg.src = "cactus1.webp";

const huesoImg = new Image();
huesoImg.src = "hueso.png";
console.log(trexito);
//Seleccionar canvas

let lienzo = document.getElementById("lienzo");
let ctx = lienzo.getContext("2d");
//w 330 h 210

//Lista de enemigos/otros elementos

const nopalitos = [];
const huesos = [];

//Nuestro Personaje --> class
class Trex {
  constructor(x, y, w, h, color, vida, imagen) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.vida = vida;
    this.imagen = imagen;
    this.saltando = false;
  }
  avanzar() {
    console.log("Avanzarrrrrr", this.x);
    if (this.x + this.w < 330) {
      this.x += 10;
    }
  }
  retroceder() {
    console.log("retroceder");
    if (this.x > 0) {
      this.x -= 10;
    }
  }
  saltar() {
    console.log("saltar");
    if (this.x < 220) {
      this.saltando = true;
    }
  }
  agacharse() {
    console.log("agacharse");
  }
  dibujarse() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    //imagen
    ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h);
  }
  morirse() {}
  disparar() {
    console.log("dispara");
    const huesito = new Hueso(this.x + this.w, this.y + 10, 20, 40, huesoImg);
    huesos.push(huesito);
    console.log(huesos);
  }
}

//Nuestro Enemigo --> cactus

class Cactus {
  constructor(x, y, w, h, imagen, nivel) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.imagen = imagen;
    this.nivel = nivel;
  }
  dibujarse() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h);
    if (this.nivel === "facil") {
      this.x -= 1;
    } else {
      this.x -= 3;
    }
  }
}

//Proyectil/hueso
class Hueso {
  constructor(x, y, w, h, imagen) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.imagen = imagen;
  }
  dibujarse() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h);
    this.x += 3;
  }
}

//Dibujar linea

function dibujarPiso() {
  ctx.beginPath();
  ctx.moveTo(0, 170);
  ctx.lineTo(330, 170);
  ctx.stroke();
  ctx.closePath();
}

dibujarPiso();

//Mostrar el nombre del juego

function mostrarDatos(distancia, score, vida) {
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.fillText("Trexito", 115, 20);
  //distancia
  ctx.fillText(`${distancia}m`, 20, 20);
  //score
  ctx.fillText(`Score: ${score}`, 220, 20);
  ctx.fillText(`Vida: ${vida}`, 220, 50);
}

//Escuche las teclas

function teclas(dinosaurio) {
  //recibimos un evento
  document.addEventListener("keyup", (evento) => {
    // console.log("Tecla tocada", evento.code);
    switch (evento.code) {
      case "KeyF":
        dinosaurio.disparar();
        break;
      case "Space":
        dinosaurio.saltar();
        break;
      case "ArrowRight":
        dinosaurio.avanzar();
        break;
      case "ArrowLeft":
        dinosaurio.retroceder();
        break;
      case "ArrowDown":
        console.log("Abajo");
        break;
      case "ArrowUp":
        console.log("arriba");
        break;
    }
  });
}

//Crear enemigos
function crearCactus() {
  const num = Math.floor(Math.random() * 100);
  if (num === 3) {
    const cactus = new Cactus(300, 130, 30, 60, cactusImg, "facil");
    nopalitos.push(cactus);
  }
}

function iniciarJuego() {
  let distancia = 0;
  const dinosaurio = new Trex(20, 130, 30, 60, "green", 100, trexito);
  teclas(dinosaurio);
  console.log(dinosaurio);

  /**
   * AQUI SE RE-DIBUJA TODO EL VIDEOJUEGO
   */

  setInterval(() => {
    ctx.clearRect(0, 0, 330, 210);
    //MostrarDatos
    mostrarDatos(distancia, 0, dinosaurio.vida);
    distancia += 1;

    dibujarPiso();
    dinosaurio.dibujarse();

    //Esta saltando?? y "gravedad"
    if (dinosaurio.saltando === true) {
      //altura maxima de salto
      if (dinosaurio.y > 20) {
        dinosaurio.y -= 15;
        dinosaurio.x += 5;
      } else {
        dinosaurio.saltando = false;
      }
    }

    //no estas saltando??
    if (dinosaurio.saltando === false && dinosaurio.y < 130) {
      dinosaurio.y += 15;
      dinosaurio.x += 5;
    }

    //Dibujar enemigos/elementos extra
    nopalitos.forEach((cactus, index) => {
      cactus.dibujarse();
      if (cactus.x <= dinosaurio.x + dinosaurio.w) {
        //eliminar elemento de nopalitos
        //array.splice
        nopalitos.splice(index, 1);
        dinosaurio.vida -= 25;
        //Si sigue vivo el dinosaurio
        if (dinosaurio.vida < 100) {
          alert("murió");
        }
      }
    });

    huesos.forEach((hueso) => {
      hueso.dibujarse();
    });

    crearCactus();
  }, 1000 / 30);
}

iniciarJuego();

//Listo - Pagina de inicio
//Listo - agregar la imagen del trex
//Listo - crear los cactus
//Listo - brincar
//Listo - recibir daño trex
//Listo - contador de avance
//score
//perder
//LISTO - trex dispare
//agregar sonido
//ganar
//reiniciar juego
