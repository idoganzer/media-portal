import {useState} from 'react';
import styled from 'styled-components';

import DownloadProgressBar from "./DownloadProgressBar";
import {ReactComponent as DownloadIcon} from "../images/download.svg";

const ListItem = styled.li`
  width: 272px;
  height: 400px;
  background: ${props => props.theme.menuColor};
  perspective: 500px;
  cursor: pointer;

  .downloadImg {
    filter: grayscale(0.9);
  }

  .cardInner {
    transition: transform 0.4s cubic-bezier(1, 0.5, 0, 1);
    transform-style: preserve-3d;
    position: relative;
  }

  .cardFront {
    z-index: 2;
    transform: rotateY(0deg);

    .otherEpisodesCounter {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 15px;
      position: absolute;
      bottom: 5px;
      right: 10px;
      z-index: 3;
      background: ${props => props.theme.notificationColor};
      h2 {
        height: 100%;
        font-size: 0.8em;
        font-weight: bold;
      }
    }
  }

  .cardBack {
    transform: rotateY(180deg);
  }

  .cardFront, .cardBack, img {
    width: 272px;
    height: 400px;
    position: absolute;
    top: 0;
    left: 0;
    backface-visibility: hidden;
  }

  .cardInner.isExtended {
    transform: rotateY(180deg);
  }

  .downloadContainer {
    height: 100%;
    position: relative;
    z-index: 3;
    .downloadHeader {
      background: ${props => props.theme.transparentBg};
      font-size: 0.9em;
      font-weight: bold;
      padding: 5px 5px 10px 5px;
      margin-bottom: 10px;
      border-bottom: 1px solid ${props => props.theme.headerBorder};
    }
    svg {
      position: absolute;
      height: 13px;
      right: 5px;
      top: 4px;

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
        100% {
          transform: translateY(380px);
        }
      }
    }

    div:last-child {
      position: absolute;
      bottom: 0;
    }
  }
`;
const ShowInfoContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  
  .leftovers {
    margin-top: 5px;
    font-size: 0.8em;
  }
  
  h1, div, span {
    padding: 0 10px;
    box-sizing: border-box;
    line-height: 1.1em;
  }
  h1 {
    align-self: stretch;
    font-size: 1.1em;
    font-weight: bold;
    margin: 10px 0 5px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid ${props => props.theme.headerBorder};
  }
  div {
    padding-bottom: 5px;
    &:last-of-type {
      flex: 1 1 auto;
    }
  }
  span {
    align-self: flex-end;
    margin-bottom: 10px;
    font-weight: bold;
  }
`;

const buildCard = show => {
    if (show.hasOwnProperty('otherEpisodes') && show.otherEpisodes.length > 0) {
        const shortList = show.otherEpisodes.slice(0,7),
              leftovers = show.otherEpisodes.slice(7);
        return (
            <>
                <div className='cardFront'>
                    <div className={'otherEpisodesCounter'}>
                        <h2>+{show.otherEpisodes.length}</h2>
                    </div>
                    <img src={show.img} alt=""/>
                </div>
                <ShowInfoContainer className={'cardBack'}>
                    <h1><a rel="noopener noreferrer" href={show.URL} target='_blank'>{show.name}</a></h1>
                    <div>{show.title}</div>
                    {
                        shortList
                            .map(other =>
                                <div key={other.episodeId}>
                                    {other.title} - {other.showFormatNumber}
                                </div>
                            )
                    }
                    {
                        show.otherEpisodes.length > shortList.length
                            ? <div className={'leftovers'}> {leftovers.length} More episodes </div>
                            : null
                    }
                    <span>{show.showFormatNumber}</span>
                </ShowInfoContainer>
            </>
        )
    }
    return (
        <>
            <div className='cardFront'>
                <img
                    src={show.img} alt=""
                    className={
                        show.hasOwnProperty('percentComplete')
                            ? 'downloadImg'
                            : null}
                />
                {
                    show.hasOwnProperty('percentComplete')
                        ?
                            <div className="downloadContainer">
                                <h1 className='downloadHeader'>{show.name}</h1>
                                <DownloadIcon/>
                                <DownloadProgressBar queue={show}/>
                            </div>
                        : null
                }
            </div>
            <ShowInfoContainer className={'cardBack'}>
                <h1><a rel="noopener noreferrer" href={show.URL} target='_blank'>{show.name}</a></h1>
                <div>{show.title}</div>
                <span>{show.showFormatNumber}</span>
            </ShowInfoContainer>
        </>
    )
};

const Card = ({show}) => {
    const [isExtended, setExtended] = useState(false);
    const togglePanel = () => setExtended(!isExtended);
    return (
        <ListItem className={isExtended ? 'isExtended': null} onClick={togglePanel}>
            <div className={`cardInner ${isExtended ? 'isExtended': null}`}>
                {buildCard(show)}
            </div>
        </ListItem>
    )
};

export default Card;
