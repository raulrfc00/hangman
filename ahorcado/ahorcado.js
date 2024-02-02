/*Funciones:
    mostrat pantalla de inicio de sesión (poner nombre y pulsar botón de empezar).
    crear número random.
    crear máscara.
    mostrar dibujo.
    mostrar máscara (no mostrar dos veces la misma palabra).
    seleccionar lista
    relacionar cada palabra con una imageny un texto.
    mostrar categoría de la palabra.
    mostrar letras disponibles.
    funcion para poder seleccionar una letra
    crear lista de palabras usadas.
    buscar letra en palabra (no poder introducir dos veces la misma letra).
    crear lista de letras usadas.
    mostrar mensaje (acierto/error).
    actualizar dibujo (en caso de error).
    añadir letra en la máscara.
        verificar victoria. Mensaje de victoria.
        verificar derrota. Mensaje de derrota.
        en cualquier caso, mostrar la palabra, una imagen e información.
        mensaje de volver a jugar al ganar o perder.
    guardar progreso si se cierra el navegador.
    

*/
// Array de Lugares
let lugares = [
    "Monumento", "Playa", "Montaña", "Ciudad", "Isla",
    "Desierto", "Selva", "Bosque", "Río", "Lago",
    "Pueblo", "Volcán", "Glaciar", "Ruina", "Templo",
    "Castillo", "Museo"
];

// Array de Transporte
let transporte = [
    "Avión", "Tren", "Autobús", "Barco", "Bicicleta",
    "Moto", "Coche", "Tranvía", "Metro", "Patinete",
    "Yate", "Globo", "Ferry"
];

// Array de Equipaje
let equipaje = [
    "Mochila", "Mapa", "Brújula", "Bota", "Cámara",
    "Ropa", "Protector", "Botiquín", "Gafa", "Pasaporte"
];

let estadoJuego = {
    palabraActual: '',
    mascara: ''
};

document.getElementById("botonComenzar").addEventListener("click", function() {
    document.getElementById("inicio").style.display = "none";
    document.getElementById("juego").style.display = "block";

    iniciarJuego();
});

let vidas = 6;
let palabrasDisponibles ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let aciertos = 0;

function actualizarJuego(){
    
        vidas--;
        document.getElementById("imgActual").src = 'imagenesAhorcado/' + vidas + '.png';
        console.log(vidas + 'vidas');
        
        if (vidas === 0){
            document.getElementById("mascara").textContent = estadoJuego.palabraActual;
            resetearJuego();
        }
                
    console.log('juegoAcualizado');
}

function iniciarJuego(){
    generarBotonesLetras();
    let lista = seleccionarLista(lugares, transporte, equipaje);
    estadoJuego.palabraActual = seleccionarPalabra(lista);
    estadoJuego.mascara = crearMascara(estadoJuego.palabraActual.length);
    cargarEstadoJuego();
    guardarEstadoJuego();
    
}

function seleccionarLista(lugares, transporte, equipaje){
    let lista = crearRandom(3);
    switch (lista) {
        case 0:
            return lugares;
        case 1:
            return transporte;
        case 2:
            return equipaje;
    }
}

function seleccionarPalabra(listaElegida){
    let posicion = crearRandom(listaElegida.length);
    return listaElegida[posicion];
}

function crearMascara(numero){
    let mascara = '';
    for(let i = 0; i < numero; i++){
        mascara += ' _';
    }
    document.getElementById("mascara").innerHTML = mascara;
    return mascara;
}

function crearRandom(numero){
    return Math.floor(Math.random() * numero);
}

function generarBotonesLetras() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let html = '';
    for(let i = 0; i < letras.length; i++) {
        html += '<button class="letra">' + letras[i] + '</button>';
    }
    document.getElementById("seleccionLetras").innerHTML = html;

    agregarEventosClick();

    
}

