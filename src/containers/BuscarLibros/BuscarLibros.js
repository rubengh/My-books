import React, { Component } from "react";
import axios from 'axios'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Loading from '../../components/Loading/Loading';
import { Paper } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClearIcon from '@material-ui/icons/Clear';
import { Link } from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
    father : {
        position: "relative",
        padding: "10px",
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
      },
      root: {
        width: '100%',
      },
      heading: {
        fontSize: theme.typography.pxToRem(15),
      },
      secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
      },
      icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
      },
      details: {
        alignItems: 'center',
      },
      column: {
        flexBasis: '33.33%',
      },
      helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
      },
      link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
      resaltado: {
        '&:hover': {
            backgroundColor: '#eeeeee'
          },
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
            comprado: '',
            autores_list : [],
            tematicas_list : [],
            comprado_list : [{id: 'S',nombre: 'Si'}, {id: 'N',nombre: 'No'}],
            expanded: null,
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
            this.handleExpand       = this.handleExpand.bind(this);
            this.handleClean        = this.handleClean.bind(this);
            this.handleCleanFilters = this.handleCleanFilters.bind(this);
            this.handleSubmit       = this.handleSubmit.bind(this);
        }
        
    handleExpand = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    }

    getLibros() {
        this.setState({isLoading: true});
        axios.get('http://localhost:3000/libro', { params: {titulo : this.state.titulo, autor: this.state.autor, tematica: this.state.tematica, comprado: this.state.comprado} })
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
                this.setState({ isLoading : false });
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
            tematica: '',
            comprado: ''            
        });        
    }
    
    handleSubmit(event) {
        this.getLibros();
        event.preventDefault();
    }

    componentWillMount() {
        this.getLibros();
    }
    
    render () {
        const { classes } = this.props;
        const { expanded } = this.state;      
        const backpath = '/buscar';        
            
        var html = '';
        var htmlHeader = '';
        var autores_list = this.state.autores_list;
        var tematicas_list = this.state.tematicas_list;
        var comprado_list = this.state.comprado_list;        
        var libros = this.state.libros;
        var editar = '/libros/editar/';
        var label = "Total registros: " + this.state.total_rows;

        htmlHeader = (
            <div>
                <Chip label={label} color="primary"/>
                <form className={classes.container} onSubmit={this.handleSubmit}>
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
                                    <ClearIcon/>
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
                                    <ClearIcon/>
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

                    <TextField
                        id="comprado"
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
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="Limpiar"
                                    onClick={() => {this.handleClean("comprado")}}
                                >
                                    <ClearIcon/>
                                </IconButton>
                                </InputAdornment>
                            ),
                            }}                                                                                                    
                        >
                        <option key={undefined} value={undefined}>
                        
                        </option>
                        {comprado_list.map(option => (
                        <option key={option.id} value={option.id}>
                            {option.nombre}
                        </option>
                        ))}
                    </TextField>                            

                    <Button color="primary" variant="contained" size="small" className={classes.button} onClick={() => {this.handleCleanFilters();}}>
                        <ClearIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                        Limpiar
                    </Button>
                    <Button type="submit" value="Submit" color="primary" variant="contained" size="small" className={classes.button} onClick={() => {this.getLibros()}}>
                        <SearchIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                        Buscar
                    </Button>
                </form>
            </div>
        )
        
            if (!this.state.isLoading) {
                html = (
                    <div className={classes.root}> 
                        { libros.map((row, i) => {
                                return (
                                    <ExpansionPanel className={classes.resaltado} expanded={expanded === row.id} onChange={this.handleExpand(row.id)} key={row.id}>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <div className={classes.column}>
                                            <Typography className={classes.secondaryHeading}>Título</Typography>
                                            <Typography className={classes.heading}>{row.titulo}</Typography>
                                        </div>
                                        <div className={classes.column}>
                                            <Typography className={classes.secondaryHeading}>Autor</Typography>
                                            <Typography className={classes.heading}>{row.nombre_autor}</Typography>
                                        </div>
                                        <div className={classes.column}>
                                            <Typography className={classes.secondaryHeading}>Temática</Typography>
                                            <Typography className={classes.heading}>{row.nombre_tematica}</Typography>
                                        </div>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails className={classes.details}>
                                        <div className={classes.column}> 
                                            <Typography className={classes.secondaryHeading}>Comprado</Typography>
                                            <Typography className={classes.heading}>{row.comprado}</Typography>
                                        </div>
                                        <div className={classes.column}>
                                            <Typography className={classes.secondaryHeading}>Precio</Typography>
                                            <Typography className={classes.heading}>{row.precio}€</Typography>
                                        </div>                               
                                        <div className={classes.column}>
                                            <Typography className={classes.secondaryHeading}>Actividad reciente</Typography>
                                            <Typography className={classes.heading}>Aquí irá el comentario más reciente</Typography>
                                        </div>
                                        </ExpansionPanelDetails>
                                        <Divider />
                                        <ExpansionPanelActions>
                                        <Button onClick={this.handleExpand(undefined)} size="medium">Cancelar</Button>
                                        <Button component={Link} to={{pathname: editar+row.id, state: { backpath: backpath } }} size="medium" color="primary">Detalle</Button>
                                        </ExpansionPanelActions>
                                    </ExpansionPanel>
                                );
                        })}
                    </div>                    
                )
            } else {
                html = (
                    <Loading size={100} withLabel={true}/>
                )
            }

            return(
                <Paper className={classes.father} >
                    {htmlHeader}
                    {html} 
                </Paper>
            )
    }    
}


BuscarLibros.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BuscarLibros);