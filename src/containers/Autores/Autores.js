import React, { Component } from "react";
import axios from 'axios'
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Loading from '../../components/Loading/Loading';
import { Paper } from "@material-ui/core";

const styles = theme => ({
    father : {
        position: "relative",
        padding: "10px",
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
        };
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
                    <h1>Lista de autores</h1>            
                    { this.state.autores.map(row => {
                        return (
                        <ul key={row.id}>
                            <li>{row.nombre}</li>                
                        </ul>
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
                    {html}
                </Paper>
            )
    }    
}


AutoresTabla.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutoresTabla);