import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { getTipoEquipos } from '../services/TipoEquipoService'

export default function TipoEquipos() {

const [tipoEquipos, setTipoEquipos] = useState([])
const [query, setQuery] = useState(true)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(false)

const listTipoEquipos = async () => {
  try{
    setLoading(true)
    setError(false)
    const { data } = await getTipoEquipos(query)
    console.log(data)
    setTimeout(() => {
      setLoading(false)
    }, 500)
    setTipoEquipos(data)
  }catch(e){
    console.log(e)
    setLoading(false)
    setError(true)
  }
}

useEffect(() => {
  listTipoEquipos()
}, [query])

const changeSwitch = () => {
  setQuery(!query)
}

  return (
    <>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
               Nuevo xxxxxxxx
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">Nombre:</label>
                  <input type="text" class="form-control" id="recipient-name" />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-primary">Enviar</button>
            </div>
          </div>
        </div>
      </div>

        <div class="form-check form-switch">
          <input 
            class="form-check-input" 
            type="checkbox" 
            role="switch" 
            id="flexSwitchCheckChecked"
            onClick={changeSwitch}
            checked={query} 
          />
          <label class="form-check-label" for="flexSwitchCheckChecked">
           Activos
          </label>
        </div>
        <button 
          type="button"
          class="btn btn-outline-primary"
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal" 
          data-bs-whatever="@mdo"
        >
          Agregar
        </button>
        {
          error && (
            <div class="alert alert-danger" role="alert">
            Ha ocurrido un error
          </div>
          )
        }
        <div className='table-responsive'>
          {
            loading 
            ? (
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            )
            : (
              <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Fecha creac.</th>
                  <th scope="col">Fecha act.</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  tipoEquipos.map((tipoEquipo, index) => {
                    return (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{tipoEquipo.nombre}</td>
                        <td>{tipoEquipo.estado ? 'Activo' : 'Inactivo'}</td>
                        <td>{dayjs(tipoEquipo.fechaCreacion).format('YYYY-MM-DD')}</td>
                        <td>{dayjs(tipoEquipo.fechaActualizacion).format('YYYY-MM-DD')}</td>
                        <td><button type="button" class="btn btn-outline-success">Editar</button></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            )
          }


        </div>
    </>
  )
}
