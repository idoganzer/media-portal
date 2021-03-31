import React, {useState} from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
  width: 272px;
  height: 400px;
  background: ${props => props.theme.menuColor};
  perspective: 500px;
  cursor: pointer;
  .cardInner {
    transition: transform 0.4s cubic-bezier(1,0.5,0,1);
    transform-style: preserve-3d;
    position: relative;
  }
  .cardFront {
    z-index: 2;
    transform: rotateY(0deg);
    div {
      width: 1.5rem;
      height: 1.5rem;
      line-height: 1.4rem;
      text-align: center;
      position: absolute;
      top: 5px;
      right: 10px;
      z-index: 3;
      background: #f61e1e;
      padding: 2px;
      border-radius: 50%;
      font-weight: bold;
      font-size: 0.9em;
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
    show.otherEpisodes = show.otherEpisodes.filter(
        (other, i, array) => show.episodeId !== other.episodeId
            && array.findIndex(target => (target.episodeId === other.episodeId)) === i
    );
    if (show.otherEpisodes.length > 0) {
        const shortList = show.otherEpisodes.slice(0,7),
              leftovers = show.otherEpisodes.slice(7);

        return (
            <React.Fragment>
                <div className='cardFront'>
                    <div>+{show.otherEpisodes.length}</div>
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
                        show.otherEpisodes.length >= shortList.length
                            ? <div className={'leftovers'}> {leftovers.length} More episodes </div>
                            : null
                    }
                    <span>{show.showFormatNumber}</span>
                </ShowInfoContainer>
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            <div className='cardFront'>
                <img src={show.img} alt=""/>
            </div>
            <ShowInfoContainer className={'cardBack'}>
                <h1><a rel="noopener noreferrer" href={show.URL} target='_blank'>{show.name}</a></h1>
                <div>{show.title}</div>
                <span>{show.showFormatNumber}</span>
            </ShowInfoContainer>
        </React.Fragment>
    )
};

const Card = ({show}) => {
    const [isExtended, setExtended]   = useState(false);

    const togglePanel = () => setExtended(!isExtended);
    return (
        <ListItem className={isExtended ? 'isExtended': null} onClick={togglePanel}>
            <div className={`cardInner ${isExtended ? 'isExtended': null}`}>
                {buildCard(show)}
            </div>
        </ListItem>
    )
}

export default Card;
