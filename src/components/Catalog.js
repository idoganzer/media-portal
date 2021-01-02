import React, {Component} from "react";
import styled from "styled-components";

const CatalogContainer = styled.div`
  .topBar {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #414141;
    padding-bottom: 5px;
    margin-bottom: 2px;
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