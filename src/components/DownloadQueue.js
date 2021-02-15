import React from "react";
import styled from "styled-components";

const QueueContainer = styled.div`
    margin-bottom: 15px; 
    border-top: 5px solid ${props => props.theme.menuBorder};
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
        width: ${props => props.sizeleft};
        font-size: 15px;
        font-weight: bold;
        padding-left: 5px;
        box-sizing: border-box;
        background: #70a938;
        display: flex;
        align-items: center;
      }
    }
`;

const DownloadQueue = ({queue}) => {
    return (
        <QueueContainer sizeleft={queue.percentComplete} >
            <img src={queue.banner} alt=""/>
            <p>{queue.title}</p>
            <p>{queue.episode}</p>
            <div className={'progressBar'}>
                <div className="progress">{queue.percentComplete}</div>
            </div>
        </QueueContainer>
    );
}

export default DownloadQueue;