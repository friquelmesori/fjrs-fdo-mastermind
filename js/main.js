// Almacenamos los colores del jugador 

const almacenarColores = () => {
    
    const circulos = document.getElementsByClassName("circulo-usuario");
    const seleccionColores = [];
  
    Array.from(circulos).forEach(circle => {
        const color = circle.style.backgroundColor;
        seleccionColores.push(color);
    });
  
    sessionStorage.setItem("seleccionColores", JSON.stringify(seleccionColores));
  
    console.log(JSON.parse(sessionStorage.getItem("seleccionColores")));
  };
// DOMContentLoaded : Evento se activa cuando el documento HTML se ha analizado por completo y todos los scripts diferidos se han descargado y ejecutado. 

  window.addEventListener("DOMContentLoaded", () => {
  
  // Se almacenan los colores del jugador al presionar el boton seleccionar  

  const botonSeleccionar = document.querySelector(".btn-cp");
  
    //Evento de click al botón para almacenar los colores

    if (botonSeleccionar) {
        botonSeleccionar.addEventListener("click", almacenarColores);
    }
  });


//Para obtener la combinacion random oculta

const recuperacionColores = JSON.parse(sessionStorage.getItem("seleccionColores"));
const coloresFinales = [];

// Minimo seleccionamos 4 colores 
    if (recuperacionColores.length < 4) {
        console.log("Falta seleccionar colores por seleccionar");
    } else {

        // Para obtener la combinacion random
        const mezclarColores = recuperacionColores.sort(() => Math.random() - 0.5).slice(0, 4);

        // Dibujamos los círculos con los colores del jugador
        const ocultosCirculos = document.getElementsByClassName("oculto");
        Array.from(ocultosCirculos).forEach((circle, index) => {
            circle.style.backgroundColor = mezclarColores[index];
            coloresFinales.push(mezclarColores[index]);
        });

        console.log(coloresFinales);
    }

// Seccion del tablero

// Dibujamos la fila main del tablero

let currentRow = 0;
createRow = () => {
let rowDiv = document.createElement('div');
    rowDiv.className = 'row rowmain';
    rowDiv.id = 'row' + currentRow;
let colDiv = document.createElement('div');
    colDiv.className = 'col-10 p-2 linea';
let innerDiv = document.createElement('div');
    innerDiv.className = 'rowDots d-flex align-items-center justify-content-center flex-wrap';

    // Puntos para jugar

    for (let i = 0; i < 4; i++) {
        let dotDiv1 = document.createElement('div');
            dotDiv1.className = 'punto1';
            innerDiv.appendChild(dotDiv1);
            dotDiv1.id = 'punto1';
    }

let answerDiv = document.createElement('div');
    answerDiv.className = 'd-flex flex-column align-items-center justify-content-center answer';

    // Puntos de la respuesta

let innerAnswerDiv = document.createElement('div');
    innerAnswerDiv.className = 'd-flex flex-wrap';

    for (let i = 0; i < 4; i++) {
        let puntoADiv = document.createElement('div');
            puntoADiv.className = 'puntoA';
            innerAnswerDiv.appendChild(puntoADiv);
    }
    
    currentRow += 1;
    answerDiv.appendChild(innerAnswerDiv);
    innerDiv.appendChild(answerDiv);
    colDiv.appendChild(innerDiv);
    rowDiv.appendChild(colDiv);

    // Img del boton check

let colDiv2 = document.createElement('div');
    colDiv2.className = 'col-2 p-1 mt-1';
let checkDiv = document.createElement('div');
    checkDiv.className = 'check d-flex align-items-center justify-content-center';
let img = document.createElement('img');
    img.src = '../img/img-check.jpg';
    img.className = 'dot';

    checkDiv.appendChild(img);
    colDiv2.appendChild(checkDiv);
    rowDiv.appendChild(colDiv2);
    return rowDiv;
}

document.addEventListener('DOMContentLoaded', () => {
    let juegoDiv = document.getElementById('juego');
    let obtenerRows = createRow();
        juegoDiv.appendChild(obtenerRows);
});

