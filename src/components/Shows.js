import React, {Component} from 'react';
import styled from 'styled-components';
import Card from "./Card";
import leftArrow from '../images/left.svg'
import rightArrow from '../images/right.svg'

const ShowContainer = styled.div`
  width:100%;
  h1 {
    font-size: 1.5em;
    padding: 5px 10px;
    margin-bottom: 10px;
    font-weight: bold;
    border-bottom: 1px solid ${props => props.theme.headerBorder};
  }
  .scrollBtn {
    width: 60px;
    height: 15px;
    cursor: pointer;
    float: right;
    display: flex;
    img {
      height: 100%;
      margin: 10px;
      &:hover {
        transform: scale3d(1.1,1.1,1.1);
      }
    }
    @media(max-width: 500px) {
      display: none;
    }
   }
  &.hidden {
     display: none;
  }
`;

const List = styled.ul`
  width: 99vw;
  display: grid;
  margin: 0 7px;
  box-sizing: border-box;
  grid-template-rows: 1fr;
  grid-auto-flow: column;
  grid-auto-columns: auto;
  justify-content: flex-start;
  grid-column-gap: 7px;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

class Shows extends Component{
    constructor() {
        super();
        this.showListParent = React.createRef();
    };
    /**
     *  Lifecycle hook
     *  When the component is loaded set the scroll position
     */
    componentDidMount = () => this.showListParent.current.scrollLeft = 0;

    /**
     * Animates side scrolling
     * @param direction
     */
    animateScroll = direction => {
        const scrollLimit = 820,  // Max Distance of scroll
              scrollFactor = 30;  // Distance of scroll tick

        let counter = 0;

        const scrollTimer = setInterval(() => {
            this.showListParent.current.scrollLeft = this.showListParent.current.scrollLeft + (direction === 'left' ? -scrollFactor : +scrollFactor);
            counter = counter + scrollFactor;
            if (counter >= scrollLimit || this.showListParent.current.scrollLeft === 0) clearInterval(scrollTimer)
        }, 10)
    };

    /**
     * Gets a click event from the scroll buttons and returns the scroll direction
     * @param event
     */
    handleClick = (event) => event.target.className === 'leftBtn' ? this.animateScroll('left') : this.animateScroll('right');

    render() {
        return (
            <ShowContainer className={this.props.shows.history.length === 0 ? 'hidden' : ' '}>
                <h1>Downloaded</h1>
                <List ref={this.showListParent}>
                    {this.props.shows.history
                        .map(show =>
                            <Card key={show.id || show[0].id} show={show} buildEpisodeNum={this.props.buildEpisodeNum}/>)}
                </List>
                <div className={'scrollBtn'}>
                    <img className='leftBtn' src={leftArrow} alt="" onClick={this.handleClick}/>
                    <img className='rightBtn' src={rightArrow} alt="" onClick={this.handleClick}/>
                </div>
            </ShowContainer>
        );
    };
}


export default Shows;
