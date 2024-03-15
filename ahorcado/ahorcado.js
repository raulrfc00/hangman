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
let lugares = {
    "Paris": "Capital de Francia, famosa por la Torre Eiffel y el Museo del Louvre.",
    "Londres": "Capital del Reino Unido, conocida por el Big Ben y el Puente de Londres.",
    "Tokio": "Capital de Japon, famosa por su torre Skytree y el cruce de Shibuya.",
    "Madrid": "Capital de Espana, conocida por el Museo del Prado y la Puerta del Sol.",
    "Berlin": "Capital de Alemania, famosa por el Muro de Berlin y la Puerta de Brandeburgo.",
    "Roma": "Capital de Italia, conocida por el Coliseo y el Vaticano.",
    "Pekin": "Capital de China, famosa por la Ciudad Prohibida y la Gran Muralla China.",
    "Moscu": "Capital de Rusia, conocida por la Plaza Roja y el Kremlin.",
    "Dubai": "Emirato de los EAU, famoso por el Burj Khalifa y las islas Palm.",
    "Sidney": "Ciudad de Australia, conocida por la Opera de Sidney y el Puente del Puerto.",
    "Bangkok": "Capital de Tailandia, famosa por sus vibrantes mercados y templos budistas.",
    "Lisboa": "Capital de Portugal, conocida por el barrio de Alfama y la Torre de Belem.",
    "Amsterdam": "Capital de los Paises Bajos, famosa por sus canales y el Museo Van Gogh.",
    "Praga": "Capital de la Republica Checa, conocida por el Puente de Carlos y su reloj astronomico."
};


// Array de Transporte
let transporte = {
    "Avion": "Rapido medio de transporte aereo que conecta ciudades a nivel mundial.",
    "Tren": "Medio de transporte terrestre, eficiente para viajes interurbanos y rurales.",
    "Autobus": "Vehiculo de transporte publico urbano e interurbano accesible.",
    "Barco": "Medio de transporte acuatico, desde ferris hasta cruceros de lujo.",
    "Bicicleta": "Transporte personal sostenible, ideal para distancias cortas y ejercicio.",
    "Moto": "Vehiculo de dos ruedas, agil para la ciudad y viajes cortos.",
    "Coche": "Transporte personal o familiar, ofrece comodidad y privacidad en viajes.",
    "Tranvia": "Sistema de transporte urbano sobre rieles, comun en ciudades europeas.",
    "Metro": "Tren subterraneo rapido, evita el trafico urbano conectando areas metropolitanas.",
    "Patinete": "Pequeno vehiculo electrico, opcion practica para movilidad urbana.",
    "Yate": "Embarcacion de lujo para recreacion y viajes maritimos.",
    "Globo": "Aeronave ligera que ofrece vuelos tranquilos con vistas panoramicas.",
    "Ferry": "Barco utilizado para transportar personas y vehiculos a traves del agua."
};


// Array de Equipaje
let equipaje = {
    "Mochila": "Bolsa versatil para llevar objetos personales en la espalda.",
    "Mapa": "Herramienta de navegacion fisica o digital para orientarse en viajes.",
    "Brujula": "Instrumento para determinar la direccion relativa a los polos magneticos de la Tierra.",
    "Bota": "Calzado resistente disenado para la proteccion y comodidad en actividades al aire libre.",
    "Camara": "Dispositivo para capturar fotografias o videos de experiencias de viaje.",
    "Ropa": "Prendas seleccionadas adecuadamente para el clima y actividades planeadas.",
    "Gafas": "Gafas de sol para proteccion contra rayos UV o gafas correctoras.",
    "Pasaporte": "Documento oficial requerido para viajar entre paises."
};



let estadoJuego = {
    palabraActual: '',
    mascara: '',
    listaSeleccionada: '',
    vidas: 6,
    aciertos: 0,
    letrasCorrectas:[],
    letrasIncorrectas: [],
    victoria: false,
    derrota: false,
};

if (localStorage.getItem('estadoJuego')) {
    document.getElementById("inicio").style.display = "none";
    document.getElementById("juego").style.display = "block";
    cargarEstadoJuego();
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("botonComenzar").addEventListener("click", function() {
        document.getElementById("inicio").style.display = "none";
        document.getElementById("juego").style.display = "block";
        cargarEstadoJuego();
    });
});
document.getElementById("volverAjugar").addEventListener("click", function() {
    resetearJuego();
    cargarEstadoJuego();
});