function agregarEventosClick() {
    // Seleccionar todos los botones con la clase 'letra'
    const botones = document.querySelectorAll('.letra');
    
    // Añadir un evento de clic a cada botón
    botones.forEach(function(boton) {
        boton.addEventListener('click', function() {
            // Aquí va la lógica que quieres ejecutar cuando se hace clic en una letra
            buscarLetraEnPalabraSeleccionada(boton.textContent);
            

            boton.remove(); //elimina el botón de la letra al seleccionarlo
        });
    });

}


function buscarLetraEnPalabraSeleccionada(letra) {
    let huboCambio = false;
    let comprobacion = 0;
    for (let i = 0; i < estadoJuego.palabraActual.length; i++) {
        if (letra === estadoJuego.palabraActual[i].toUpperCase()){
            estadoJuego.mascara = actualizarMascara(i, letra, estadoJuego.mascara);
            comprobacion++;
            aciertos++;
        }
    }
    if (comprobacion > 0){
        huboCambio = true;
    }
    if (huboCambio) {
        // Actualizar la máscara en el DOM
        document.getElementById("mascara").textContent = estadoJuego.mascara;
        if(aciertos === estadoJuego.palabraActual.length){
            alert('Has ganado');
            resetearJuego();
        }
    }else{
        actualizarJuego();
    }
    guardarEstadoJuego();
}


function actualizarMascara(posicion, letra, mascara){
    // Eliminar espacios de la máscara
    let mascaraSinEspacios = mascara.replace(/ /g, '');

    // Crear una nueva máscara con la letra actualizada
    let mascaraActualizada = '';
    for (let i = 0; i < mascaraSinEspacios.length; i++) {
        if (i === posicion) {
            mascaraActualizada += letra;
        } else {
            mascaraActualizada += mascaraSinEspacios[i];
        }
    }

    // Agregar espacios a la nueva máscara
    return agregarEspaciosAMascara(mascaraActualizada);
}


function agregarEspaciosAMascara(mascara) {
    let nuevaMascara = '';
    for (let i = 0; i < mascara.length; i++) {
        nuevaMascara += mascara[i] + ' ';
    }
    console.log('mascara actualizada');
    return nuevaMascara.trim();
}
function guardarEstadoJuego() {
    const estadoParaGuardar = {
        palabraActual: estadoJuego.palabraActual,
        mascara: estadoJuego.mascara,
        vidas: vidas,
        nombreUsuario: document.getElementById('nombreJugador').value
    };

    localStorage.setItem('estadoJuego', JSON.stringify(estadoParaGuardar));
}

function cargarEstadoJuego() {
    const estadoGuardado = localStorage.getItem('estadoJuego');

    if (estadoGuardado) {
        const estadoCargado = JSON.parse(estadoGuardado);

        estadoJuego.palabraActual = estadoCargado.palabraActual;
        estadoJuego.mascara = estadoCargado.mascara;
        vidas = estadoCargado.vidas;
        document.getElementById('nombreJugador').value = estadoCargado.nombreUsuario; // Asignar el nombre al input

        // Resto de la actualización de la interfaz...
    } else {
        // Inicializar un nuevo juego si no hay estado guardado
        iniciarJuego();
    }
}
document.addEventListener('DOMContentLoaded', (event) => {
    cargarEstadoJuego();
});
function resetearJuego() {
    // Limpiar el estado del juego en localStorage
    localStorage.removeItem('estadoJuego');
    
    // Restablecer las variables del estado del juego a los valores iniciales
    estadoJuego.palabraActual = '';
    estadoJuego.mascara = '';
    vidas = 6; 
    document.getElementById("mascara").textContent = '';
    document.getElementById("imgActual").src = 'imagenesAhorcado/6.png'; // Suponiendo que 6 vidas es el estado inicial
    
    // Volver a generar los botones de las letras si es necesario
    iniciarJuego();

    // Otras reinicializaciones necesarias para el juego...
}

