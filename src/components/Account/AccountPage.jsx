import React from 'react';
import {useApplicationContext} from '../../ApplicationContext';
import {Typography} from '@material-ui/core';
import Unauthorised from '../Unauthorised';

export default function AccountPage() {
    const {auth, user} = useApplicationContext();

    if (auth) {
        return (
            <div style={{padding: 20}}>
                <Typography variant="h4" gutterBottom>{user.first_name}'s Account Page</Typography>
            </div>
        );
    } else {
        return (<Unauthorised />);
    }
}