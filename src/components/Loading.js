import React from "react";
import {withRouter} from "react-router-dom"
import styled from "styled-components";
import {useSelector} from "react-redux";

import {ReactComponent as LoadingIcon} from "../images/loadingIcon.svg";

const LoadingScreen = styled.div`
  height: calc(100% - 35px);
  width: 100%;
  background: ${props => props.theme.bgColor};
  display: ${props => props.isIdle ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 35px;
  left: 0;
  z-index: 1;
`;

const Loading = ({ location }) => {
    const showCatalog = useSelector(state => state.showCatalog),
          movieCatalog = useSelector(state => state.movieCatalog);

    const byLocationDataSelector = () => location.pathname.includes('/movies') ? movieCatalog : showCatalog;

    const isIdle = byLocationDataSelector().reqState === 'idle';

    return (
        <LoadingScreen isIdle={isIdle}>
            {isIdle ? <LoadingIcon/> :null}
        </LoadingScreen>
    );
};

export default withRouter(Loading);
