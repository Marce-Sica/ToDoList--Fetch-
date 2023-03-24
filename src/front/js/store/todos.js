//todoStore: Es un objeto que contiene el estado inicial de la lista de tareas pendientes (todoList)
//y una tarea pendiente (todo) con una estructura predeterminada que incluye una etiqueta vacía
//y un estado de "no realizado" (done: false).

export const todoStore = {
    todoList: [],
    todo: {
      label: "",
      done: false,
    },
  };
  
  // todoActions: Es una función que toma tres argumentos: getStore, getActions y setStore.
  // Estos argumentos son funciones proporcionadas por una biblioteca de administración de estado, en este caso, "Flux"
  // y devuelve un objeto con tres acciones asincrónicas (getToDoList, eliminarToDo y agregarToDo)
  //que interactúan con una API para obtener, eliminar y agregar tareas pendientes.
  
  export function todoActions(getStore, getActions, setStore) {
    return {
      //getToDoList: Esta función asincrónica recupera la lista de tareas pendientes de un usuario específico de la API
      //y actualiza el estado del almacén (store) con la nueva lista de tareas pendientes.
      getToDoList: async () => {
        let actions = getActions();
        let store = getStore();
        let { respuestaJson, response } = await actions.useFetch(
          `/todos/user/marce_sica_todolist_fetch` //puedes hacer dinámico el usuario con: ${store.user}
        );
        if (response.ok) {
          setStore({ ...store, todoList: respuestaJson });
        }
        return;
      },
      // eliminarToDo: Esta función asincrónica toma un índice 'i' como argumento y elimina la tarea pendiente en ese
      // índice de la lista de tareas pendientes. Luego, actualiza la lista de tareas pendientes en la API y,
      // si la actualización tiene éxito, actualiza el estado del almacén con la nueva lista de tareas pendientes.
      eliminarToDo: async (i) => {
        let actions = getActions();
        let store = getStore();
        let arrTemp = store.todoList.filter((item, index) => {
          return index != i;
        });
        let { respuestaJson, response } = await actions.useFetch(
          `/todos/user/marce_sica_todolist_fetch`, //Para que guncione con cualquier usuario, usa:${store.user}
          arrTemp,
          "PUT"
        );
        if (response.ok) {
          console.log(response);
          setStore({ ...store, todoList: arrTemp });
        } else {
          alert("No se actualizó o no hubo conexión con la API");
        }
      },
  
      eliminarAllToDo: async () => {
        let actions = getActions();
        let store = getStore();
  
        // Cambiar el método a "DELETE" y actualizar la ruta de la API si es necesario
        let { respuestaJson, response } = await actions.useFetch(
          `/todos/user/marce_sica_todolist_fetch`, // Para que funcione con cualquier usuario, usa: ${store.user}
          null,
          "DELETE"
        );
  
        if (response.ok) {
          console.log(response);
          setStore({ ...store, todoList: [] }); // Vaciar el array en el almacén
        } else {
          alert("No se eliminaron las tareas o no hubo conexión con la API");
        }
      },
      // agregarToDo: Esta función asincrónica toma una cadena 'tarea' como argumento y crea un nuevo objeto de tarea pendiente
      // con la etiqueta proporcionada y un estado de "no realizado" (done: false).
      // Luego, actualiza la lista de tareas pendientes en la API con la nueva tarea y, si la actualización tiene éxito,
      // actualiza el estado del almacén con la nueva lista de tareas pendientes.
      agregarToDo: async (tarea) => {
        let actions = getActions();
        let store = getStore();
        let todoObj = {
          label: tarea,
          done: false,
        };
        let arrTemp = [...store.todoList, todoObj];
        let { respuestaJson, response } = await actions.useFetch(
          `/todos/user/marce_sica_todolist_fetch`, //Puedes hacer la entrada generica con: ${store.user}
          arrTemp,
          "PUT"
        );
  
        if (response.ok) {
          setStore({ ...store, todoList: arrTemp });
          return true;
        } else {
          alert("No se agregó o no hubo conexión con la API");
          return false;
        }
      },
  
      createAgenda: async (tarea) => {
        let actions = getActions();
        let store = getStore();
        let todoObj = {
          label: tarea,
          done: false,
        };
        let arrTemp = [...store.todoList, todoObj];
        let { respuestaJson, response } = await actions.useFetch(
          `/todos/user/marce_sica_todolist_fetch`, //Puedes hacer la entrada generica con: ${store.user}
          arrTemp,
          "POST"
        );
  
        if (response.ok) {
          setStore({ ...store, todoList: arrTemp });
          await actions.getToDoList();
          return true;
        } else {
          alert("No se agregó o no hubo conexión con la API");
          return false;
        }
      },
    };
  }
  