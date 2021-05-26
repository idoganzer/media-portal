import { withRouter } from "react-router-dom";
import {useSelector} from "react-redux";
import styled from "styled-components";

const CatalogContainer = styled.div`
  .topBar {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid ${props => props.theme.menuBorder};
    padding-bottom: 5px;
    margin-bottom: 2px;

    h1 {
      font-size: 1.5em;
    }
  }

  .catalog {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 7px;
    justify-content: space-between;
    margin-top: 6px;

    img {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    span {
      display: block;
      width: 100%;
      height: 3px;
      margin-top: -2px;
      background: ${props => props.theme.missingFile};
      
      &.downloaded {
        background: ${props => props.theme.hasFile};
      }
    }
  }
`;

const Catalog = ({ location }) => {
    const showCatalog = useSelector(state => state.showCatalog),
          movieCatalog = useSelector(state => state.movieCatalog);

    const byLocationDataSelector = () => location.pathname.includes('/movies') ? movieCatalog : showCatalog;

    return (
        <CatalogContainer>
            <div className="topBar">
                <h1>{!location.pathname.includes('/movies') ? 'Catalog' : 'Movies'}</h1>
            </div>
            <div className="catalog">
                {byLocationDataSelector().data.map(show =>
                    <div key={show.id}>
                        <a rel="noopener noreferrer" href={show.URL} target='_blank'>
                            <img src={show.images} alt={show.title}/>
                        </a>
                        {location.pathname.includes('/movies')
                            ? <span className={show.downloaded ? 'downloaded' : null}></span>
                            : null
                        }
                    </div>).reverse()
                }
            </div>
        </CatalogContainer>
    )
};

export default withRouter(Catalog);