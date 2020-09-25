import React, {Component} from "react";
import styled from "styled-components";
import {ReactComponent as MenuIcon} from "../images/menu.svg"
import {ReactComponent as DownloadIcon} from "../images/download.svg"

const TopBarContainer = styled.div`
        height: 25px;
        width:100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #227ccb;
        margin-bottom: 5px;
        //border-bottom: 1px solid #174e88;
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
            @keyframes downloadAnimation {
              100% {transform: translateY(380px);}
            }
          }
        }
`;

class TopBar extends Component{
    constructor() {
        super();
        this.state = {
            isExtended: false
        };
    }

    render() {
        return (
            <TopBarContainer>
                <h1>Media Portal</h1>
                <DownloadIcon className={'downloadIcon'}/>
                <MenuIcon className={'menuIcon'}/>
            </TopBarContainer>
    );
    }
}

export default TopBar;
