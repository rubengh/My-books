import React, { Component } from 'react';
import SimpleCard from '../../components/Card/Card';
import { Paper, withStyles } from "@material-ui/core";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    father : {
        position: "relative",
        padding: "10px",
    },
    title : {
        marginLeft: '10px',
        top: '0px',
        left: '0px',
        margin: '10px',        

    },
    addButton: {
      position: 'absolute',
      top: '0px',
      right: '0px',
      margin: '10px',
    }
  });

  this.state = {
    libros: [],
    autores: [],
    tematicas: [],
    total_rows: 0,
    num_pages: 0,
    isLoading: true,
    redirect: false,
};

class Libros extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            libros: props.items,
            autores: props.autores,
            tematicas: props.tematicas,
            redirect: false,
        };

        this.redirect = this.redirect.bind(this);
    }

    redirect(event) {
        this.setState({redirect: true});
        event.preventDefault();
    }

    render () {
        const { classes } = this.props;
        const nuevo = "/libros/nuevo";
        var html = '';

        if (this.state.redirect) {
            return <Redirect to={nuevo} />
          }

        html = (
            <div>
                <Button className={classes.addButton} variant="fab" color="primary" aria-label="Add" onClick={this.redirect}>
                    <AddIcon />
                </Button>
                <h1 className={classes.title}>Lista de libros</h1>
                { this.state.libros.map(row => {
                    return (
                        <SimpleCard key={row.id}
                                    id={row.id} 
                                    Titulo={row.titulo} 
                                    Autor={row.autor} 
                                    Precio={row.precio} 
                                    Tematica={row.tematica} 
                                    Comentario={row.comentario}
                                    Autores={this.props.autores}
                                    Tematicas={this.props.tematicas}/>
                    );
                })}
            </div>
        )

        return(
            <Paper className={classes.father}>
                {html}
            </Paper>
        )

    }    
}
Libros.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Libros);