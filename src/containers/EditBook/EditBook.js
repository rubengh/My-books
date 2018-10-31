import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import { Paper } from '@material-ui/core';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  root: {
    margin: 'auto',
    padding: '10px',
    width: '75%',
  },
  container: {
    display: 'flex',    
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250,
  },
  containerButtons: {
    display: 'flex',    
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  modalButton: {
    width: '100%'
  },
  button: {
    margin: theme.spacing.unit,
    position: 'relative',
    minWidth: 150,
    maxWidth: 250,
    textAlign: 'center',
    display: 'flex',
  },

  button2: {
    margin: theme.spacing.unit,
    position: 'relative',
    // display: 'inline-block',
    minWidth: 150,
    maxWidth: 250,
    textAlign: 'center',
    display: 'flex',
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
  resaltado: {
    '&:hover': {
        backgroundColor: '#eeeeee'
      },
  },
  column: {
    flexBasis: '33.33%',
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


this.state = {
  id: undefined,
  titulo: undefined,
  autor: undefined,
  precio: undefined,
  tematica: undefined,
  comprado: undefined,
  redirect: false,
  loading: true,
  open_comment: false,
  comentario: '',
  id_comentario: '',  
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
        comprado: undefined,
        comentarios: [],
        autores: [],
        tematicas: [],
        redirect: false,
        loading: true,
        open_comment: false,
        comentario: '',
        id_usuario: 1,
      };
                       
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAdd    = this.handleAdd.bind(this);
        this.handleClose  = this.handleClose.bind(this);
        this.handleCreate = this.handleCreate.bind(this);

        axios.get('http://localhost:3000/libro/' + this.state.id)
          .then ((result) => {
            this.setState({ ...result.data.results[0]});
            axios.get('http://localhost:3000/comentario/', { params: { id_libro: this.state.id } })
            .then ((result) => {
              this.setState({ comentarios : result.data.results});
            })

          })
          .catch ((error) => {
            console.log(error);
          });

          axios.get('http://localhost:3000/autor')
          .then ((result) => {
            this.setState({ autores : result.data.results});            
          })
          .catch ((error) => {
            console.log(error);
          });

          axios.get('http://localhost:3000/tematica')
          .then ((result) => {        
            this.setState({ tematicas : result.data.results, loading: false});            
          })
          .catch ((error) => {
            console.log(error);
          });                    
          
      }

      handleClose () {
        this.setState({ open_comment : false, comentario : '', id_comentario : '' })
      }
    
      handleChange(event) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });                       
      }

      handleAdd() {
        this.setState({ open_comment : true,  comentario : '', id_comentario : '' });
      }
      
      handleCreate () {
        axios.post('http://localhost:3000/comentario', { params: { id_libro: this.state.id, comentario: this.state.comentario, id_usuario : this.state.id_usuario }})
        .then((result) => {            
            this.setState({ isLoading : false, open_comment : false });
        })
        .catch((error) => {
            console.log(error);
            this.setState({ isLoading : false, open_comment : false });
        });
    }

      handleSubmit(event) {
        
        alert('Titulo: ' + this.state.titulo + '\nAutor: ' + this.state.autor + '\nPrecio: ' + this.state.precio + '\nTematica: ' + this.state.tematica + '\nComprado: '+ this.state.comprado );
        
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
        const { backpath } = this.props.location.state;
        const { comentarios } = this.state;
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
                    {this.state.autores.map(option => (
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
                    {this.state.tematicas.map(option => (
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
                </div>
                <div className={classes.containerButtons}>
                  <Button variant="contained" color="primary" component={Link} to={backpath} size="medium" className={classes.button}>
                      Volver
                    </Button>
                  <Button variant="contained" color="secondary" type="submit" value="Submit" size="medium" className={classes.button2}>
                    <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                    {boton}
                  </Button>                
                </div>
              </form>
            
            <div className={classes.root}>
              <h3 style={{textAlign :'center', display: comentarios.length > 0 ? 'block' : 'none'}}>Comentarios</h3>           
              { comentarios.map((row, i) => {
                return (
              <ExpansionPanel className={classes.resaltado} key={row.id}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div className={classes.column}>
                  <Typography className={classes.heading}>Usuario: {row.nombre_usuario}</Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.heading}>Creación: {new Date(row.fecha_creacion).toLocaleString()}</Typography>
                </div>
                <div className={classes.column} style={{display: row.fecha_modificacion ? 'block' : 'none'}}>
                  <Typography className={classes.heading}>Editado: {new Date(row.fecha_modificacion).toLocaleString()}</Typography>
                </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    {row.comentario}
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
                );
              })}
              <Button style={{margin: 'auto', marginTop: '10px'}} color="primary" variant="contained" size="small" className={classes.button} onClick={this.handleAdd}>
                  <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                  Añadir comentario
              </Button>

            </div>
              <Dialog
                  open={this.state.open_comment}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                  style={{textAlign: 'center'}}
              >
                  <DialogTitle id="form-dialog-title">Añadir comentario</DialogTitle>
                  <DialogContent>
                      <DialogContentText>
                          Introduce el nuevo nombre
                      </DialogContentText>
                      <TextField
                      autoFocus
                      margin="dense"
                      id="comment"
                      label="Comentario"
                      type="text"
                      fullWidth
                      name="comentario"
                      value={this.state.comentario}
                      onChange={this.handleChange}
                      />
                  </DialogContent>
                  <DialogActions>
                      <Button className={classes.modalButton} onClick={this.handleClose} color="primary">
                      Cancelar
                      </Button>
                      <Button className={classes.modalButton} onClick={this.handleCreate} color="secondary">
                      Crear
                      </Button>
                  </DialogActions>
              </Dialog>  
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