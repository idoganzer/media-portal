import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from 'styled-components';
import Shows from "./components/Shows";
import Movies from "./components/pages/Movies"
import TopBar from "./components/TopBar";
import Calendar from "./components/Calendar";
import Catalog from "./components/Catalog";
import Loading from  "./components/Loading"
import { getDataByType, getDataByAPI, getData } from "./components/services/communication";
import parseResults from "./components/services/parseResults";


// General shared Css values
const theme = {
    bgColor: '#1f1f1f',
    fgColor: '#353535',
    menuColor: '#282828',
    mainBorder: '#EFC958',
    hasFile: '#358c35',
    missingFile: '#8c3551',
    menuBorder: '#303030',
    headerBorder: '#414141',
    textColor: '#f6f6f6'
};
// style for the main site contrainer
const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 7px;
  margin: 30px 7px 15px 7px;
`;

const App = () => {
    const [showCalendar, setShowCalendar]   = useState([]),
          [showHistory, setShowHistory]     = useState([]),
          [showQueue, setShowQueue]         = useState([]),
          [showCatalog, setShowCatalog]     = useState([]),
          [movieCatalog, setMovieCatalog]   = useState([]);

    useEffect(() => {
        // getData()
        //     .then(res => parseResults(res));
        // getDataByType('showHistory', 30)
        //     .then(res => parseResults([{'showHistory' : res}]))
        getDataByAPI('movie')
            .then(res => parseResults(res))
            .then(res => console.log(res))
    }, [])

    return (<h1>hello</h1>)
}

export default App;
