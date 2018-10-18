import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import { CardHeader } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  card: {
    minWidth: 275,
    maxWidth: 500,
    marginTop: '10px',
    marginBottom: '10px',
    marginRight: '15px',
    marginLeft: '15px',
    display: 'inline-block',
    // marginRight: 'auto',
    // marginLeft: 'auto',
    // display: 'block'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    marginLeft: 'auto',
    marginRight: 'auto',
    margin: theme.spacing.unit,
  }
});

this.state = {
  redirectEdit: false,
  redirectDelete: false,
};


class BookCard extends Component {

  
  constructor(props) {      
    super(props);
    this.state = {
      redirect: false,
    }

    this.redirectDelete = this.redirectDelete.bind(this);    
    this.redirectEdit = this.redirectEdit.bind(this);    
    this.delete = this.delete.bind(this);    
  }
  
  redirectEdit(event) {    
    this.setState({redirectEdit: true});
    event.preventDefault();
  }

  redirectDelete(event) {    
    this.setState({redirectDelete: true});
  }  

  delete(event,id) {
    this.redirectDelete(event);
    
    axios.delete('http://localhost:3000/libro/' + this.props.id)
        .then ((result) => {
            console.log(result);
        })
        .catch ((error) => {
            console.log(error);
        })
    event.preventDefault();
  }

  render() {

    const { classes } = this.props;
    const editar = "/libros/editar/" + this.props.id;
    const borrar = "/libros";
    
    if (this.state.redirectEdit) {
      return <Redirect to={editar} />
    }
    else if (this.state.redirectDelete) {
      return <Redirect to={borrar} />
    }

    var autor = this.props.Autores.find( e => e.id === this.props.Autor );

    if (autor) {
      autor = autor.nombre;
    } else {
      autor = '';
    }

    var tematica = this.props.Tematicas.find( e => e.id === this.props.Tematica );

    if (tematica) {
      tematica = tematica.nombre;
    } else {
      tematica = '';
    }


    return (
      <Card className={classes.card}>

        <CardHeader
          title={this.props.Titulo}
          // subheader={this.props.Autor}
          subheader={autor}
        />
        <Divider/>
        <CardContent>
          <Typography className={classes.pos} color="textSecondary">
          {tematica}
          </Typography>
          <Typography component="p">
          {this.props.Precio+' €'}
          <br />
          {this.props.Comentario}  
          </Typography>
        </CardContent>
        <Divider/>
        <CardActions className={classes.actions} disableActionSpacing>
          <Button variant="contained" aria-label="Editar" className={classes.button} onClick={this.redirectEdit} color='primary'>
              <EditIcon/> Editar
          </Button>
          <Button variant="contained" aria-label="Borrar" className={classes.button} onClick={this.delete} color='secondary'>
              <DeleteIcon/> Borrar
          </Button>           
        </CardActions>


      </Card>
    )};
}


BookCard.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.any,
  Titulo: PropTypes.any,
  Autor: PropTypes.any,
  Precio: PropTypes.any,
  Comentario: PropTypes.any,
  Tematica: PropTypes.any,
  Autores: PropTypes.any,
  Tematicas: PropTypes.any,
};

BookCard.defaultProps = {
  Titulo: 'Título',
  Autor: 'Autor',
  Precio: '0',
  Comentario: 'Comentario',
  Tematica: 'Temática',
}
export default withStyles(styles)(BookCard);
