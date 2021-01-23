import React, {useEffect, useState} from 'react';
import logo from '../logo.svg';
import {Route} from 'react-router-dom';
import {useApplicationContext} from '../ApplicationContext';
import Layout from '../Layout';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@material-ui/core';
import profileData from '../profile-data.json';

export default function AppBody(props) {
    const {auth, setAuth, setInitialData, users, setUser} = useApplicationContext();
    const [logonOpen, setLogonOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setInitialData(profileData);
    }, [setInitialData]);

    const handleLogonOpen = () => {
        setLogonOpen(true);
    }

    const handleClose = () => {
        setLogonOpen(false);
    }

    const handleLogon = () => {
        setLogonOpen(false);
        const user = users.find(user => user.email === email);
        if (user) {
            setAuth(true);
            setUser(user);
            setEmail("");
            setPassword("");
        } else {
            setAuth(false);
        }
    }

    const handleEmail = (event) => {
        setEmail(event.target.value.trim());
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    if (auth) {
        return (<Route component={Layout}/>);
    }
    return (
        <div>
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
                <Button variant="outlined" color="primary" onClick={handleLogonOpen}>Please logon</Button>
                <Dialog open={logonOpen} onClose={handleClose}>
                    <DialogTitle>Logon</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please logon with any password
                        </DialogContentText>
                        <TextField autoFocus margin="dense" id="userName" label="Email Address" fullWidth onChange={handleEmail} value={email}/>
                        <TextField margin="dense" id="password" label="Password" type="password" fullWidth onChange={handlePassword} value={password}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleLogon} color="primary">
                            Logon
                        </Button>
                    </DialogActions>
                </Dialog>
            </p>
        </div>
    );
}