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
    "Nueva York": "Conocida como la Gran Manzana, famosa por Times Square y Central Park.",
    "Tokio": "Capital de Japón, famosa por su torre Skytree y el cruce de Shibuya.",
    "Madrid": "Capital de España, conocida por el Museo del Prado y la Puerta del Sol.",
    "Berlin": "Capital de Alemania, famosa por el Muro de Berlín y la Puerta de Brandeburgo.",
    "Roma": "Capital de Italia, conocida por el Coliseo y el Vaticano.",
    "Pekin": "Capital de China, famosa por la Ciudad Prohibida y la Gran Muralla China.",
    "Moscu": "Capital de Rusia, conocida por la Plaza Roja y el Kremlin.",
    "Dubai": "Emirato de los EAU, famoso por el Burj Khalifa y las islas Palm.",
    "Sidney": "Ciudad de Australia, conocida por la Ópera de Sídney y el Puente del Puerto.",
    "Bangkok": "Capital de Tailandia, famosa por sus vibrantes mercados y templos budistas.",
    "Buenos Aires": "Capital de Argentina, conocida por el tango y la Casa Rosada.",
    "Cairo": "Capital de Egipto, famosa por las Pirámides de Giza y la Esfinge.",
    "Lisboa": "Capital de Portugal, conocida por el barrio de Alfama y la Torre de Belém.",
    "Amsterdam": "Capital de los Países Bajos, famosa por sus canales y el Museo Van Gogh.",
    "Praga": "Capital de la República Checa, conocida por el Puente de Carlos y su reloj astronómico."
};


// Array de Transporte
let transporte = {
    "Avion": "Rápido medio de transporte aéreo que conecta ciudades a nivel mundial.",
    "Tren": "Medio de transporte terrestre, eficiente para viajes interurbanos y rurales.",
    "Autobus": "Vehículo de transporte público urbano e interurbano accesible.",
    "Barco": "Medio de transporte acuático, desde ferris hasta cruceros de lujo.",
    "Bicicleta": "Transporte personal sostenible, ideal para distancias cortas y ejercicio.",
    "Moto": "Vehículo de dos ruedas, ágil para la ciudad y viajes cortos.",
    "Coche": "Transporte personal o familiar, ofrece comodidad y privacidad en viajes.",
    "Tranvia": "Sistema de transporte urbano sobre rieles, común en ciudades europeas.",
    "Metro": "Tren subterráneo rápido, evita el tráfico urbano conectando áreas metropolitanas.",
    "Patinete": "Pequeño vehículo eléctrico, opción práctica para movilidad urbana.",
    "Yate": "Embarcación de lujo para recreación y viajes marítimos.",
    "Globo": "Aeronave ligera que ofrece vuelos tranquilos con vistas panorámicas.",
    "Ferry": "Barco utilizado para transportar personas y vehículos a través del agua."
};


// Array de Equipaje
let equipaje = {
    "Mochila": "Bolsa versátil para llevar objetos personales en la espalda.",
    "Mapa": "Herramienta de navegación física o digital para orientarse en viajes.",
    "Brujula": "Instrumento para determinar la dirección relativa a los polos magnéticos de la Tierra.",
    "Bota": "Calzado resistente diseñado para la protección y comodidad en actividades al aire libre.",
    "Camara": "Dispositivo para capturar fotografías o videos de experiencias de viaje.",
    "Ropa": "Prendas seleccionadas adecuadamente para el clima y actividades planeadas.",
    "Protector": "Productos de protección solar o contra insectos, esenciales para viajes al aire libre.",
    "Botiquin": "Conjunto de insumos de primeros auxilios para atender emergencias menores.",
    "Gafas": "Gafas de sol para protección contra rayos UV o gafas correctoras.",
    "Pasaporte": "Documento oficial requerido para viajar entre países."
};


let estadoJuego = {
    palabraActual: '',
    mascara: '',
    listaSeleccionada: '',
    vidas: 6,


};

document.getElementById("botonComenzar").addEventListener("click", function() {
    document.getElementById("inicio").style.display = "none";
    document.getElementById("juego").style.display = "block";

});
document.addEventListener('DOMContentLoaded', (event) => {
    cargarEstadoJuego(); // Esto solo configura el juego si hay un estado guardado.
});


