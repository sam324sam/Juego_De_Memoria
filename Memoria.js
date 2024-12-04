let tablero = [];
const caracteres = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC',
    'AD', 'AE', 'AF'
];
let caracterElegido = [];
let clicks = 0;
let patronElemento = [];
let patron = 0;
let pararJuego = false;
let intentos = 0;

window.onload = crearTablero;
function crearTablero() {
    for (let i = 0; i < 32; i++) {
        caracterElegido[i] = 0;
    }
    let grid = document.querySelector('#tablero');
    grid.innerHTML = '';
    for (let fila = 1; fila <= 8; fila++) {
        tablero[fila] = [];
        for (let columna = 1; columna <= 8; columna++) {
            let posicionDelCaracter;
            do {
                posicionDelCaracter = Math.floor(Math.random() * 32);
            } while (caracterElegido[posicionDelCaracter] >= 2);
            caracterElegido[posicionDelCaracter]++;
            let div = document.createElement('button');
            div.classList.add('celda');
            div.setAttribute('onclick', 'botonPresionado(this)');
            div.setAttribute('onmouseover', 'sombra(this)');
            div.setAttribute('onmouseout', 'quitarSombra(this)');
            div.setAttribute('data-caracter', caracteres[posicionDelCaracter]);
            grid.appendChild(div);
            tablero[fila][columna] = div;
        }
    }
    console.log(tablero);
    for (let i = 0; i < 32; i++) {
        if (caracterElegido[i] !== 2) {
            console.log('No se han colocado dos veces cada caracter en el tablero. Caracteres no colocados: ' + caracteres[i]);
        }
    }
}

function botonPresionado(elemento) {
    let caracter = elemento.getAttribute('data-caracter');
    console.log(caracter);
    if (!pararJuego) {
        if (elemento.innerHTML === '') {
            if (patron == 0) {
                elemento.innerHTML = '<h1>' + caracter + '</h1>';
                patronElemento[0] = elemento;
                patron++;
            } else {
                elemento.innerHTML = '<h1>' + caracter + '</h1>';
                patronElemento[1] = elemento;
                patron--;
                pararJuego = true;
                comprobarPatron();
            }
        }
    }
}

function comprobarPatron() {
    let caracter1 = patronElemento[0].getAttribute('data-caracter');
    let caracter2 = patronElemento[1].getAttribute('data-caracter');
    if (caracter1 === caracter2) {
        patronElemento[0].style.background = 'green';
        patronElemento[1].style.background = 'green';
        setTimeout(() => {
            patronElemento[0].style.opacity = 0;
            patronElemento[1].style.opacity = 0;
            pararJuego = false;
            //ganar();
        }, 800);
    } else {
        patronElemento[0].style.background = 'red';
        patronElemento[1].style.background = 'red';
        setTimeout(() => {
            patronElemento[0].style.background = '#007bff';
            patronElemento[1].style.background = '#007bff';
            patronElemento[0].innerHTML = '';
            patronElemento[1].innerHTML = '';
            mostrarIntentos();
            pararJuego = false;
        }, 800);
    }
}

function mostrarIntentos() {
    let elemento = document.querySelector('#intentos');
    intentos++;
    elemento.innerHTML = intentos;
}

function sombra(elemento) {
    elemento.style.transform = 'scale(1.2)';
}

function quitarSombra(elemento) {
    elemento.style.transform = 'scale(1)';
}

function reiniciar() {
    intentos = 0;
    tablero = [];
    let grid = document.querySelector('#tablero');
    grid.innerHTML = '';
    patron = 0;
    let elemento = document.querySelector('#intentos');
    elemento.innerHTML = '';
    crearTablero();
}

function ganar() {
    let ocultos = 0;
    for (let fila = 1; fila <= 8; fila++) {
        for (let columna = 1; columna <= 8; columna++) {
            if (tablero[fila][columna].style.opacity === 0) {
                ocultos++;
            }
        }
    }
    if (ocultos === 1) {
        let elemento = document.querySelector('#tablero');
        elemento.innerHTML = '<h1>Ganaste</h1>';
    }
}
