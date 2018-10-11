import { ADD_LIBRO } from "../constants/action-types";

const initialState = {
  libros : [{
      "id": 1,
      "titulo": "Poder sin límites",
      "autor": 1,
      "precio": 9.95,
      "comprado": "S",
      "comentario": "",
      "tematica": 1
  },
  {
      "id": 2,
      "titulo": "Despertando al gigante que lleva dentro",
      "autor": 1,
      "precio": 9.95,
      "comprado": "S",
      "comentario": null,
      "tematica": 1
  },
  {
      "id": 3,
      "titulo": "Padre rico padre pobre",
      "autor": 2,
      "precio": 8.95,
      "comprado": "S",
      "comentario": null,
      "tematica": 2
  }]
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIBRO:
      return { ...state, libros: [...state.libros, action.payload] };
    default:
      return state;
  }
};
export default rootReducer;