let vidas = 6;
let palabrasDisponibles ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let aciertos = 0;
let listaGuardar = '';

function actualizarJuego(){
    
        vidas--;
        document.getElementById("imgActual").src = 'imagenesAhorcado/' + vidas + '.png';
        console.log(vidas + 'vidas');
        
        if (vidas === 0){
            document.getElementById("mascara").textContent = estadoJuego.palabraActual;
            mostrarResultadoFinal();
            resetearJuego();
        }
                
    console.log('juegoAcualizado');
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

    // Actualiza el texto del elemento con el nombre de la categoría
    if (elementoCategoria) {
        elementoCategoria.textContent = `Categoría: ${nombreCategoria.charAt(0).toUpperCase() + nombreCategoria.slice(1)}`; 
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
            mostrarResultadoFinal();
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
function actualizarMascaraGuardada() {
    // Asumiendo que estadoJuego.mascara contiene la máscara actual
    const mascara = estadoJuego.mascara;
    if (mascara && mascara.length > 0) {
        document.getElementById("mascara").textContent = mascara;
    }
}
function actualizarImagenAhorcadoGuardada() {
    // Asumiendo que tienes imágenes numeradas basadas en el número de vidas,
    // y que el número máximo de vidas es 6.
    const numeroDeImagen = vidas;
    const srcImagen = `imagenesAhorcado/${numeroDeImagen}.png`; // Ajusta el path según tu estructura de archivos
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
        vidas: vidas,
        nombreUsuario: document.getElementById('nombreJugador').value,
        lista: estadoJuego.listaSeleccionada,

    };

    localStorage.setItem('estadoJuego', JSON.stringify(estadoParaGuardar));
}

function cargarEstadoJuego() {
    let estadoGuardado = localStorage.getItem('estadoJuego');

    if (estadoGuardado) {
        const estadoCargado = JSON.parse(estadoGuardado);

        estadoJuego.palabraActual = estadoCargado.palabraActual;
        estadoJuego.mascara = estadoCargado.mascara;
        vidas = estadoCargado.vidas;
        document.getElementById('nombreJugador').value = estadoCargado.nombreUsuario; 
        lista = estadoCargado.lista;
        generarBotonesLetras();
        crearMascara(estadoJuego.palabraActual.length);
        actualizarMascaraGuardada();
        actualizarImagenAhorcadoGuardada();
        mostrarCategoriaPalabra();

        guardarEstadoJuego();
        console.log('juego cargado');

        // Resto de la actualización de la interfaz...
    } else {
        // Inicializar un nuevo juego si no hay estado guardado
        iniciarJuego();
    }
}
function mostrarResultadoFinal() {
    // Encuentra la descripción de la palabra basada en la lista seleccionada
    let descripcion;
    if (estadoJuego.listaSeleccionada === 'lugares') {
        descripcion = lugares[estadoJuego.palabraActual];
    } else if (estadoJuego.listaSeleccionada === 'transporte') {
        descripcion = transporte[estadoJuego.palabraActual];
    } else if (estadoJuego.listaSeleccionada === 'equipaje') {
        descripcion = equipaje[estadoJuego.palabraActual];
    }

    // Prepara el mensaje final
    let mensajeFinal = `La palabra era: ${estadoJuego.palabraActual}\nDescripción: ${descripcion}`;

    // Muestra el mensaje final
    // Puedes ajustar este paso para que se muestre en tu interfaz de usuario según sea necesario
    alert(mensajeFinal); // O reemplaza esto por una actualización en la interfaz de usuario

    // Opcional: reiniciar el juego o mostrar opciones para reiniciar o cerrar
}


function resetearJuego() {
    // Limpiar el estado del juego en localStorage
    localStorage.removeItem('estadoJuego');
    
    // Restablecer las variables del estado del juego a los valores iniciales
    estadoJuego.palabraActual = '';
    estadoJuego.mascara = '';
    vidas = 6; 
    aciertos = 0;
    document.getElementById("mascara").textContent = '';
    document.getElementById("imgActual").src = 'imagenesAhorcado/6.png'; // Suponiendo que 6 vidas es el estado inicial
    
    // Volver a generar los botones de las letras si es necesario
    iniciarJuego();

    // Otras reinicializaciones necesarias para el juego...
}

