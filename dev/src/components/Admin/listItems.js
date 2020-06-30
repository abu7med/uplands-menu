import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';

export const mainListItems = (
  <div>
    <ListItem button >
      <ListItemIcon>
        <LocalCafeIcon />
      </ListItemIcon>
      <ListItemText primary="Beers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <FastfoodIcon />
      </ListItemIcon>
      <ListItemText primary="Food" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LocalBarIcon />
      </ListItemIcon>
      <ListItemText primary="Drinks" />
    </ListItem>
    <ListItem button >
      <ListItemIcon>
        <LocalCafeIcon />
      </ListItemIcon>
      <ListItemText primary="Ciders" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LocalDrinkIcon />
      </ListItemIcon>
      <ListItemText primary="Soda" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LocalBarIcon />
      </ListItemIcon>
      <ListItemText primary="Wine" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
      <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
  </div>
);
