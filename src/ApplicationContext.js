import React, {useState} from 'react';
import constate from 'constate';

function useApplicationState() {
    const [auth, setAuth] = useState(false);
    const [users, setUsers] = useState(null);
    const [user, setUser] = useState(null);

    const setInitialData = (initialUsers) => {
        setUsers(initialUsers.users);
    }

    return {auth, setAuth, users, user, setUser, setInitialData};
}

export const [ApplicationContextProvider, useApplicationContext] = constate(useApplicationState);