let palabrasDisponibles ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function cargarEstadoJuego() {
    let estadoGuardado = localStorage.getItem('estadoJuego');


    if (estadoGuardado) {
        
        const estadoCargado = JSON.parse(estadoGuardado);

        estadoJuego.palabraActual = estadoCargado.palabraActual;
        estadoJuego.mascara = estadoCargado.mascara;
        estadoJuego.vidas = estadoCargado.vidas;
        estadoJuego.aciertos = estadoCargado.aciertos;
        document.getElementById('nombreJugador').value = estadoCargado.nombreUsuario; 
        estadoJuego.listaSeleccionada = estadoCargado.lista;
        estadoJuego.letrasCorrectas = estadoCargado.letrasCorrectas;
        estadoJuego.letrasIncorrectas = estadoCargado.letrasIncorrectas;
        estadoJuego.victoria = estadoCargado.victoria;
        estadoJuego.derrota = estadoCargado.derrota;
        generarBotonesLetras();
        pintarBotones();
        crearMascara(estadoJuego.palabraActual.length);
        actualizarMascaraGuardada();
        actualizarImagenAhorcadoGuardada();
        mostrarCategoriaPalabra();

        guardarEstadoJuego();
        console.log('juego cargado');
        
        if (estadoJuego.victoria === true) {
            mostrarResultadoFinal();
        }else if (estadoJuego.derrota === true) {
            mostrarResultadoFinal();
        }
        
    } else {
        // Inicializar un nuevo juego si no hay estado guardado
        iniciarJuego();
    }
}

function iniciarJuego(){
    
    // Solo inicializa un nuevo juego si no hay estado guardado
    let lista = seleccionarLista(lugares, transporte, equipaje);
    estadoJuego.palabraActual = seleccionarPalabra(lista);
    estadoJuego.mascara = crearMascara(estadoJuego.palabraActual.length);
    generarBotonesLetras();
    mostrarCategoriaPalabra();
    guardarEstadoJuego();
    console.log('juego iniciado');


}




function mostrarCategoriaPalabra() {
    const nombreCategoria = estadoJuego.listaSeleccionada; 
    const elementoCategoria = document.getElementById('categoria'); 

    // Actualiza el texto del elemento con el nombre de la categoria
    if (elementoCategoria) {
        elementoCategoria.textContent = `Categoria: ${nombreCategoria.charAt(0).toUpperCase() + nombreCategoria.slice(1)}`; 
    }
}


function seleccionarLista() {
    let indice = crearRandom(3);
    switch (indice) {
        case 0:
            estadoJuego.listaSeleccionada = 'lugares';
            return Object.keys(lugares);
        case 1:
            estadoJuego.listaSeleccionada = 'transporte';
            return Object.keys(transporte);
        case 2:
            estadoJuego.listaSeleccionada = 'equipaje';
            return Object.keys(equipaje);
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
    html += '<button class="letra btn btn-secondary m-1">' + letras[i] + '</button>';
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
            buscarLetraEnPalabraSeleccionada(boton);         

            //boton.remove(); //elimina el botón de la letra al seleccionarlo
        });
    });

}


function buscarLetraEnPalabraSeleccionada(button) {
    let letra=button.textContent;
    let encontrado = false;

    for (let i = 0; i < estadoJuego.palabraActual.length; i++) {
        if (letra === estadoJuego.palabraActual[i].toUpperCase()){
            estadoJuego.mascara = actualizarMascara(i, letra, estadoJuego.mascara);            
            estadoJuego.aciertos++;
            encontrado = true;
        }
    }
 
    if (encontrado) {
        // Actualizar la máscara en el DOM
        document.getElementById("mascara").textContent = estadoJuego.mascara;
        if(estadoJuego.aciertos === estadoJuego.palabraActual.length){
            estadoJuego.victoria = true;
            mostrarResultadoFinal();
        }
        button.style.backgroundColor = "green";
        button.disabled = true;
        estadoJuego.letrasCorrectas.push(button.textContent);
    }else{
        actualizarJuego();
        button.style.backgroundColor = "red";
        button.disabled = true;
        estadoJuego.letrasIncorrectas.push(button.textContent);

    }
    guardarEstadoJuego();
}

