import React, {Component} from 'react';
import styled from 'styled-components';
import Card from "./Card";
import leftArrow from '../images/left.svg'
import rightArrow from '../images/right.svg'

const ShowContainer = styled.div`
        height: 100%;
        width:100%;
`;

const Heading = styled.h1`
    font-size: 1.5em;
    padding: 5px 10px;
    margin-bottom: 10px;
    font-weight: bold;
    border-bottom: 1px solid #414141;
`;
const ScrollBtn = styled.div`
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
`;
const List = styled.ul`
    width: 99vw;
    display: grid;
    margin: 0 7px;
    box-sizing: border-box;
    grid-template-rows: 1fr;
    grid-auto-flow: column;
    grid-auto-columns: auto;
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
    constructor(props) {
        super(props);
        this.showListParent = React.createRef();
    }
    animateScroll = direction => {
        const scrollLimit = 410,
              scrollFactor = 15;

        let counter = 0;

        const scrollTimer = setInterval(() => {
            this.showListParent.current.scrollLeft = this.showListParent.current.scrollLeft + (direction === 'left' ? -scrollFactor : +scrollFactor);
            counter = counter + scrollFactor;
            if (counter >= scrollLimit || this.showListParent.current.scrollLeft === 0) clearInterval(scrollTimer)
        }, 10)
    }
    handleClick = (event) => event.target.className === 'leftBtn' ? this.animateScroll('left') : this.animateScroll('right');

    render() {
        return (
            <ShowContainer>
                <Heading>Downloaded</Heading>
                <List ref={this.showListParent}>
                    {this.props.shows.history.map(show => <Card key={show.id} show={show}/>)}
                </List>
                <ScrollBtn>
                    <img className='leftBtn' src={leftArrow} alt="" onClick={this.handleClick}/>
                    <img className='rightBtn' src={rightArrow} alt="" onClick={this.handleClick}/>
                </ScrollBtn>
            </ShowContainer>
        );
    }
}


export default Shows;
