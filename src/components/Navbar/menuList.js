import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import { Link } from 'react-router-dom';

export const menu = (
  <div>

  <Link to="/buscar" style={{ textDecoration: 'none' }}>
    <ListItem button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Buscar" />
    </ListItem>
  </Link>

    <Link to="/libros" style={{ textDecoration: 'none' }}>
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Libros" />
      </ListItem>
    </Link>

    <Link to="/autores" style={{ textDecoration: 'none' }}>
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Autores" />
      </ListItem>
    </Link>

    <Link to="/tematicas" style={{ textDecoration: 'none' }}>
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Temáticas" />
      </ListItem>
    </Link>
  </div>
);