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
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

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
      }

  });

class AutoresTabla extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            autores: [],
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
        this.handleAdd    = this.handleAdd.bind(this);
        this.handleSave   = this.handleSave.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClose () {
        this.setState({ open_edit : false, open_delete : false, open_create : false })
    }

    handleEdit(nombre, id) {
        this.setState({ open_edit : true, nombre: nombre, id: id});
    }

    handleDelete () {

    }

    handleAdd () {
        this.setState({ open_create : true });
    }

    handleSave () {
        this.setState({ isLoading :  true })
        axios.put('http://localhost:3000/autor/' + this.state.id, { nombre : this.state.nombre })
        .then((result) => {
            axios.get('http://localhost:3000/autor')
            .then((result) => {
                this.setState({autores : result.data.results, 
                    total_rows: result.data.total_rows, 
                    num_pages: result.data.num_pages,
                    isLoading: false,
                    open_edit : false
                  });
            })
            .catch((error) => {
                console.log(error);
                this.setState({ isLoading : false, open_edit : false });
            });
        })
        .catch((error) => {
            console.log(error);
            this.setState({ isLoading : false, open_edit : false });
        });
    }

    handleCreate () {

    }

    handleChange (event) {
        this.setState( { nombre: event.target.value } );
    }
    
    componentWillMount() {
        axios.get('http://localhost:3000/autor')
        .then ((result) => {
            this.setState({autores : result.data.results, 
                           total_rows: result.data.total_rows, 
                           num_pages: result.data.num_pages,
                           isLoading: false
                         });
        })
        .catch ((error) => {
            console.log(error);
        })
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
                        >
                            <DialogTitle id="form-dialog-title">Modificar Autor</DialogTitle>
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
                                <Button onClick={this.handleClose} color="primary">
                                Cancel
                                </Button>
                                <Button onClick={this.handleSave} color="secondary">
                                Salvar
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <h1>Lista de autores</h1>            

                        <Table className={classes.table}>
                            <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.autores.map(row => {
                                return (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                    {row.nombre}
                                    </TableCell>
                                    <TableCell style={{textAlign: "right"}}>
                                        <IconButton aria-label="Editar" size="large" onClick={ () => {this.handleEdit(row.nombre, row.id) }} color='primary'>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="Borrar" size="large" onClick={this.handleDelete} color='secondary'>
                                            <DeleteIcon />
                                        </IconButton>
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


AutoresTabla.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutoresTabla);