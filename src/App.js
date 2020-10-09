import React, {Component} from "react";
import { ThemeProvider } from 'styled-components';
import Shows from "./components/Shows";
import TopBar from "./components/TopBar";
import Calendar from "./components/Calendar";
import placeholderImg from './images/poster-placeholder.jpg'
const theme = {
    bgColor: '#1f1f1f',
    fgColor: '#2b2b2b',
    menuColor: '#282828',
    mainBorder: '#227ccb',
    menuBorder: '#303030',
    headerBorder: '#414141',
    textColor: '#f6f6f6'
};
class App extends Component{
    constructor() {
        super();
        this.apiObj = {
            'calendar': {
                'base': process.env.REACT_APP_SONARR_API_URL + '/calendar?',
                'key': 'apikey=' + process.env.REACT_APP_SONARR_API_KEY
            },
            'history': {
                'base': process.env.REACT_APP_SONARR_API_URL + '/history?grabs',
                'options': 'pageSize=',
                'key': 'apikey=' + process.env.REACT_APP_SONARR_API_KEY
            },
            'queue': {
                'base' : process.env.REACT_APP_SONARR_API_URL + '/queue?',
                'key': 'apikey=' + process.env.REACT_APP_SONARR_API_KEY
            }
        }
        this.state = {
            shows: {
                calendar: [],
                history: []
            },
            movies: {
                history: []
            },
        };
    }

    componentDidMount = () => {
        this.updateAPIData();
    }
    updateAPIData = () => {
        this.getAPIData()
            .then(res => this.parseResults(res))
            .then(records => this.setState(records))
            .catch(err => console.log(err));
    };
    getAPIData = async () => {
        let response = await Promise.all([
            fetch(this.createRequestString(this.apiObj.calendar, 7)),
            fetch(this.createRequestString(this.apiObj.history, 50))
        ]);
        return [await response[0].json(), await response[1].json()]
    }
    getQueueData = async () => await fetch(this.createRequestString(this.apiObj.queue, null));
    parseResults = res => {
        return {
            shows: {
                calendar: res[0].map(show => {
                    return {
                        id: show.id,
                        date: show.airDateUtc,
                        name: show.series.title,
                        title: show.title,
                        episodeNumber: show.episodeNumber,
                        status: show.series.status,
                        hasFile: show.hasFile,
                        img: this.filterPosters(show.series.images)
                    }
                }),
                history: res[1].records
                    .filter(value => value.eventType === 'downloadFolderImported')
                    .map(show => {
                        return {
                            id: show.id,
                            date: show.episode.airDateUtc,
                            name: show.series.title,
                            title: show.episode.title,
                            episodeNumber: show.episode.episodeNumber,
                            seasonNumber: show.episode.seasonNumber,
                            status: show.series.status,
                            img: this.filterPosters(show.series.images)
                        }
                    })
            }
        }
    }
    filterPosters = imageObj => {
        const posters = imageObj.filter(img => img.coverType === 'poster')[0]?.url;
        return posters === undefined ? placeholderImg : posters
    }
    getDate = range => {
        let now = new Date(),
            startString = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + (now.getDate());

        if (typeof range === 'undefined' ) return startString
        else {
            let end = new Date((new Date()).setDate(now.getDate() + range)),
                endString = end.getFullYear() + "-" + (end.getMonth() + 1) + "-" + (end.getDate());
            return [startString,endString]
        }
    }
    createRequestString = (obj, range) => {
        if (range === null) return obj.base + obj.key;
        if (obj.hasOwnProperty('options')) return obj.base + '&' + obj.options + range + '&' + obj.key;
        return obj.base + obj.key + '&start=' + this.getDate(range)[0] + '&end=' + this.getDate(range)[1];
    }
    buildEpisodeNum = (season, episode) => {
        return 'S' + (season.toString().length > 1 ? season : '0' + season) +
            'E' + (episode.toString().length > 1 ? episode : '0' + episode)
    }
    render() {
        return (
            <div className="App">
                <ThemeProvider theme={theme}>
                    <TopBar queue={this.getQueueData} doUpdate={this.updateAPIData} episodeNum={this.buildEpisodeNum}/>
                    <Shows shows={this.state.shows} buildEpisodeNum={this.buildEpisodeNum}/>
                    <Calendar calendar={this.state.shows.calendar}/>
                </ThemeProvider>
            </div>
        );
    };
}

export default App;
