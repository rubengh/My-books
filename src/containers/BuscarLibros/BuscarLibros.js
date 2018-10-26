import React, { Component } from "react";
import axios from 'axios'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Loading from '../../components/Loading/Loading';
import { Paper } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import classNames from 'classnames';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import HighlightOff from '@material-ui/icons/HighlightOff';
import ClearIcon from '@material-ui/icons/Clear';


const styles = theme => ({
    father : {
        position: "relative",
        padding: "10px",
      },
      
      addButton: {
        position: 'absolute',
        top: '0px',
        right: '0px',
        margin: '10px',
      },
      modalButton: {
        width: '100%'
      },
      button: {
        margin : '8px',
      }

  });

class BuscarLibros extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            libros: [],
            total_rows: 0,
            num_pages: 0,
            isLoading: true,
            titulo: '',
            autor: '',
            tematica: '',
            autores_list : [],
            tematicas_list : [],
        };

        axios.get('http://localhost:3000/autor')
        .then( (result) => { 
            this.setState(
                {
                    autores_list: result.data.results
                });
            })
        .catch((error) => {
            console.log(error);
        });

        axios.get('http://localhost:3000/tematica')
        .then( (result) => { 
            this.setState(
                {
                    tematicas_list: result.data.results
                });
            })
        .catch((error) => {
            console.log(error);
        });        

        this.handleChange       = this.handleChange.bind(this);
        this.handleClean        = this.handleClean.bind(this);
        this.handleCleanFilters = this.handleCleanFilters.bind(this);
    }

    getLibros() {
        this.setState({isLoading: true});
        axios.get('http://localhost:3000/libro', { params: {titulo : this.state.titulo, autor: this.state.autor, tematica: this.state.tematica} })
            .then((result) => {
                this.setState(
                  { libros : result.data.results, 
                    total_rows: result.data.total_rows, 
                    num_pages: result.data.num_pages,
                    isLoading: false,
                  });
            })
            .catch((error) => {
                console.log(error);
                this.setState({ isLoading : false, open_edit : false, open_create: false, open_delete: false });
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

    handleClean(name) {
        this.setState({
           [name]: ''
        }); 
    }
    
    handleCleanFilters() {
        this.setState({
            titulo: '',
            autor: '',
            tematica: ''
        });
        this.getLibros();
    }    

    componentWillMount() {
        this.getLibros();
    }
    
    render () {
        const { classes } = this.props;
        var html = '';
        var autores_list = this.state.autores_list;
        var tematicas_list = this.state.tematicas_list;
        var libros = this.state.libros;
            
            if (!this.state.isLoading) {
                html = (
                    <div>

                        <h1>Búsqueda de libros</h1>            

                        <Table className={classes.table}>
                            <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                    fullWidth
                                    id="titulo"
                                    label="Título"
                                    className={classes.textField}
                                    type="text"
                                    name="titulo"
                                    autoComplete="titulo"
                                    margin="normal"                                  
                                    value={this.state.titulo}
                                    onChange={this.handleChange}
                                    InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <IconButton
                                              aria-label="Limpiar"
                                              onClick={() => {this.handleClean("titulo")}}
                                            >
                                              <ClearIcon/>
                                            </IconButton>
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        id="autor"
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
                                        InputProps={{
                                            endAdornment: (
                                              <InputAdornment position="end">
                                                <IconButton
                                                  aria-label="Limpiar"
                                                  onClick={() => {this.handleClean("autor")}}
                                                >
                                                  <HighlightOff/>
                                                </IconButton>
                                              </InputAdornment>
                                            ),
                                          }}                                                                                                    
                                        >
                                        <option key={undefined} value={undefined}>
                                        
                                        </option>
                                        {autores_list.map(option => (
                                        <option key={option.id} value={option.id}>
                                            {option.nombre}
                                        </option>
                                        ))}
                                    </TextField> 
                                </TableCell>

                                <TableCell>
                                    <TextField
                                        id="tematica"
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
                                        InputProps={{
                                            endAdornment: (
                                              <InputAdornment position="end">
                                                <IconButton
                                                  aria-label="Limpiar"
                                                  onClick={() => {this.handleClean("tematica")}}
                                                >
                                                  <HighlightOff/>
                                                </IconButton>
                                              </InputAdornment>
                                            ),
                                          }}                                                                                                    
                                        >
                                        <option key={undefined} value={undefined}>
                                        
                                        </option>
                                        {tematicas_list.map(option => (
                                        <option key={option.id} value={option.id}>
                                            {option.nombre}
                                        </option>
                                        ))}
                                    </TextField> 
                                </TableCell>
                                <TableCell>
                                    <Button color="primary" variant="contained" size="small" className={classes.button} onClick={() => {this.handleCleanFilters();}}>
                                        <ClearIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                                        Limpiar
                                    </Button>
                                    <Button color="primary" variant="contained" size="small" className={classes.button} onClick={() => {this.getLibros()}}>
                                        <SearchIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                                        Buscar
                                    </Button>
                                </TableCell>                                
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {libros.map(row => {
                                return (
                                <TableRow key={row.id} hover>
                                    <TableCell style={{fontSize: '1rem'}} component="th" scope="row">
                                    {row.titulo}
                                    </TableCell>
                                    <TableCell style={{textAlign: "left"}}>
                                      {row.nombre_autor}                                      
                                    </TableCell>
                                    <TableCell>
                                      {row.nombre_tematica}   
                                    </TableCell>
                                </TableRow>
                                );
                            })}
                            </TableBody>
                        </Table>
                    </div>
                )
            } else {
                html = (
                    <Loading size={100} withLabel={true}/>
                )
            }

            return(
                <Paper className={classes.father} >
                    {html}
                </Paper>
            )
    }    
}


BuscarLibros.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BuscarLibros);