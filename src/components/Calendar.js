import React, {Component} from "react";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 98vw;
  margin: 25px auto 15px auto;
  ul {
    margin-bottom: 25px;
    h1 {
      font-size: 1.5em;
      border-bottom: 2px solid #414141;
      padding-bottom: 5px;
    }
    li {
      background: #292929;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: fit-content() 1fr;
      padding: 5px;
      margin: 7px 0;
      &:nth-child(odd) {
        background: #303030;
      }
      h2 {
        font-size: 1rem;
        margin-bottom: 5px;
        grid-column: 1 / span 2;
      }
      h2, p {
        margin-left: 3px;
      }
      p, span {
        font-size: 0.9em;
      }
      span {
        text-align: right;
        margin-right: 5px;
        font-weight: bold;
      }
    }
  }
`;
class Calendar extends Component{
    constructor() {
        super();
        this.state = {
            weekArray: []
        }
    };
    componentDidMount = () => {
        this.setState({ weekArray: this.plotWeek() });
    };
    makeDateString = date => date.toLocaleString('default', {weekday: 'long', month: 'short', day: '2-digit' });
    plotWeek = () => {
        let day = new Date(),
            nextDay = new Date(day),
            week = [this.makeDateString(day)];

        for (let i = 1; i <= 6; i++) {
            nextDay.setDate(day.getDate() + 1)
            day.setDate(nextDay.getDate())
            week.push(this.makeDateString(nextDay))
        }
        return week
    };
    buildCal = () => {
        return (
            this.state.weekArray.map(day => <ul key={day}>
                <h1>{day}</h1>
                {
                    this.props.calendar
                        .filter(dailyShows => this.makeDateString(new Date(dailyShows.date)) === day)
                        .map(show => {
                            console.log(show);
                            return (
                                <li key={show.id}>
                                    <h2>{show.name}</h2>
                                    <p>Episode {show.episodeNumber}</p>
                                    <span>{new Date(show.date).toLocaleString('default', {hourCycle: 'h24', timeStyle: 'short'})}</span>
                                </li>
                            )
                        })
                }
            </ul>)
        )
    }


    render() {
        return (
            <CalendarContainer>
                {this.buildCal()}
            </CalendarContainer>
        );
    };
}

export default Calendar

// let x = this.props.calendar
//     .filter(dailyShows => this.makeDateString(new Date(dailyShows.date)) === day).map(show => {
//         console.log(new Date(show.date).toLocaleString('default', {hourCycle: 'h24', timeStyle: 'short'}));
//         return show
//     })