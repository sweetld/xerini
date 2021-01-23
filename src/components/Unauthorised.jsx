import React from 'react';
import {Typography} from '@material-ui/core';

export default function Unauthorised() {
    return (
        <div style={{padding: 20}}>
            <Typography variant="h4" gutterBottom color="textPrimary">You are not authorised to access this page!</Typography>
        </div>
    );
}