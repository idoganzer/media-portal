import React, {useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';

import useOnClickOutside from './hooks/useOnClickOutside';

import {postSonarrCommand} from "../redux/features/shows/sonarrCommand";

import {ReactComponent as WantedIcon} from "../images/warning.svg";
import {ReactComponent as RefreshIcon} from "../images/refresh.svg";

const WantedListContainer = styled.div`
  position: relative;
  .wantedIcon {
    height: 18px;
    cursor: pointer;
    path {
      fill: ${props => props.theme.mainBorder};
    }
  }
  .wantedList {
    width: 300px;
    position: absolute;
    top: 40px;
    left: -550px;
    background: ${props => props.theme.menuColor};
    z-index: 2;
    border-left: 5px solid ${props => props.theme.mainBorder};
    transition: left 120ms ease-in-out; 
    li {
      font-weight: normal;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      h1 {
        font-size: 0.65em;
        font-weight: bold;
        padding: 2px 0;
      }
      &:not(:first-child) {
        font-size: 0.65em;
        border: 1px solid ${props => props.theme.menuBorder};
      }
      svg {
        height: 15px;
        fill: ${props => props.theme.textColor};
        cursor: pointer;
      }
      .rotate {
        animation: rotating 2s linear infinite;
      }
      @keyframes rotating {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }

    &.isExtended {
      left: -150px;
    }
  }
`;

const WantedList = () => {
    const wantedShows = useSelector(state => state.showWanted),
          [isExtended, setIsExtended] = useState(false),
          wantedListRef = useRef(null),
          dispatch = useDispatch();

    useOnClickOutside(wantedListRef, () => setIsExtended(false));

    const toggleWantedList = () => setIsExtended(!isExtended);

    const handleRefresh = () => {
        dispatch(postSonarrCommand('missingEpisodeSearch'));
    }
    return (
        <WantedListContainer ref={wantedListRef}>
            {wantedShows.data.length
                ? <WantedIcon onClick={toggleWantedList} className='wantedIcon'/>
                : null}
            <ul className={'wantedList ' + (isExtended ? 'isExtended': null)}>
                <li>
                    <h1>Wanted Shows</h1>
                    <RefreshIcon className={wantedShows.reqState === 'pending' ? 'rotate' : null} onClick={handleRefresh}/>
                </li>
                {wantedShows.data.map(show =>
                    <li key={show.id}>
                        <a rel="noopener noreferrer" href={show.URL} target='_blank'>{show.title} - {show.episode}</a>
                    </li>
                )}
            </ul>
        </WantedListContainer>
    )
};

export default WantedList;
