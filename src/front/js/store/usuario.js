export const usuarioStore = {
    //aquí van todos los estados decentralidazados de usuarios.
  };
  
  export function usuarioActions(getStore, getActions, setStore) {
    return {
      userToDo: (nuevoUser) => {
        //esta función se encargará de cambiar el estado centralizado 'user'
        const store = getStore();
        setStore({ ...store, user: nuevoUser });
      },
    };
  }
  