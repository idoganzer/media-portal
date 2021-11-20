import React from "react";
import styled from "styled-components";

import Downloaded from "../Downloaded";
import Calendar from "../Calendar";
import Catalog from "../Catalog";

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 7px;
  margin: 30px 7px 15px 7px;
`;

const Shows = () => {
    return (
        <>
            <Downloaded/>
            <ContentContainer>
                <Calendar/>
                <Catalog/>
            </ContentContainer>
        </>
    )
};

export default Shows;
