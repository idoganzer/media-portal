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

class DownloadQueue extends Component{
    componentWillUnmount() {
        this.props.doUpdate();
    };

    render() {
        return (
            <QueueContainer sizeleft={this.props.queue.percentComplete} >
                <img src={this.props.queue.banner} alt=""/>
                <p>{this.props.queue.title}</p>
                <p>{this.props.queue.episode}</p>
                <div className={'progressBar'}>
                    <div className="progress">{this.props.queue.percentComplete}</div>
                </div>
            </QueueContainer>
        );
    };
}

export default DownloadQueue;