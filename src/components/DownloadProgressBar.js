import React from "react";
import styled from "styled-components";

const QueueContainer = styled.div`
  height: 18px;
  width: 100%;
  border-top: 5px solid ${props => props.theme.menuBorder};

  .progressBar {
    height: 100%;
    width: 100%;
    background: ${props => props.theme.transparentBg};

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

const DownloadProgressBar = ({queue}) => {
    return (
        <QueueContainer sizeleft={queue.percentComplete} >
            <div className={'progressBar'}>
                <div className="progress">{queue.percentComplete}</div>
            </div>
        </QueueContainer>
    );
};

export default DownloadProgressBar;