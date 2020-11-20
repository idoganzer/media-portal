import React, {Component} from "react";
import styled, { ThemeProvider } from 'styled-components';
import Shows from "./components/Shows";
import TopBar from "./components/TopBar";
import Calendar from "./components/Calendar";
import Catalog from "./components/Catalog";
import placeholderImg from './images/poster-placeholder.jpg'

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

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 7px;
  margin: 30px 7px 15px 7px;
`;
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
            },
            'catalog': {
                'base': process.env.REACT_APP_SONARR_API_URL + '/series?',
                'key': 'apikey=' + process.env.REACT_APP_SONARR_API_KEY
            }
        }
        this.state = {
            shows: {
                calendar: [],
                history: [],
                catalog: []
            },
            movies: {
                history: []
            }

        };
    }

    componentDidMount = () => {
        this.updateAPIData();
        setInterval(() => {this.updateAPIData()}, 30000);
    }
    updateAPIData = () => {
        this.getAPIData()
            .then(res => this.sortDuplicates(this.parseResults(res)))
            .then(records => this.setState(records))
            .catch(err => console.log(err));
    };
    getAPIData = async () => {
        let response = await Promise.all([
            fetch(this.createRequestString(this.apiObj.calendar, 7)),
            fetch(this.createRequestString(this.apiObj.history, 30)),
            fetch(this.createRequestString(this.apiObj.catalog, null))
        ]);
        return [await response[0].json(), await response[1].json(), await response[2].json()]
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
                        URL: process.env.REACT_APP_SONARR_BASE_URL + '/sonarr/series/' + show.series.titleSlug,
                        img: this.filterPosters(show.series.images)
                    }
                }),
                history: res[1].records
                    .filter(value => value.eventType === 'downloadFolderImported')
                    .map(show => {
                        return {
                            id: show.id,
                            showId: show.seriesId,
                            episodeId: show.episodeId,
                            date: show.episode.airDateUtc,
                            downloaded: Math.round(new Date(show.date).getTime() / 1000),
                            name: show.series.title,
                            title: show.episode.title,
                            episodeNumber: show.episode.episodeNumber,
                            seasonNumber: show.episode.seasonNumber,
                            img: this.filterPosters(show.series.images),
                            URL: process.env.REACT_APP_SONARR_BASE_URL + '/sonarr/series/' + show.series.titleSlug,
                            otherEpisodes: []
                        }
                    }),
                catalog: res[2].map(show => {
                    show.images = process.env.REACT_APP_SONARR_BASE_URL + this.filterPosters(show.images);
                    show.URL = process.env.REACT_APP_SONARR_BASE_URL + '/sonarr/series/' + show.titleSlug;
                    return show
                })
            }
        }
    }
    sortDuplicates = data => {
        data.shows.history = Object.values(
            data.shows.history.reduce((acc, next) => {
                (acc[next.showId] || (acc[next.showId] = [])).push(next);
                return acc
            }, {}))
            .reduce((acc, next) => {
                if (next.length === 1) {
                    return acc.concat(next);
                } else {
                    for (let i = 1; i < next.length; i++) {
                        next[0].otherEpisodes.push(next[i]);
                    }
                    return acc.concat(next[0]);
                }
            },[])
            .sort((a,b) => (a.downloaded > b.downloaded) ? -1 : ((b.downloaded > a.downloaded) ?  1 : 0));
        return data
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
                    <ContentContainer>
                        <Calendar calendar={this.state.shows.calendar}/>
                        <Catalog catalog={this.state.shows.catalog}/>
                    </ContentContainer>
                </ThemeProvider>
            </div>
        );
    };
}

export default App;
