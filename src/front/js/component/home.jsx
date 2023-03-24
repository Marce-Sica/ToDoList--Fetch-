import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/todolistfetch.css";

export const ToDoList = () => {//Esta es la versión con estados centralizados, la razón de usar estados centralizados es poder comunicar estados entre componentes
  const { store, actions } = useContext(Context);
  const [refresh, setRefresh] = useState(false) //estado del compoenente para controlar su reenderizado
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("")


  useEffect(() => {
    setTodoList(store.todoList);
  }, [store.todoList]);

  useEffect(() => {
    //ejecutamos una función asíncrona que traerá la información de la lista de To Do
    const cargaDatos = async () => {
      actions.getToDoList()
    }
    cargaDatos()
    // let limpiar = document.querySelector("#tarea")
    // limpiar.value = ""
  }, [store.user, refresh]) // , el antarior código estaba en la matris de efectos. El componente se renderizará la primera vez y cada vez que el estado user o refresh cambien

  useEffect(() => { console.log(store.todoList) }, [store.todoList])

  const limpiarInput = () => {
    setInputValue("")
  }

  return (
    <div className="container-fluid p-5">
      <h1 className="text-center title-todo mt-5">todos</h1>
      {/* Eliminar Agenda */}
      <div className="buttons d-flex align-items-end flex-column-reverse gap-2">
      <button
        className="btn btn-danger mb-2 p-2"
        type="button"
        onClick={() => {
          if (window.confirm('¿Está seguro que desea eliminar todas las tareas?')) {
            actions.eliminarAllToDo();
          }
        }}
      >
        <h6>Eliminar Todo</h6>
      </button>
      {}
      <button
        className="btn btn-success p-2"
        type="button"
        onClick={() => {
          if (window.confirm('Creará una nueva agenda')) {
            actions.createAgenda()
          }
        }}
      >
        <h6>Crear agenda</h6>
      </button>
      </div>
      <div className="container-todo">
        <div className="container-input fs-4 ps-5" >
          <input placeholder="Agregue una tarea (primero cree la agenda donde colocará las mismas)" id="tarea"
            type="text"
            onChange={(e) => { setInputValue(e.target.value) }}
            value={inputValue}
            onKeyUp={async (e) => {
              if (e.key == "Enter") {
                let resultado = await actions.agregarToDo(e.target.value)
                if (resultado.ok) {
                  setRefresh(!refresh)
                  e.target.value = "" //restauro el valor a vacío
                }
                limpiarInput()
              }

            }}>
          </input>

          <br />
        </div>
        {store.todoList && store.todoList.length > 0 ? //Verifico el estado
          <ul className="list-group fs-4">
            {store.todoList.map((item, index) => { //Hago un map del estado y muestro los to do si existen
              return <li className="tasks d-flex justify-content-between ps-5 pe-3 align-items-center"
                key={index}>
                {item.label}
                <i className="fa-solid fa-x" onClick={() => {
                  actions.eliminarToDo(index);	//este botón ejecuta esta acción y le pasamos el índice
                }}></i>

              </li>
            })}</ul>
          :
          <><div className="thereAreNotTaks d-flex justify-content-center"><h3 className="notTasks d-flex justify-content-center mt-3">No hay tareas. ¡Agrega una! </h3></div>
          </>
        }
        <h3 className="itemLeft d-flex justify-content-between align-items-center ps-3">{store.todoList.length} {store.todoList.length === 1 ? 'tarea por hacer' : 'tareas por hacer'}</h3> {/*El pimer todos.length muestra la cantidad de tareas, despues valida si es 1 coloca task de lo contrario coloca tasks */}
      </div>
      <div className="container-todo-shadow">
        <div className="container-todo-shadow1"></div>
        <div className="container-todo-shadow2"></div>
      </div>
    </div>
  );
};

export default ToDoList;