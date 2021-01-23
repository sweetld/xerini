import './App.css';
import AppBody from './components/AppBody';
import React from 'react';
import {ApplicationContextProvider} from './ApplicationContext';
import {BrowserRouter} from 'react-router-dom';
import MenuBar from './components/MenuBar';

function App() {
    return (
        <div className="App">
            <ApplicationContextProvider>
                <BrowserRouter>
                    <MenuBar>
                    </MenuBar>
                    <AppBody>
                    </AppBody>
                </BrowserRouter>
            </ApplicationContextProvider>
        </div>
    );
}

export default App;
