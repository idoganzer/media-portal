import React, {useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import GlobalStyle from "./style/GlobalStyles";
import {ThemeProvider} from 'styled-components';
import {darkTheme, lightTheme} from "./style/Themes";

import TopBar from "./components/TopBar";
import Movies from "./components/pages/Movies";
import Shows from "./components/pages/Shows";
import Loading from "./components/Loading";

import {updateAll} from "./redux/features/update";
import useInterval from "./components/hooks/useInterval";

const App = () => {
    const isDarkMode = useSelector(state => state.themeControl.isDarkMode);

    useEffect(() => { updateAll() }, []);
    useInterval(() => { updateAll() }, 60000);
    return (
        <Router>
            <div className={'App'}>
                <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                    <GlobalStyle/>
                    <TopBar/>
                    <Switch>
                        <Route exact path='/' render={props => (
                            <>
                                <Loading/>
                                <Shows/>
                            </>
                        )}/>
                        <Route path='/movies' render={props => (
                            <>
                                <Loading/>
                                <Movies/>
                            </>
                        )}/>
                    </Switch>
                </ThemeProvider>
            </div>
        </Router>
    )
};

export default App;
