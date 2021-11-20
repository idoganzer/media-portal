import React from "react";
import styled from 'styled-components';
import Catalog from "../Catalog";

const MovieContainer = styled.div`
  margin: 10px;
  
  .catalog {
    grid-template-columns: repeat(auto-fit , minmax(150px, 1fr));
    gap: 10px;
  }
`;
const Movies = () => <MovieContainer> <Catalog/> </MovieContainer>;

export default Movies;
