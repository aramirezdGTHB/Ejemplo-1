//#region Imports

const fs = require('fs');

//#endregion

//#region Variables Globales

let elListadoPorHacer = [];

//#endregion

const GuardarEnArchivoJS = () => {
    let lasTareas = JSON.stringify(elListadoPorHacer);

    fs.writeFile('db/data.json', lasTareas, (err)=>{
        if (err) throw new Error("No se pudo guardar la información \n", err)
    });
}

const CargarDatosArchivoJS = () => {
    let lasTareasCreadas;

    try{
        lasTareasCreadas = require('../db/data.json');
    }catch(error){
        lasTareasCreadas = [];
    }

    return lasTareasCreadas;
}

const CrearTarea = (descripcion) => {
    elListadoPorHacer = CargarDatosArchivoJS();
       
    let laTarea = {
        descripcion,
        completado: false
    };

    elListadoPorHacer.push(laTarea);
    GuardarEnArchivoJS();
 
    return laTarea;
}

const ActualizarEstadoTarea = (descripcion, completado) => {
    elListadoPorHacer = CargarDatosArchivoJS();
    
    let laPosicion = elListadoPorHacer.findIndex( t => {
        return t.descripcion === descripcion;
    })

    if (laPosicion >= 0) {
        elListadoPorHacer[laPosicion].completado = completado;
        GuardarEnArchivoJS();
        return true;
    }

    return false;
}

const BorrarTarea = (descripcion) => {
    elListadoPorHacer = CargarDatosArchivoJS();
    
    let elListadoFiltrado = elListadoPorHacer.filter( t => {
        return t.descripcion !== descripcion;
    })

    if (elListadoFiltrado.length === elListadoPorHacer.length) {
       return false;
    } else {
        elListadoPorHacer = elListadoFiltrado;
        GuardarEnArchivoJS();
        return true;
    }
}

module.exports = {
    CrearTarea,
    CargarDatosArchivoJS,
    ActualizarEstadoTarea,
    BorrarTarea
}