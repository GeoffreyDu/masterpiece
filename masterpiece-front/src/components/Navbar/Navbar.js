import React from 'react';
import './navbar.css'
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import HelpIcon from '@material-ui/icons/Help';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import {Link} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import Logo from "../../Assets/logo.png";
import LogoBlack from "../../Assets/logo_black.png";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `100%`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function NavBar(props) {
  const { container } = props;
  let history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let navLinks = []
  const logout = () => {
    localStorage.clear();
    history.push("/connexion");
  }
  let navNotLogged = [
    {text:'Inscription', path:'/inscription', icon: <AddCircleIcon/>} ,
    {text: 'Connexion', path:'/connexion', icon: <PlayCircleFilledIcon/>}
  ]
  let navLogged = [{text: 'Evénements', path:'/evenements', icon: <HelpIcon/>}, {text: 'Déconnexion', path:{logout}, icon: <HelpIcon/>}]
  let accessToken = localStorage.getItem('access_token');
  accessToken != null ? navLinks = navLogged : navLinks = navNotLogged;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const drawer = (
    <div>
      <div className={`${classes.toolbar} flex`}>
        <Typography className='logoTypo' variant='h6' noWrap>
          <Link className='linkDrawer logoconatainer' to={'/'}><img className="logo" src={LogoBlack} alt="logo"/></Link>
        </Typography>
      </div>
      <Divider />
      <List>
        {navLinks.map(({text, path, icon}, index) => {
                  if (text === 'Déconnexion'){
                    return (
                      <ListItem onClick={logout} key={index} button>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                      )
                  }
                  else{
                    return (
                      <ListItem button key={index}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <Link className='linkDrawer' to={path}><ListItemText primary={text} /></Link>
                      </ListItem>
                      )
                  }
                })}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
            >
            <MenuIcon />
            </IconButton>
            <Typography variant='h6' noWrap>
                <Link className='link logocontainer' to={'/'}><img className="logo" src={Logo} alt="logo"/></Link>
            </Typography>
            <Hidden smDown>
                <div className="rightBar" ></div>
                <List className='flex'>
                {navLinks.map(({text, path}, index) => {
                  if (text === 'Déconnexion'){
                    return (
                      <ListItem onClick={logout} key={index} button>
                          <ListItemText primary={text} />
                      </ListItem>
                      )
                  }
                  else{
                    return (
                      <ListItem button key={index}>
                          <Link className='link' to={path}><ListItemText primary={text} /></Link>
                      </ListItem>
                      )
                  }
                })}
                </List>
            </Hidden>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default NavBar;
