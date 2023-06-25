// SessionStorage USUARIO

const saveJugador = () => {

    let jugador = document.getElementById("nombreJugador").value;

    sessionStorage.setItem("usuario", jugador);

    guardar.addEventListener ('click', e => {
        sessionStorage.setItem('usuario', input.value)
        window.location.href = "../pages/prueba.html"
    }); 
}