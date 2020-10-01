import React, {Component} from "react";
import styled from "styled-components";
import DownloadQueue from "./DownloadQueue";
import configData from "../config.json"
import {ReactComponent as MenuIcon} from "../images/menu.svg";
import {ReactComponent as DownloadIcon} from "../images/download.svg";

const TopBarContainer = styled.div`
    height: 25px;
    width:100%;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    background: #2b2b2b;
    margin-bottom: 5px;
    h1 {
      flex-grow: 2;
      font-weight: bold;
      padding-left: 12px;
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
        @keyframes downloadAnimation {
          100% {transform: translateY(380px);}
        }
      }
    }
`;
const NavigationMenu = styled.nav`
    height: calc(100vh - 25px);
    width: 300px;
    background: #282828;
    position: absolute;
    top: 25px;
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
      border-bottom: 1px solid #303030;
       &:last-child {
        border: none;
       }
    }

    &.isExtended {
      right: 0;
      border-left: 10px solid #227ccb;
    }
`;
class TopBar extends Component{
    constructor() {
        super();
        this.state = {
            isExtended: false,
            links: configData.links,
            queue: []
        };
    };
    componentDidMount = () => {
      this.updateQueue();
    };
    togglePanel = () => this.setState({ isExtended: !this.state.isExtended });
    updateQueue = () => this.props.queue().then(async res => await res.json()).then(data => this.setState({queue: data}));

    render() {
        return (
            <TopBarContainer>
                <h1>Media Portal</h1>
                <DownloadIcon className={'downloadIcon'}/>
                <MenuIcon className={'menuIcon'} onClick={this.togglePanel}/>
                <NavigationMenu className={this.state.isExtended ? 'isExtended': null} onClick={this.togglePanel}>
                    <ul>
                        {this.state.links
                            .map(link =>
                                <li key={link.id}>
                                    <a rel="noopener noreferrer" href={link.url} target='_blank'>{link.name}</a>
                                </li>
                            )
                        }
                    </ul>
                    <DownloadQueue/>
                    <DownloadQueue/>
                </NavigationMenu>
            </TopBarContainer>
    );
    }
}

export default TopBar;
