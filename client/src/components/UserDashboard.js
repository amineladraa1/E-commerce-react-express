import React, { useState } from "react";
import {
  makeStyles,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  Badge,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
  pushDown: {
    height: theme.mixins.toolbar.minHeight + 10,
  },
  drawer: {
    width: 250,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 250,
    backgroundColor: theme.palette.primary.main,

    color: "#fff",
    "& .MuiListItemText-root": {
      opacity: 0.7,
    },
  },
  drawerIcon: {
    color: theme.palette.secondary.main,
  },
  drawerItemSelected: {
    color: "#fff",
    "& .MuiListItemText-root": {
      opacity: 1,
    },
    "& .MuiListItem-button": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

function Dashboard() {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(0);
  return (
    <>
      <div className={classes.pushDown} />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.pushDown} />
        <List>
          <ListItem
            selected={drawer === 0}
            classes={{ selected: classes.drawerItemSelected }}
            button
            onClick={() => setDrawer(0)}
          >
            <ListItemIcon>
              {" "}
              <PersonIcon className={classes.drawerIcon} />
            </ListItemIcon>
            <ListItemText primary="Your Profile" />
          </ListItem>
          <ListItem
            button
            selected={drawer === 1}
            classes={{ selected: classes.drawerItemSelected }}
            onClick={() => setDrawer(1)}
          >
            <ListItemIcon>
              {" "}
              <Badge badgeContent={4} color="secondary">
                <ShoppingCartIcon className={classes.drawerIcon} />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Visit Card" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Dashboard;
