import React, {Component} from 'react';
import styled from 'styled-components';


const ListItem = styled.li`
  width: 272px;
  height: 400px;
  background: #282828;
  cursor: pointer;
  transition: width 80ms ease-in-out;
  display: flex;
  &.isExtended {
    width: 500px;
  }
`;
const Image = styled.img`
  height: inherit;
`;
const ShowInfoContainer = styled.div`
  height: inherit;
  width: inherit;
  display: flex;
  transition: transform ${props => props.isExtended ? '20ms' : '1ms'} linear;
  transition-delay: ${props => props.isExtended ? '70ms' : '0'};
  transform: scaleX(0);
  transform-origin: 0 100%;
  flex-direction: column;
  &.isExtended {
    transform: scalex(1);
  }
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
        }
    }
    togglePanel = () => {
        const currentState = this.state.isExtended;
        this.setState({ isExtended: !currentState });
    }
    buildEpisodeNum = (season, episode) => {
        return 'S' + (season.toString().length > 1 ? season : '0' + season) +
            'E' + (episode.toString().length > 1 ? episode : '0' + episode)
    }
    render() {
        return (
            <ListItem
                className={this.state.isExtended ? 'isExtended': null} onClick={this.togglePanel}>
                <Image src={this.props.show.img} alt=""/>
                <ShowInfoContainer isExtended={this.state.isExtended} className={this.state.isExtended ? 'isExtended': null}>
                    <h1>{this.props.show.name}</h1>
                    <h2>{this.props.show.title}</h2>
                    <span>
                        {this.buildEpisodeNum(this.props.show.seasonNumber, this.props.show.episodeNumber)}
                    </span>
                </ShowInfoContainer>
            </ListItem>
        );
    }
}

export default Card;
