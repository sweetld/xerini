import React from 'react';
import {Route, Switch} from 'react-router-dom';
import ProfilePage from './components/Profile/ProfilePage';
import AccountPage from './components/Account/AccountPage';
import HomePage from './components/Home/HomePage';

const Layout = () => (
    <div id="app">
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/profile" component={ProfilePage}/>
            <Route exact path="/account" component={AccountPage}/>
        </Switch>
    </div>
);

export default Layout;