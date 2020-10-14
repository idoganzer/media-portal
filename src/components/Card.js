import React, {Component} from 'react';
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

class Card extends Component{
    constructor() {
        super();
        this.state = {
            isExtended: false
        };
    };
    togglePanel = () => this.setState({ isExtended: !this.state.isExtended });
    buildCard = show => {
        show.otherEpisodes = show.otherEpisodes.filter(
            (other, i, array) => show.episodeId !== other.episodeId
                && array.findIndex(target => (target.episodeId === other.episodeId)) === i
        );
        if (show.otherEpisodes.length > 0) {
            return (
                <React.Fragment>
                    <div className='cardFront'>
                        <div>+{show.otherEpisodes.length}</div>
                        <img src={show.img} alt=""/>
                    </div>
                    <ShowInfoContainer className={'cardBack'}>
                        <h1>{show.name}</h1>
                        <div>{show.title}</div>
                        {show.otherEpisodes
                            .map(other =>
                                <div key={other.episodeId}>
                                    {other.title} - {this.props.buildEpisodeNum(other.seasonNumber, other.episodeNumber)}
                                </div>
                            )}
                        <span>{this.props.buildEpisodeNum(show.seasonNumber, show.episodeNumber)}</span>
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
                    <h1>{show.name}</h1>
                    <div>{show.title}</div>
                    <span>{this.props.buildEpisodeNum(show.seasonNumber, show.episodeNumber)}</span>
                </ShowInfoContainer>
            </React.Fragment>
        )
    };

    render() {
        return (
            <ListItem className={this.state.isExtended ? 'isExtended': null} onClick={this.togglePanel}>
                <div className={`cardInner ${this.state.isExtended ? 'isExtended': null}`}>
                    {this.buildCard(this.props.show)}
                </div>
            </ListItem>
        );
    };
}

export default Card;
