import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from "@material-ui/core";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import Hidden from "@material-ui/core/Hidden";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import { getSettings } from "../common/constants";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    textDecoration: "none",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  list: {
    width: 250,
  },
  primary: {
    width: 40,
  },
  brandImgContainer: {
    display: "flex",
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  brandImg: {
    width: "100%",
  },
  brandTxt: {
    flex: 1,
  },
  link: {
    textDecoration: "none",
    color: "orange",
    fontWeight: "bold",
  },
  listItemText: {
    "& span": {
      letterSpacing: "0.2em",
    },
  },
}));

export default function SwipeableTemporaryDrawer({ state, toggleDrawer }) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const list = () => (
    <div
      className={classes.toolbar}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div className={classes.brandImgContainer}>
        <img className={classes.brandImg} src="/images/logo.jpg" />
        <Typography className={classes.brandTxt} color="secondary" variant="h6">
          RESTAURANG
        </Typography>
      </div>
      <Divider />
      <List>
        <Link className={classes.link} to="/settings">
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText className={classes.listItemText} primary="Settings" />
          </ListItem>
        </Link>

        <Link className={classes.link} to="/users">
          <ListItem button key="key-users">
            <ListItemIcon>
              <PeopleOutlineIcon />
            </ListItemIcon>
            <ListItemText className={classes.listItemText} primary="Users" />
          </ListItem>
        </Link>

        <Divider />

        <Box
          component="a"
          href="/"
          className={classes.link}
          display={{ xs: "block", sm: "none" }}
        >
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText className={classes.listItemText} primary="Logout" />
          </ListItem>
        </Box>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <div>
      <Hidden smUp implementation="css">
        <SwipeableDrawer
          anchor="left"
          open={state.open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {list()}
        </SwipeableDrawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <SwipeableDrawer
          anchor="left"
          open={state.open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {list()}
        </SwipeableDrawer>
      </Hidden>
    </div>
  );
}
