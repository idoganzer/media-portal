import React, {Component} from "react";
import styled from "styled-components";
import DownloadQueue from "./DownloadQueue";
import configData from "../config.json"
import {ReactComponent as MenuIcon} from "../images/menu.svg";
import {ReactComponent as DownloadIcon} from "../images/download.svg";
import placeholderImg from "../images/banner-placeholder.jpg";

const TopBarContainer = styled.div`
    height: 35px;
    width:100%;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    background: ${props => props.theme.fgColor};
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
class TopBar extends Component{
    constructor() {
        super();
        this.state = {
            isExtended: false,
            isDownloading: false,
            links: configData.links,
            queue: []
        };
    };
    componentDidMount = () => {
        this.updateQueue();
        this.updateInterval();
    };
    togglePanel = () => this.setState({ isExtended: !this.state.isExtended });
    updateQueue = () => this.props.queue().then(async res => this.parseResults(await res.json())).then(data => this.setState({queue: data}));
    parseResults = res => {
        if (!res.length) {
            this.setState({isDownloading: false})
            return res
        }
        this.setState({isDownloading: true})
        return res.map(show => {
            return {
                id: show.id,
                title: show.series.title,
                episode: this.props.episodeNum(show.episode.seasonNumber, show.episode.episodeNumber),
                percentComplete: this.calcPercent(show.size, show.sizeleft),
                banner: this.filterBanner(show.series.images)
            }
        })
    };
    filterBanner = imageObj => {
        const banners = imageObj.filter(img => img.coverType === 'banner')[0]?.url;
        return banners === undefined ? placeholderImg : banners
    };
    calcPercent = (total, amount) => Math.round(((total - amount) / total) * 100) + "%";
    updateInterval = () => {
        let interval = setInterval(() => {this.updateQueue()}, 10000)
    };
    render() {
        return (
            <TopBarContainer>
                <h1>Media Portal</h1>
                <DownloadIcon className={this.state.isDownloading ? 'downloadIcon' : 'downloadIcon hidden'}/>
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
                    {this.state.queue.map(show => <DownloadQueue doUpdate={this.props.doUpdate} key={show.id} queue={show}/>)}
                </NavigationMenu>
            </TopBarContainer>
        );
    };
}

export default TopBar;
