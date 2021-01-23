import React, {useState} from 'react';
import {IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import {AccountCircle} from '@material-ui/icons';
import {useApplicationContext} from '../ApplicationContext';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}));

export default function MenuBar(props) {
    const classes = useStyles();
    const {auth, setAuth} = useApplicationContext();
    const [anchorE1, setAnchorE1] = useState(null);
    const open = Boolean(anchorE1);

    const handleMenu = (event) => {
        setAnchorE1(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorE1(null);
    }

    const handleSignOut = () => {
        setAuth(false);
        setAnchorE1(null);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/" style={{color: 'white'}} >Xerini Coding Exercise</Link>
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton onClick={handleMenu} color="inherit">
                                <AccountCircle/>
                            </IconButton>
                            <Menu id="menu-appbar" anchorE1={anchorE1}
                                  anchorOrigin={{vertical: 'top', horizontal: 'right',}} keepMounted
                                  transformOrigin={{vertical: 'top', horizontal: 'right',}} open={open}
                                  onClose={handleClose}>
                                <Link to="/profile" onClick={handleClose} ><MenuItem>Profile</MenuItem></Link>
                                <Link to="/account" onClick={handleClose} ><MenuItem>My Account</MenuItem></Link>
                                <Link to="/" onClick={handleSignOut} ><MenuItem>Sign out</MenuItem></Link>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}