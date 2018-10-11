import React, { Component } from 'react';
import axios from 'axios';
import Libros from '../../components/LibrosTabla/LibrosTabla';
import Loading from '../../components/Loading/Loading';

class LibrosTablaContainer extends Component {
  constructor (props) {
    super(props);
    this.state = { 
                  items : [],
                  autores: [],
                  tematicas: [],
                  loading: true
                 };
  }

  componentWillMount () {
    var self = this;
    axios.get('http://localhost:3000/libro')
      .then ((result) => {
        self.setState({items:result.data});
        axios.get('http://localhost:3000/autor')
        .then ((result) => {
          self.setState({autores:result.data});
          axios.get('http://localhost:3000/tematica')
          .then ((result) => {
            self.setState({tematicas:result.data, loading: false});
          })
          .catch ((error) => {
            console.log(error);
          });
        })
        .catch ((error) => {
          console.log(error);
        });

      })
      .catch ((error) => {
        console.log(error);
      });    

  }

  render () {
    if (!this.state.loading) {
      return <Libros items={this.state.items.results} autores={this.state.autores.results} tematicas={this.state.tematicas.results}/>
    }
    else return <Loading size={100} withLabel={true}/>;
  }
}

export default LibrosTablaContainer;