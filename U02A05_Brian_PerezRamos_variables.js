const totalCasillas = 250;
var numeroTurno = 0;
var yaMostrado = false;
var podio = [];
var vehiculos = {
    tranvia: {
        ventaja: { casillas: 5, probabilidad: 25 },
        normal: { casillas: 2, probabilidad: 60 },
        dificultad: { casillas: 0, probabilidad: 15 },
        posicion: 0,
        llegada: false
    },
    guagua: {
        ventaja: { casillas: 5, probabilidad: 43 },
        normal: { casillas: 3, probabilidad: 43 },
        dificultad: { casillas: -1, probabilidad: 14 },
        posicion: 0,
        llegada: false
    },
    coche: {
        ventaja: { casillas: 20, probabilidad: 15 },
        normal: { casillas: 10, probabilidad: 45 },
        dificultad: { casillas: -2, probabilidad: 40 },
        posicion: 0,
        llegada: false
    }
};