import React, {Component} from "react";
import styled from "styled-components";

const CalendarContainer = styled.div`
  ul {
    margin-bottom: 25px;
    h1 {
      font-size: 1.5em;
      border-bottom: 2px solid #414141;
      padding-bottom: 5px;
    }
    li {
      background: ${props => props.theme.menuColor};
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: fit-content() 1fr;
      padding: 5px;
      margin: 7px 0;
      &:nth-child(odd) {
         background: ${props => props.theme.menuBorder};
      }
      &.hasFile {
        background: ${props => props.theme.hasFile};
      }
      &.missingFile {
        background: ${props => props.theme.missingFile};
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
  
  @media(max-width: 500px) {
      //width: 98vw;
      //margin: 25px auto 15px auto;
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
    setItemClass = ({date, hasFile}) => hasFile ? 'hasFile' : (new Date(date) < new Date() ? 'missingFile' : null);

    buildCal = () => {
        return (
            this.state.weekArray.map(day =>
                <ul key={day}>
                    <h1>{day}</h1>
                    {
                        this.props.calendar
                            .filter(dailyShows => this.makeDateString(new Date(dailyShows.date)) === day)
                            .map(show => {
                                return (
                                    <li key={show.id} className={this.setItemClass(show)}>
                                        <h2>{show.name}</h2>
                                        <p>Episode {show.episodeNumber}</p>
                                        <span>{new Date(show.date).toLocaleString('en-GB', {hourCycle: 'h24', timeStyle: 'short'})}</span>
                                    </li>
                                )
                            })
                    }
                </ul>
            )
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