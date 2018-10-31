import React, { Component } from "react";
import axios from 'axios'
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Loading from '../../components/Loading/Loading';
import { Paper } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

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
        margin: '8px'
      }

  });

class tematicasTabla extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            tematicas: [],
            total_rows: 0,
            num_pages: 0,
            isLoading: true,
            open_edit: false,
            open_delete: false,
            open_create: false,
            nombre : '',
            id : ''
        };

        this.handleClose  = this.handleClose.bind(this);
        this.handleEdit   = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleAdd    = this.handleAdd.bind(this);
        this.handleSave   = this.handleSave.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getTematicas() {
        axios.get('http://localhost:3000/tematica')
            .then((result) => {
                this.setState(
                  { tematicas : result.data.results, 
                    total_rows: result.data.total_rows, 
                    num_pages: result.data.num_pages,
                    isLoading: false,
                    open_edit : false,
                    open_create : false,
                    open_delete : false,
                  });
            })
            .catch((error) => {
                console.log(error);
                this.setState({ isLoading : false, open_edit : false, open_create: false, open_delete: false });
            });
    }

    handleClose () {
        this.setState({ open_edit : false, open_delete : false, open_create : false, nombre : '', id : '' })
    }

    handleEdit(nombre, id) {
        this.setState({ open_edit : true, nombre: nombre, id: id });
    }

    handleDelete (nombre, id) {
        this.setState({ open_delete : true, nombre: nombre, id: id });
    }

    handleAdd () {
        this.setState({ open_create : true,  nombre : '', id : '' });
    }

    handleSave () {
        this.setState({ isLoading :  true })
        axios.put('http://localhost:3000/tematica/' + this.state.id, { nombre : this.state.nombre })
        .then((result) => {
                this.getTematicas();
            })
        .catch((error) => {
            console.log(error);
            this.setState({ isLoading : false, open_edit : false });
        });
    }

    handleCreate () {
        axios.post('http://localhost:3000/tematica', { nombre: this.state.nombre })
        .then((result) => {
            this.getTematicas();                       
        })
        .catch((error) => {
            console.log(error);
            this.setState({ isLoading : false, open_create : false });
        });
    }

    handleRemove () {
        axios.delete('http://localhost:3000/tematica/'+ this.state.id, { nombre : this.state.nombre } )
        .then((result) => {
            this.getTematicas(); 
        })
        .catch((error) => {
            console.log(error);
            this.setState( { isLoading: false, open_delete: false } )
        }) 
    }

    handleChange (event) {
        this.setState( { nombre: event.target.value } );
    }
    
    componentWillMount() {
        this.getTematicas();
    }
    
    render () {
        const { classes } = this.props;
        var html = '';
            
            if (!this.state.isLoading) {
                html = (
                    <div>

                        <Button className={classes.addButton} variant="fab" color="primary" aria-label="Add" onClick={this.handleAdd}>
                            <AddIcon />
                        </Button>

                        <Dialog
                            open={this.state.open_edit}
                            onClose={this.handleClose}
                            aria-labelledby="form-dialog-title"
                            style={{textAlign: 'center'}}
                        >
                            <DialogTitle id="form-dialog-title">Modificar Temática</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Introduce el nuevo nombre
                                </DialogContentText>
                                <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Nombre"
                                type="text"
                                fullWidth
                                value={this.state.nombre}
                                onChange={this.handleChange}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button className={classes.modalButton} onClick={this.handleClose} color="primary">
                                Cancelar
                                </Button>
                                <Button className={classes.modalButton} onClick={this.handleSave} color="secondary">
                                Guardar
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog
                            open={this.state.open_create}
                            onClose={this.handleClose}
                            aria-labelledby="form-dialog-title"
                            style={{textAlign: 'center'}}
                        >
                            <DialogTitle id="form-dialog-title">Añadir nueva Temática</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Introduce el nombre de la temática
                                </DialogContentText>
                                <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Nombre"
                                type="text"
                                fullWidth
                                value={this.state.nombre}
                                onChange={this.handleChange}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button className={classes.modalButton} onClick={this.handleClose} color="primary">
                                Cancelar
                                </Button>
                                <Button className={classes.modalButton} onClick={this.handleCreate} color="secondary">
                                Añadir
                                </Button>
                            </DialogActions>
                        </Dialog> 

                        <Dialog
                            open={this.state.open_delete}
                            onClose={this.handleClose}
                            aria-labelledby="form-dialog-title"
                            style={{textAlign: 'center'}}
                        >
                            <DialogTitle id="form-dialog-title">Borrar Temática</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    ¿Deseas borrar la temática?
                                </DialogContentText>
                                <Typography style={{ marginTop : '20px'}} color="primary">{this.state.nombre}</Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button className={classes.modalButton} onClick={this.handleClose} color="primary">
                                Cancelar
                                </Button>
                                <Button className={classes.modalButton} onClick={this.handleRemove} color="secondary">
                                Eliminar
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <h1>Lista de temáticas</h1>            

                        <Table className={classes.table}>
                            <TableHead>
                            <TableRow>
                                <TableCell>Temática</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.tematicas.map(row => {
                                return (
                                <TableRow key={row.id} hover>
                                    <TableCell style={{fontSize: '1rem'}} component="th" scope="row">
                                    {row.nombre}
                                    </TableCell>
                                    <TableCell style={{textAlign: "right"}}>
                                        <Button className={classes.button} aria-label="Editar" onClick={ () => {this.handleEdit(row.nombre, row.id) }} color='primary'>
                                            <EditIcon/> Editar
                                        </Button>
                                        <Button className={classes.button} aria-label="Borrar" onClick={ () => {this.handleDelete(row.nombre, row.id) }} color='secondary'>
                                            <DeleteIcon/> Borrar
                                        </Button>                                        
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


tematicasTabla.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(tematicasTabla);