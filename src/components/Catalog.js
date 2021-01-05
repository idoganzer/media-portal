import React, {Component} from "react";
import styled from "styled-components";

const CatalogContainer = styled.div`
  .topBar {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #414141;
    padding-bottom: 5px;
    margin-bottom: 2px;
    
    select {
      display: block;
      box-sizing: border-box;
      appearance: none;
      border: none;
      border-radius: 1px;
      background-color: #fff;
      background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
      background-repeat: no-repeat, repeat;
      background-position: right .7em top 50%, 0 0;
      background-size: .65em auto, 100%;
    }
    h1 {
      font-size: 1.5em;
    }
  }

  .catalog {
    display: grid;
    grid-template-columns: repeat(auto-fit , minmax(100px, 1fr));
    justify-content: space-between;

    img {
      width: 100%;
      padding: 5px;
      box-sizing: border-box;
    }
  }
`;

class Catalog extends Component{

    render() {
        return (
            <CatalogContainer>
                <div className="topBar">
                    <h1>Catalog</h1>
                    <select name="sort" id="sort">
                        <option value="latest">Latest</option>
                        <option value="alphabet">Alphabetical</option>
                        <option value="date">Date added</option>
                    </select>
                </div>
                <div className="catalog">
                    {
                        this.props.catalog
                            .map(show =>
                                <a key={show.id} rel="noopener noreferrer" href={show.URL} target='_blank'>
                                    <img src={show.images}/>
                                </a>)
                    }
                </div>
            </CatalogContainer>
        );
    };
}

export default Catalog;