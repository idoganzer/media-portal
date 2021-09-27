import React, {useState, useRef} from "react";
import {NavLink} from "react-router-dom";
import styled from "styled-components";
import {useDispatch} from "react-redux";

import {toggle} from "../redux/features/toggleTheme"
import useOnClickOutside from './hooks/useOnClickOutside';
import { links } from "./configuration/config.json"

import {ReactComponent as MenuIcon} from "../images/menu.svg";
import {ReactComponent as ThemeIcon} from "../images/light-bulb.svg";

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
      color: ${props => props.theme.headerTextColor};
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
        fill: ${props => props.theme.burgerFill}
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
    .settingsMenuContainer {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding: 10px 5px;
      box-sizing: border-box;
      .themeIcon {
        height: 19px;
        margin-right: 10px;
        border-bottom: 1px solid ${props => props.theme.menuBorder};
        fill: ${props => props.theme.textColor};
        cursor: pointer;
      }
    }
    a {
      font-size: 1.1em;
      font-variant: all-small-caps;
      font-weight: bold;
    }
    li {
      padding: 15px 5px;
      margin-left: 10px;
      border-bottom: 1px solid ${props => props.theme.menuBorder};
    }
    &.isExtended {
      right: 0;
      border-left: 10px solid ${props => props.theme.mainBorder};
    }
`;


const TopBar = () => {
    const [isExtended, setIsExtended] = useState(false),
          navigationMenuRef = useRef(null),
          dispatch = useDispatch();

    useOnClickOutside(navigationMenuRef, () => setIsExtended(false));

    const togglePanel = () => setIsExtended(!isExtended);
    const toggleTheme = () => dispatch(toggle());

    return (
        <TopBarContainer ref={navigationMenuRef}>
            <h1>Media Portal</h1>
            <span>
                <NavLink exact to='/' activeClassName='active'>Tv</NavLink>
                <span> \ </span>
                <NavLink to='/movies' activeClassName='active'>Movies</NavLink>
            </span>
            <MenuIcon className={'menuIcon'} onClick={togglePanel}/>
            <NavigationMenu className={isExtended ? 'isExtended': null}>
                <ul>
                    {
                        links.map(link =>
                            <li key={link.id}>
                                <a rel="noopener noreferrer" href={link.url} target='_blank'>{link.name}</a>
                            </li>
                        )
                    }
                </ul>
                <div className="settingsMenuContainer">
                    <ThemeIcon onClick={toggleTheme} className='themeIcon'/>
                </div>
            </NavigationMenu>
        </TopBarContainer>
    )
};

export default TopBar;
