import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useApplicationContext} from '../../ApplicationContext';
import {
    Button,
    Checkbox,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
    Typography
} from '@material-ui/core';
import SmsIcon from '@material-ui/icons/Sms';
import EmailIcon from '@material-ui/icons/Email';
import Unauthorised from '../Unauthorised';

export default function ProfilePage() {
    const {auth, user, setUser} = useApplicationContext();
    const [editing, setEditing] = useState(false);
    const [editUser, setEditUser] = useState(user);
    const history = useHistory();

    const handleEdit = () => {
        setEditing(true);
    }

    const handleSave = () => {
        setEditing(false);
        setUser(editUser);
    }

    const handleCancel = () => {
        setEditing(false);
        setEditUser(user);
        if (!editing) {
            history.push("/");
        }
    }

    const handleChange = (type, event) => {
        if (editing) {
            if (type.startsWith("address")) {
                const parts = type.split(".");
                setEditUser({
                    ...editUser,
                    [parts[0]]: {
                        ...editUser.address,
                        [parts[1]] : event.target.value,
                    }
                });
            } else {
                setEditUser({...editUser, [type]: event.target.value});
            }
        }
    }

    const handleContactPrefChange = (type) => {
        let currentContacts = editUser.preferences.contact;
        const checked = editUser.preferences.contact.indexOf(type) !== -1;
        if (checked) {
            currentContacts = currentContacts.filter(contact => contact !== type);
        } else {
            currentContacts.push(type);
        }
        setEditUser({
            ...editUser,
            preferences: {
                contact: currentContacts,
            }
        });
    }

    if (auth) {
        return (
            <div style={{padding: 20}}>
                <Typography variant="h4" gutterBottom>Profile Page</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextField id="firstName" label="First Name" variant="outlined" disabled={!editing} fullWidth value={editUser.first_name} onChange={event => handleChange('first_name', event)} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="otherNames" label="Other Names" variant="outlined" disabled={!editing} fullWidth value={editUser.other_names} onChange={event => handleChange('other_names', event)} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom align="left">Address Details</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="street" label="Street" variant="outlined" disabled={!editing} fullWidth value={editUser.address.street} onChange={event => handleChange('address.street', event)} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="town" label="Town" variant="outlined" disabled={!editing} fullWidth value={editUser.address.town} onChange={event => handleChange('address.town', event)} />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField id="county" label="County" variant="outlined" disabled={!editing} fullWidth value={editUser.address.county} onChange={event => handleChange('address.county', event)} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="postcode" label="Postcode" variant="outlined" disabled={!editing} fullWidth value={editUser.address.postcode} onChange={event => handleChange('address.postcode', event)} />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField id="mobile" label="Mobile" variant="outlined" disabled={!editing} fullWidth value={editUser.mobile} onChange={event => handleChange('mobile', event)} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField id="email" label="Email" variant="outlined" disabled={!editing} fullWidth value={editUser.email} onChange={event => handleChange('email', event)} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField id="company" label="Company" variant="outlined" disabled={!editing} fullWidth value={editUser.company} onChange={event => handleChange('company', event)} />
                    </Grid>

                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h6" gutterBottom>Contact Preferences</Typography>
                        {editing &&
                            <List component="nav">
                                <ListItem button key="sms" onClick={() => handleContactPrefChange('sms')} value={editUser.preferences.contact.indexOf('sms') !== -1}>
                                    <ListItemIcon>
                                        <SmsIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="SMS"/>
                                    <Checkbox edge="end" value={editUser.preferences.contact.indexOf('sms') !== -1} checked={editUser.preferences.contact.indexOf('sms') !== -1} disableRipple/>
                                </ListItem>
                                <ListItem button key="email" onClick={() => handleContactPrefChange('email') > 0} value={editUser.preferences.contact.indexOf('email') !== -1}>
                                    <ListItemIcon>
                                        <EmailIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Email"/>
                                    <Checkbox edge="end" value={editUser.preferences.contact.indexOf('email') !== -1} checked={editUser.preferences.contact.indexOf('email') !== -1} disableRipple/>
                                </ListItem>
                            </List>
                        }
                        <List component="nav">
                        {!editing && editUser.preferences.contact.map(contact =>
                            <ListItem button key={contact} disabled>
                                <ListItemIcon>
                                    {contact === 'sms' ? <SmsIcon /> : <EmailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={contact.toUpperCase()} />
                            </ListItem>
                        )}
                        </List>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>

                    <Grid item xs={8}>
                    </Grid>
                    <Grid item xs={4}>
                        {editing ? <Button color="secondary" onClick={handleSave} >Save</Button> : <Button color="secondary" onClick={handleEdit} >Edit</Button>}
                        <Button color="primary" onClick={handleCancel}>Cancel</Button>
                    </Grid>

                </Grid>
            </div>
        );
    } else {
        return (<Unauthorised />);
    }
}