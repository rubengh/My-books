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
        };

        this.handleChange = this.handleChange.bind(this);
    }

    getLibros() {
        axios.get('http://localhost:3000/libro')
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

    handleChange (event) {
        this.setState( { nombre: event.target.value } );
    }
    
    componentWillMount() {
        this.getLibros();
    }
    
    render () {
        const { classes } = this.props;
        var html = '';
            
            if (!this.state.isLoading) {
                html = (
                    <div>

                        <h1>Lista de libros</h1>            

                        <Table className={classes.table}>
                            <TableHead>
                            <TableRow>
                                <TableCell>
                                <TextField
                                  id="outlined-name-input"
                                  label="Título"
                                  className={classes.textField}
                                  type="text"
                                  name="titulo"
                                  autoComplete="titulo"
                                  margin="normal"                                  
                                  value={this.state.titulo}
                                  onChange={this.handleChange}                                  
                                /></TableCell>
                                <TableCell>Autor</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.libros.map(row => {
                                return (
                                <TableRow key={row.id} hover>
                                    <TableCell style={{fontSize: '1rem'}} component="th" scope="row">
                                    {row.titulo}
                                    </TableCell>
                                    <TableCell style={{textAlign: "left"}}>
                                      {row.autor}
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