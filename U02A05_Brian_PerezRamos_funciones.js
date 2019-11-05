/**  
 * Gestiona cuánto avanza o retrocede el vehículo según el parámetro recibido.
 * @param {object} vehiculo - Objeto que almacena toda la información de los vehículos, sus tipos de movimientos y sus posiciones.
 * @returns {number} - Cambio en la casilla del vehículo.
 */
function movimientoVehiculos(vehiculo) {
    let resultado = 0, movimiento = 0;
    /**
     * Almacena el valor máximo de probabilidad para el movimiento 'Ventaja'
     * @type {number}
     */
    let limiteVentaja = vehiculos[vehiculo].ventaja.probabilidad;
    /**
     * Almacena el valor máximo de probabilidad para el movimiento 'Normal'
     * @type {number}
     */
    let limiteNormal = vehiculos[vehiculo].normal.probabilidad;
    movimiento = Math.floor(Math.random() * 101);
    switch (true) {
        case (movimiento <= limiteVentaja):
            resultado += vehiculos[vehiculo].ventaja.casillas;
            break;
        case (movimiento > limiteVentaja && movimiento <= limiteNormal):
            resultado += vehiculos[vehiculo].normal.casillas;
            break;
        case (movimiento > limiteNormal):
            resultado += vehiculos[vehiculo].dificultad.casillas;
            break;
    }
    return resultado;
};

/**
 * Llamada desde el botón 'Paso a paso' o desde el proceso del botón 'Ver el resultado final'.
 * Hace una 'tirada' si no han llegado los 3 vehículos (compruebaTodos()), llamando a siguienteTurno()
 */
function siguienteTirada() {
    if (compruebaTodos() === false) {
        siguienteTurno();
    } else {
        muestraPodio();
    }
    actualizaProgresos();
};

/**
 *  Modifica las posiciones de los vehículos y realiza el mostrado del Turno por Consola.
 */
function siguienteTurno() {
    console.log('TURNO Nº ' + numeroTurno++);
    console.log('__________________________');
    Object.keys(vehiculos).forEach(function (clave) {
        console.log('Posicion previa ' + clave + ': ' + vehiculos[clave].posicion);
        vehiculos[clave].posicion < totalCasillas ? vehiculos[clave].posicion += movimientoVehiculos(clave) : vehiculos[clave].posicion = vehiculos[clave].posicion;
        if (vehiculos[clave].posicion < 0)
            vehiculos[clave].posicion = 0;
        else if (vehiculos[clave].posicion >= totalCasillas) {
            vehiculos[clave].posicion = totalCasillas;
            if (vehiculos[clave].llegada === false) {
                vehiculos[clave].llegada = true;
                podio.push(clave);
            }
        }
        console.log('Posicion nueva ' + clave + ': ' + vehiculos[clave].posicion);
        console.log('__________________________');
    });
    console.log('__________________________________');
}

/**
 * Asociada al botón 'Ver el resultado final'.
 * Tan sólo llama a siguienteTirada() hasta que termina la carrera.
 * Si ha terminado la carrera, llama a muestraPodio()
 */
function resultadoFinal() {
    while (compruebaTodos() == false) {
        siguienteTirada();
    }
    muestraPodio();
}

/**
 * Encargada de comprobar si ha terminado la carrera.
 * @returns {boolean} Si la carrera ha acabado o no
 */
function compruebaTodos() {
    let valor = false;
    if (vehiculos['coche'].posicion == totalCasillas && vehiculos['guagua'].posicion == totalCasillas && vehiculos['tranvia'].posicion == totalCasillas) {
        valor = true;
    }
    return valor;
}

/**
 * Actualiza (en la página) los datos de la posición de cada vehículo.
 */
function actualizaProgresos() {
    document.getElementById('rangoCoche').value = vehiculos['coche'].posicion;
    document.getElementById('progresoCoche').value = vehiculos['coche'].posicion;
    document.getElementById('rangoGuagua').value = vehiculos['guagua'].posicion;
    document.getElementById('progresoGuagua').value = vehiculos['guagua'].posicion;
    document.getElementById("rangoTranvia").value = vehiculos['tranvia'].posicion;
    document.getElementById('progresoTranvia').value = vehiculos['tranvia'].posicion;
}

/**
 * Muestra el podio tanto por Consola como en la página.
 */
function muestraPodio() {
    if (yaMostrado === false) {
        /**
         * El nombre del vehículo pasa a tener la primera letra en mayúscula y se muestra correctamente.
         * @type {object}
         */
        podio = podio.map(x => { x = x[0].toUpperCase() + x.slice(1); return x; });
        console.log('PODIO');
        console.log('__________________________');
        console.log('Primer puesto: ' + podio[0]);
        console.log('Segundo puesto: ' + podio[1]);
        console.log('Tercer puesto: ' + podio[2]);
        document.getElementById('primeroTexto').innerHTML = podio[0];
        document.getElementById('segundoTexto').innerHTML = podio[1];
        document.getElementById('terceroTexto').innerHTML = podio[2];
        document.getElementById('divPodio').style.visibility = 'visible';
        yaMostrado = true;
    }
}