// Dibujamos los puntos del juego

const pintarPunto1 = () => {
    let coloresGuardados = JSON.parse(sessionStorage.getItem("seleccionColores"));
    let dots = document.getElementsByClassName('punto1');

    if (coloresGuardados && coloresGuardados.length > 0) {
        Array.from(dots).forEach((dot) => {
        let colorIndex = 0;
        dot.addEventListener('click', () => {
            let nextColorIndex = (colorIndex + 1) % coloresGuardados.length;
            dot.style.backgroundColor = coloresGuardados[nextColorIndex] || "transparent";
            colorIndex = nextColorIndex;
            console.log("color " + coloresGuardados[nextColorIndex]);
            });
        });
    }
    arrayColoresDots();
};
document.addEventListener("DOMContentLoaded", pintarPunto1);

// Puntos del array colores

const arrayColoresDots = () => {
    const dots = document.getElementsByClassName('punto1');

    let coloresArray = [];

    let hayColor = false;

    Array.from(dots).forEach((dot) => {
        const backgroundColor = dot.style.backgroundColor;
        if (backgroundColor !== '') {
            hayColor = true;
            coloresArray.push(backgroundColor);
        }
    });
    if (coloresArray.length > 4) {
        coloresArray = coloresArray.splice(coloresArray.length - 4);
    }
      
    if (hayColor) {
        console.log(coloresArray);
        compareColours(coloresArray);
    } else {
        console.log('No hay puntos con color');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    let img = document.querySelector('.check img');
    img.addEventListener('click', arrayColoresDots);
  });

// Aqui comparamos los dos arrays, el array random y el array del usuario

const compareColours = (coloresArray) => {
    const dotsAnswer = document.querySelectorAll(`#row${currentRow - 2} .puntoA`);
    console.log(dotsAnswer)

    if (coloresArray.length <= 4) {
        coloresArray.forEach((element, index) => {
        if (element === coloresFinales[index]) {
            console.log("rgb(255, 0, 0)");
            dotsAnswer[index].style.backgroundColor = "rgb(255, 0, 0)";
            if (dotsAnswer.length === 4 && Array.from(dotsAnswer).every(dot => dot.style.backgroundColor === 'rgb(255, 0, 0)')) {
                window.location.href = './ganador.html';
                }
        } else if (coloresFinales.includes(element)) {
            console.log("rgb(0, 0, 0)");
            dotsAnswer[index].style.backgroundColor = "rgb(0, 0, 0)";
        } else {
            console.log("");
            dotsAnswer[index].style.backgroundColor = "";
        }
      });
    }
  };

// Aqui iremos sumando las filas segun el nivel 

let contador = 1;

// Aqui mensaje del perdedor 

const redirectToPage = () => {
    window.location.href = './perdedor.html';
  };

const rows = () => {

    let checkDivs = document.querySelectorAll('.check');
    let lastCheckDiv = checkDivs[checkDivs.length - 1];
    let lastImg = lastCheckDiv.querySelector('img');

        if (contador < nivel && lastImg && contador === checkDivs.length) {
        lastImg.removeEventListener('click', rows);
    
            let juegoDiv = document.getElementById('juego');
            let newRow = createRow();
            juegoDiv.appendChild(newRow);
      
            contador++;
      
            let newCheckDiv = newRow.querySelector('.check');
            let newImg = newCheckDiv.querySelector('img');
            newImg.addEventListener('click', rows);
      
            console.log('Clicks disponibles: ' + (nivel - contador));
            
            pintarPunto1();
          } else if (contador >= nivel) {
            redirectToPage();
          }
    }

    document.addEventListener('DOMContentLoaded', () => {
        let img = document.querySelector('.check img');
        img.addEventListener('click', rows);

      });

// Mensaje de ganador  

let mensajeGanador = document.getElementById("resultado");
mensajeGanador.innerHTML = `${sessionStorage.getItem("usuario")}!`;

