import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useSelector} from "react-redux";
import useInterval from "./hooks/useInterval";
import usePrevious from "./hooks/usePrevious";

import Card from "./Card";
import leftArrow from '../images/left.svg'
import {ReactComponent as LeftArrow} from '../images/left.svg';
import {ReactComponent as RightArrow} from '../images/right.svg';
import rightArrow from '../images/right.svg'
import WantedList from "./WantedList";

import {updateAll, updateShowQueue} from "../redux/features/update";

const ShowContainer = styled.div`
  width:100%;
  .listHeader {
    display: flex;
    font-size: 1.5em;
    padding: 5px 10px;
    margin-bottom: 10px;
    font-weight: bold;
    border-bottom: 1px solid ${props => props.theme.headerBorder};
    h1 {
      margin-right: 10px;
    }
  }
  .scrollBtn {
    width: 60px;
    height: 15px;
    cursor: pointer;
    float: right;
    display: flex;
    .icon {
      height: 100%;
      margin: 10px;
      fill: ${props => props.theme.textColor};
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

const Downloaded = () => {
    const shows = useSelector(state => state.showHistory),
          downloadQueue = useSelector(state => state.showQueue),
          prevDownloadQueue = usePrevious(downloadQueue.data.length),
          showListParent = React.createRef();

    const handleClick = event => event.target.className === 'leftBtn' ? animateScroll('left') : animateScroll('right');

    const animateScroll = direction => {
        const scrollLimit = 820,  // Max Distance of scroll
            scrollFactor = 30;  // Distance of scroll tick

        let counter = 0;

        const scrollTimer = setInterval(() => {
            showListParent.current.scrollLeft = showListParent.current.scrollLeft + (direction === 'left' ? -scrollFactor : +scrollFactor);
            counter = counter + scrollFactor;
            if (counter >= scrollLimit || showListParent.current.scrollLeft === 0) clearInterval(scrollTimer)
        }, 10)
    };

    const resetScroll = () => {showListParent.current.scrollLeft = 0};
    const setDelay = () => downloadQueue.data.length ? 10000 : 30000;

    useEffect(resetScroll, [showListParent]);

    useInterval(() => {
        updateShowQueue()
        if (downloadQueue.data.length < prevDownloadQueue) updateAll()
    }, setDelay())

    return (
        <ShowContainer className={shows.data.length === 0 ? 'hidden' : ' '}>
            <div className='listHeader'>
                <h1>Downloaded</h1>
                <WantedList/>
            </div>
            <List ref={showListParent}>
                {downloadQueue.data.map(show => <Card key={show.id || show[0].id} show={show}/>)}
                {shows.data.map(show => <Card key={show.id || show[0].id} show={show}/>)}
            </List>
            <div className={'scrollBtn'}>
                <LeftArrow className='leftBtn icon' src={leftArrow} alt="" onClick={handleClick}/>
                <RightArrow className='rightBtn icon' src={rightArrow} alt="" onClick={handleClick}/>
            </div>
        </ShowContainer>
    )
};

export default Downloaded;
