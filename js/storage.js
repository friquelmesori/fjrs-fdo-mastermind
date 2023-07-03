//Nivel session storage

const guardarFacil = () => {
    sessionStorage.setItem("level", 10);
    window.location.href = "../pages/nivelFacil.html";
}

const guardarIntermedio = () => {
    sessionStorage.setItem("nivel", 8);
    window.location.href = "../pages/nivelIntermedio.html";
}

const guardarDificil = () => {
    sessionStorage.setItem("nivel", 6);
    window.location.href = "../pages/nivelDificil.html";
}

//Recogemos los niveles

let nivel = sessionStorage.getItem("level");
console.log("¿Qué nivel es?", nivel)


//Session Storage Jugador

const guardarNombreJugador = () => {

    let jugador = document.getElementById("nombreJugador").value;

    sessionStorage.setItem("usuario", jugador);
    window.location.href = "../pages/ganador.html";
    window.location.href = "../pages/perdedor.html";

}

// Obtenmos los Colores de niveles

// Dibujamos de los círculos por el jugador

const colorPicker = (inputId, circleId) => {
    let colorInput = document.getElementById(inputId);
    let circle = document.getElementById(circleId);

    colorInput.oninput = () => {
        circle.style.backgroundColor = colorInput.value;
        console.log("Color seleccionado:", colorInput.value);
    }
}

colorPicker("inputColor1", "circulo1");
colorPicker("inputColor2", "circulo2");
colorPicker("inputColor3", "circulo3");
colorPicker("inputColor4", "circulo4");
colorPicker("inputColor5", "circulo5");
colorPicker("inputColor6", "circulo6");

