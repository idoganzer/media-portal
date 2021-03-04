import React, {useState, useEffect, useRef} from "react";
import {NavLink} from "react-router-dom";
import styled from "styled-components";
import { links } from "./configuration/config.json"
import DownloadQueue from "./DownloadQueue";
import {ReactComponent as MenuIcon} from "../images/menu.svg";
import {ReactComponent as DownloadIcon} from "../images/download.svg";


const TopBarContainer = styled.div`
    height: 35px;
    width:100%;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: flex-start;
    background: ${props => props.theme.fgColor};
    margin-bottom: 5px;
    h1 {
      font-weight: bold;
      padding:0 12px;
    }
    span {
      flex-grow: 2;
      color: ${props => props.theme.mainBorder};
      a.active {
        font-weight: bold;
      }
    }
    .downloadIcon, .menuIcon {
      height: 20px;
      padding-right: 12px;
      cursor: pointer;
      &:first-of-type {
        height: 15px;
        .arrow {
          transform: translateY(-380px);
          transform-origin: 50% 50%;
          animation: 1s linear downloadAnimation;
          animation-iteration-count: infinite;
        }
        &.hidden {
          display: none;
        }
        @keyframes downloadAnimation {
          100% {transform: translateY(380px);}
        }
      }
    }
`;
const NavigationMenu = styled.nav`
    height: auto;
    width: 300px;
    background: ${props => props.theme.menuColor};
    position: absolute;
    top: 35px;
    right: -300px;
    z-index: 2;
    overflow-y: auto;
    transition: right 120ms ease-in-out;
    a {
      font-size: 1.1em;
      font-variant: all-small-caps;
      font-weight: bold;
    }
    li {
      padding: 15px 5px;
      margin-left: 10px;
      border-bottom: 1px solid ${props => props.theme.menuBorder};
       &:last-child {
        border: none;
       }
    }

    &.isExtended {
      right: 0;
      border-left: 10px solid ${props => props.theme.mainBorder};
    }
`;

/**
 * Saves the last state of a prop/state after a change to is has happened
 * @param value the previous state
 * @return {number} The length of the previous state
 */
const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value.length;
    });
    return ref.current;
}

const TopBar = ({queue, doUpdateByType,doUpdateByApi, loadedState}) => {
    const [isDownloading, setDownloading]   = useState(false),
          [isExtended, toggleExtended]      = useState(false),
          prevUpdate                        = usePrevious(queue);

    const togglePanel = () => toggleExtended(!isExtended);

    useEffect(() => {
        if (prevUpdate !== queue.length && prevUpdate !== undefined) doUpdateByApi('show');
        if (queue.length > 0) setDownloading(true);
            else setDownloading(false);
    }, [queue, prevUpdate, doUpdateByApi]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (loadedState.includes('sonarr')) doUpdateByType('showQueue');
        }, 10000);

        return () => clearInterval(interval)
    }, [loadedState, doUpdateByType]);

    return (
        <TopBarContainer>
            <h1>Media Portal</h1>
            <span>
                <NavLink exact to='/' activeClassName='active'>Tv</NavLink>
                <span> \ </span>
                <NavLink to='/movies' activeClassName='active'>Movies</NavLink>
            </span>
            <DownloadIcon className={isDownloading ? 'downloadIcon' : 'downloadIcon hidden'}/>
            <MenuIcon className={'menuIcon'} onClick={togglePanel}/>
            <NavigationMenu className={isExtended ? 'isExtended': null} onClick={togglePanel}>
                <ul>
                    {
                        links.map(link =>
                            <li key={link.id}>
                                <a rel="noopener noreferrer" href={link.url} target='_blank'>{link.name}</a>
                            </li>
                        )
                    }
                </ul>
                {queue.map(show => <DownloadQueue key={show.id} queue={show} doUpdate={doUpdateByApi}/>)}
            </NavigationMenu>
        </TopBarContainer>
    )
}

export default TopBar;
