import React from 'react';
import {useApplicationContext} from '../../ApplicationContext';
import {Typography} from '@material-ui/core';
import Unauthorised from '../Unauthorised';

export default function ProfilePage() {
    const {auth, user} = useApplicationContext();

    if (auth) {
        return (
            <div style={{padding: 20}}>
                <Typography variant="h4" gutterBottom>Home Page</Typography>
                <p>Welcome {user.first_name}</p>
            </div>
        );
    } else {
        return (<Unauthorised />);
    }
}