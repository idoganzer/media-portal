import React, {Component} from "react";
import styled from "styled-components";

const QueueContainer = styled.div`
    margin-bottom: 15px;
    //padding: 0 10px ;   
    border-top: 5px solid #303030;
    p {
      padding: 4px;
    }
    img {
      width: 100%;
    }
    p {
      font-size: 12px;
      font-weight: bold;
    }
    .progressBar {
      height: 17px;
      width: 100%;
      margin-top: 3px;
      padding: 0 10px 0 5px;
      box-sizing: border-box;
      .progress {
        height: inherit;
        font-size: 15px;
        font-weight: bold;
        width: 100%;
        padding-left: 5px;
        box-sizing: border-box;
        background: #70a938;
        display: flex;
        align-items: center;
      }
    }
`;

class DownloadQueue extends Component{
    render() {
        return (
            <QueueContainer>
                <img src="http://thetvdb.com/banners/graphical/121361-g19.jpg" alt=""/>
                <p>Re:ZERO -Starting Life in Another World</p>
                <div className={'progressBar'}>
                    <div className="progress">15%</div>
                </div>
            </QueueContainer>
        );
    }
}

export default DownloadQueue;