import React from 'react';
import {Container, Spinner} from "react-bootstrap";

const PageSpinner = () => {
  return (
    <Container className="text-center">
      <Spinner animation="grow"/>
    </Container>
  );
};

export default PageSpinner;