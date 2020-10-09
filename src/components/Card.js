import React, {Component} from 'react';
import styled from 'styled-components';


const ListItem = styled.li`
  width: 272px;
  height: 400px;
  background: #282828;
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
  
  h1, h2, span {
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
    border-bottom: 1px solid #414141;
  }
  h2 {
    flex: 2 1 auto;
    align-self: stretch;
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

    render() {
        return (
            <ListItem className={this.state.isExtended ? 'isExtended': null} onClick={this.togglePanel}>
                <div className={`cardInner ${this.state.isExtended ? 'isExtended': null}`}>
                    <div className='cardFront'>
                        <img src={this.props.show.img} alt=""/>
                    </div>
                    <ShowInfoContainer className={'cardBack'}>
                        <h1>{this.props.show.name}</h1>
                        <h2>{this.props.show.title}</h2>
                        <span>
                            {this.props.buildEpisodeNum(this.props.show.seasonNumber, this.props.show.episodeNumber)}
                        </span>
                    </ShowInfoContainer>
                </div>
            </ListItem>
        );
    };
}

export default Card;
