
import React, { useState } from 'react';
import { Navbar, Button, Form, FormControl, Container, Row, Col } from 'react-bootstrap';

const Taskbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Handle search submission
  };

  return (
    <Navbar bg="light" expand="lg" className="border-bottom">
      <Container fluid>
        <Row className="align-items-center">
          <Col xs={10} md={3}>
            {/* Username */}
            <span>Username</span>
          </Col>
          <Col xs={15} md={1}>
          </Col>
          <Col xs={13} md={1}>
            <Button variant="outline-danger" size="sm" className="mt-2">Logout</Button>
          </Col>
          <Col xs={12} md={6}>
            
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={2}>
            {/* Home */}
            <Button variant="outline-success" className="mr-2">Home</Button>
          </Col>
          <Col xs={12} md={2}>
            {/* Refresh */}
            <Button variant="outline-success" className="mr-2">Refresh</Button>
          </Col>
          <Col xs={12} md={4}>
            {/* Portfolio Total */}
            <div style={{ border: '1px solid red', padding: '5px' }}>Total Portfolio: $1000</div>
          </Col>
          <Col xs={12} md={2}>
            {/* Ticker Search Button */}
            <Button variant="outline-primary" type="submit" onClick={handleSearchSubmit}>Search</Button>
          </Col>
          <Col xs={12} md={2}>
            {/* Empty Column for spacing */}
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={2}>
            {/* Empty Column for spacing */}
          </Col>
          <Col xs={12} md={8}>
            {/* Search Input Field */}
            <Form onSubmit={handleSearchSubmit}>
              <FormControl 
                type="text" 
                placeholder="Search" 
                value={searchQuery} 
                onChange={handleSearchInputChange} 
                className="w-100"
              />
            </Form>
          </Col>
          <Col xs={12} md={2}>
            {/* Empty Column for spacing */}
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Taskbar;
