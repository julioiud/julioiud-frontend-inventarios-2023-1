import { axiosConfig } from "../configuration/axiosConfig";

// obtener los tipos de equipos
const getTipoEquipos = (estado) => {
    return axiosConfig.get('tiposequipos?estado='+estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


// crear tipo equipo
const createTipoEquipo = () => {

}

export {
    getTipoEquipos,
    createTipoEquipo
}