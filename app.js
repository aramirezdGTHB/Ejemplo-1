const argv = require('./Config/yargs').argv;

const {
    CrearTarea, 
    CargarDatosArchivoJS, 
    ActualizarEstadoTarea,
    BorrarTarea
} = require('./PorHacer/porHacer');

let comando = argv._[0];

switch (comando) {
    case "crear":
        let laTarea =  CrearTarea(argv.descripcion);

        console.log("Se ha creado la nueva tarea \n", laTarea);
        break;
    case "listar":
        let lasTareas = CargarDatosArchivoJS();

        console.log("Lista de tareas creadas \n", lasTareas);
        break;
    case "actualizar":
        ActualizarEstadoTarea(argv.descripcion, argv.completado)
        console.log("Actualizar tareas");

        break;
    case "borrar":
        let laTareaBorrada =  BorrarTarea(argv.descripcion);
        if (laTareaBorrada) {
            console.log("Se ha borrado la tarea");
        } else {
            console.log("Error al borrar");
        }
        
        break;
    default:
        console.log("Comando invalido");

        break;
}