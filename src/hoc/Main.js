import { Switch, Route } from 'react-router-dom';
import React from 'react';
import LibrosTabla from '../containers/LibrosTabla/LibrosTabla';
import AutoresTabla from "../containers/Autores/Autores";
import TematicasTabla from "../containers/Tematicas/Tematicas";
import EditBook from '../containers/EditBook/EditBook';
import BuscarLibros from '../containers/BuscarLibros/BuscarLibros';


const Main = () => (
    <Switch>      
      <Route exact path='/buscar' component={BuscarLibros}></Route>
      <Route exact path='/libros' component={LibrosTabla}></Route>
      <Route exact path='/libros/editar/:id' component={EditBook}></Route>
      <Route exact path='/libros/nuevo' component={EditBook}></Route>
      <Route exact path='/autores' component={AutoresTabla}></Route>
      <Route exact path='/tematicas' component={TematicasTabla}></Route>
      <Route path='*' component={BuscarLibros}></Route>
    </Switch>
  );

  export default (Main);