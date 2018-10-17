import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { Paper } from '@material-ui/core';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

const styles = theme => ({
  container: {
    // display: 'inline-block',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    display: 'inline-block',
    position: 'relative',
    maxWidth: '500px',
    minWidth: '100px'
  },

  button: {
    margin: theme.spacing.unit,
    position: 'relative',
    display: 'inline-block',
    width: 250,
    textAlign: 'center',
  },

  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },

  father : {
    position: "relative",
    padding: "10px",
  },

  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
    verticalAlign: 'bottom'
  },

});

const booleanList = [
  {
    value: 'S',
    label: 'Si',
  },
  {
    value: 'N',
    label: 'No',
  }
];

var TematicasList =  [];
var AutoresList = [];

this.state = {
  id: undefined,
  titulo: undefined,
  autor: undefined,
  precio: undefined,
  tematica: undefined,
  comentario: undefined,
  comprado: undefined,
  redirect: false,
  loading: true,

};

class EditBook extends Component {

    constructor(props) {
      
      super(props);

      this.state = {
        id: props.match.params.id,
        titulo: undefined,
        autor: undefined,
        precio: undefined,
        tematica: undefined,
        comentario: undefined,
        comprado: undefined,
        redirect: false,
        loading: true,
      };
                       
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        axios.get('http://localhost:3000/libro/' + this.state.id)
          .then ((result) => {
            this.setState({ ...result.data.results[0]});
            axios.get('http://localhost:3000/autor')
            .then ((result) => {
              AutoresList = result.data.results
              axios.get('http://localhost:3000/tematica')
              .then ((result) => {        
                this.setState( {loading: false} );
                TematicasList = result.data.results;
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
    
      handleChange(event) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });                       
      }

      handleSubmit(event) {
        
        alert('Titulo: ' + this.state.titulo + '\nAutor: ' + this.state.autor + '\nPrecio: ' + this.state.precio + '\nTematica: ' + this.state.tematica + '\nComentario: '+ this.state.comentario + '\nComprado: '+ this.state.comprado );
        
        if (this.state.id) {
          axios.put('http://localhost:3000/libro/' + this.state.id, {...this.state})
          .then ((result) => {
            console.log(result);  
            this.setState({redirect: true});        
          })
          .catch ((error) => {
            console.log(error);
          });
        }
        else {  
          axios.post('http://localhost:3000/libro', {...this.state})
          .then ((result) => {
            console.log(result);  
            this.setState({redirect: true});   
          })
          .catch ((error) => {
            console.log(error);
          });
        }

        event.preventDefault();
      }

    
      render() {

        const { classes } = this.props;
        var titulo = '';
        var boton = '';

        if (this.state.id) {
          titulo = 'Editar libro';
          boton = 'Actualizar';
        }
        else {
          titulo = 'Nuevo libro';
          boton = 'Crear';
        }

        if (this.state.redirect) {
          return <Redirect to="/libros" />
        }

        if (!this.state.loading) {
          
          return (
            <Paper className={classes.father}>
              <h1>{titulo}</h1>    
              <form onSubmit={this.handleSubmit}>
                <div className={classes.container}>
                  <TextField
                    id="outlined-name-input"
                    label="Título"
                    className={classes.textField}
                    type="text"
                    name="titulo"
                    autoComplete="titulo"
                    margin="normal"
                    variant="outlined"
                    value={this.state.titulo}
                    onChange={this.handleChange}
                    required
                    
                    />

                  <TextField
                    id="outlined-select-autor-native"
                    select
                    label="Autor"
                    name="autor"
                    className={classes.textField}
                    value={this.state.autor}
                    onChange={this.handleChange}
                    SelectProps={{
                      native: true,
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    margin="normal"
                    variant="outlined"
                    required                    
                    >
                    <option key={undefined} value={undefined}>
                      
                    </option>
                    {AutoresList.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.nombre}
                      </option>
                    ))}
                  </TextField>               

                  <TextField
                    id="outlined-price-input"
                    label="Precio"
                    className={classes.textField}
                    type="number"
                    name="precio"
                    autoComplete="precio"
                    margin="normal"
                    variant="outlined"
                    value={this.state.precio}
                    onChange={this.handleChange}
                    required
                    
                  />

                  <TextField
                    id="outlined-select-currency-native"
                    select
                    label="Temática"
                    name="tematica"
                    className={classes.textField}
                    value={this.state.tematica}
                    onChange={this.handleChange}
                    SelectProps={{
                      native: true,
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    margin="normal"
                    variant="outlined"
                    required                    
                    >
                    <option key={undefined} value={undefined}>
                      
                    </option>                    
                    {TematicasList.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.nombre}
                      </option>
                    ))}
                  </TextField>


                  <TextField
                    id="outlined-select-comprado-native"
                    select
                    label="Comprado"
                    name="comprado"
                    className={classes.textField}
                    value={this.state.comprado}
                    onChange={this.handleChange}
                    SelectProps={{
                      native: true,
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    margin="normal"
                    variant="outlined"                    
                    >

                    <option key={undefined} value={undefined}>
                      
                    </option>

                    {booleanList.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>

                  <Button color="primary" component={Link} to="/libros" variant="contained" size="medium" className={classes.button}>
                    Volver
                  </Button>

                  <Button color="secondary" type="submit" value="Submit" variant="contained" size="medium" className={classes.button}>
                    <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                    {boton}
                  </Button>

                </div>
              </form>
            </Paper>
        );
        } 
        else {
          return <Loading size={100} withLabel={true}/>
        }
      }
    }

EditBook.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditBook);