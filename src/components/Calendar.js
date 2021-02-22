import React from "react";
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

      a {
        font-size: 1rem;
        margin-bottom: 5px;
        grid-column: 1 / span 2;
      }
      a, p {
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
const Calendar = ({ calendar }) => {
    const makeDateString = date => date.toLocaleString('default', {weekday: 'long', month: 'short', day: '2-digit' });
    const setItemClass = ({date, hasFile}) => hasFile ? 'hasFile' : (new Date(date) < new Date() ? 'missingFile' : null);

    const plotWeek = () => {
        let day = new Date(),
            nextDay = new Date(day),
            week = [makeDateString(day)];

        for (let i = 1; i <= 6; i++) {
            nextDay.setDate(day.getDate() + 1)
            day.setDate(nextDay.getDate())
            week.push(makeDateString(nextDay))
        }
        return week
    };

    return (
        <CalendarContainer>
            {plotWeek().map(day =>
                <ul key={day}>
                    <h1>{day}</h1>
                    {calendar.filter(dailyShows => makeDateString(new Date(dailyShows.date)) === day)
                        .map(show =>
                            <li key={show.id} className={setItemClass(show)}>
                                <a rel="noopener noreferrer" href={show.URL} target='_blank'><h2>{show.name}</h2></a>
                                <p>Episode {show.episodeNumber}</p>
                                <span>{new Date(show.date).toLocaleString('en-GB', {hourCycle: 'h24', timeStyle: 'short'})}</span>
                            </li>
                        )}
                </ul>
            )}
        </CalendarContainer>
    )
}

export default Calendar