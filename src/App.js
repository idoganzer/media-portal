import React, {Component} from "react";
import Shows from "./components/Shows";
import TopBar from "./components/TopBar";
import placeholderImg from "./images/placeholder.jpg"

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
            }
        }
        this.state = {
            shows: {
                calendar: [],
                history: []
            },
            movies: {
                history: []
            }
        };
    }

    componentDidMount = () => {
        this.GetAPIData()
            .then(res => this.parseResults(res))
            .then(records => this.setState(records))
            .catch(err => console.log(err))
    }
    filterPosters = imageObj => {
        const posters = imageObj.filter(img => img.coverType === 'poster')[0]?.url;
        return posters === undefined ? placeholderImg : posters
    }
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
            },
            movies: {
                history: []
            }
        }
    }
    GetAPIData = async () => {
        let response = await Promise.all([
            fetch(this.createRequestString(this.apiObj.calendar, 7)),
            fetch(this.createRequestString(this.apiObj.history, 50))
        ]);
        return [await response[0].json(), await response[1].json()]
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
        return obj.hasOwnProperty('options') ?
            obj.base + '&' + obj.options + range + '&' + obj.key :
            obj.base + obj.key + '&start=' + this.getDate(range)[0] + '&end=' + this.getDate(range)[1];
    }

    render() {
        return (
            <div className="App">
                <TopBar/>
                <Shows shows={this.state.shows}/>
            </div>
        );
    }
}

export default App;
