import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  center: {
    textAlign: 'center',
  }
});

function Loading(props) {
  const { classes } = props;

  var label = '';

  if (props.withLabel) {
    label = 'Cargando';
  }

  return (
    <div className={classes.center}>
      <CircularProgress className={classes.progress} size={props.size} thickness={5}/>
      <h3 style={{margin : '0'}}>{label}</h3>
    </div>
  );
}

Loading.defaultProps = {
  size: 100,
  withLabel: false,
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
  // size: PropTypes.object.number,
  // withLabel: PropTypes.object.bool,
};

export default withStyles(styles)(Loading);