function pintarBotones(){
    const botones = document.querySelectorAll('.letra');
    
    // Recorre todos los botones
    botones.forEach(boton => {
        // Verifica si el texto del botón está en la lista de letras correctas
        if (estadoJuego.letrasCorrectas.includes(boton.textContent)) {
            boton.style.backgroundColor = "green"; // Pinta el botón de verde
        }

        // Verifica si el texto del botón está en la lista de letras incorrectas
        if (estadoJuego.letrasIncorrectas.includes(boton.textContent)) {
            boton.style.backgroundColor = "red"; // Pinta el botón de rojo
        }
    });
}

function actualizarJuego(){
    
    estadoJuego.vidas--;
    document.getElementById("imgActual").src = 'imagenesAhorcado/' +estadoJuego.vidas + '.png';
    console.log(estadoJuego.vidas + 'vidas');
    
    if (estadoJuego.vidas === 0){
        document.getElementById("mascara").textContent = estadoJuego.palabraActual;
        estadoJuego.derrota = true;
        mostrarResultadoFinal();

    }

    console.log('juegoAcualizado');
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

    return agregarEspaciosAMascara(mascaraActualizada);
}
function actualizarMascaraGuardada() {

    const mascara = estadoJuego.mascara;
    if (mascara && mascara.length > 0) {
        document.getElementById("mascara").textContent = mascara;
    }
}
function actualizarImagenAhorcadoGuardada() {
    const numeroDeImagen = estadoJuego.vidas;
    const srcImagen = `imagenesAhorcado/${numeroDeImagen}.png`; 
    document.getElementById("imgActual").src = srcImagen;
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
        vidas: estadoJuego.vidas,
        aciertos: estadoJuego.aciertos,
        nombreUsuario: document.getElementById('nombreJugador').value,
        lista: estadoJuego.listaSeleccionada,
        letrasCorrectas: estadoJuego.letrasCorrectas,
        letrasIncorrectas: estadoJuego.letrasIncorrectas,
        victoria: estadoJuego.victoria,
        derrota: estadoJuego.derrota

    };

    localStorage.setItem('estadoJuego', JSON.stringify(estadoParaGuardar));
}


function mostrarResultadoFinal() {
    // Obtener la palabra y su descripción
    const palabra = estadoJuego.palabraActual;
    let descripcion, imagen;

    // Determinar la descripción basada en la lista seleccionada
    if (estadoJuego.listaSeleccionada === 'lugares') {
        descripcion = lugares[palabra];
        imagen = `imagenesLugares/${palabra}.jpg`; 
    } else if (estadoJuego.listaSeleccionada === 'transporte') {
        descripcion = transporte[palabra];
        imagen = `imagenesTransportes/${palabra}.jpg`; 
    } else if (estadoJuego.listaSeleccionada === 'equipaje') {
        descripcion = equipaje[palabra];
        imagen = `imagenesEquipaje/${palabra}.jpg`; 
    }

    // Actualizar el contenido de los divs correspondientes
    document.getElementById('palabra').innerHTML = `${palabra}`;
    document.getElementById('descripcion').innerHTML = `${descripcion}`;
    document.getElementById('imagenPalabra').src = imagen;

    // Mostrar el div imgPalabra
    document.getElementById('final').style.display = 'block';
    document.getElementById('juego').style.display = 'none';
}


function resetearJuego() {
    // Limpiar el estado del juego en localStorage
    localStorage.removeItem('estadoJuego');
    
    // Restablecer las variables del estado del juego a los valores iniciales
    estadoJuego.palabraActual = '';
    estadoJuego.mascara = '';
    estadoJuego.vidas = 6; 
    estadoJuego.aciertos = 0;
    estadoJuego.letrasCorrectas = [],
    estadoJuego.letrasIncorrectas = [],
    estadoJuego.victoria = false;
    estadoJuego.derrota = false;
    
    document.getElementById("mascara").textContent = '';
    document.getElementById("imgActual").src = 'imagenesAhorcado/6.png'; 
    
    iniciarJuego();
    document.getElementById('final').style.display = 'none';
    document.getElementById('juego').style.display = 'block';
}

