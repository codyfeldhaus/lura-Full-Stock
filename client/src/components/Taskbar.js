import React, { useState } from 'react';
import { Navbar, Button, Form, FormControl, Container, Row, Col } from 'react-bootstrap';

const Taskbar = ( ) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/search?q=${searchQuery}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer YOUR_JWT_TOKEN`, // Replace with your JWT token
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error('Error fetching search results:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleLogout = () => {
    
    window.location.href = '/login'; 
  };

  const handleRefreshClick = () => {
    setSearchQuery(''); 
  };

  return (
    <Navbar bg="light" expand="lg" className="border-bottom">
      <Navbar.Collapse id="basic-navbar-nav">
        <Container fluid>
          <Row className="align-items-center">
            <Col xs={4}>
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
            <Col xs={4} className="text-center">
              <Button variant="outline-primary" type="submit" onClick={handleSearchSubmit}>Search</Button>
            </Col>
            <Col xs={4} className="d-flex justify-content-end">
              <Button variant="outline-success" className="mr-2">Home</Button>
              <Button variant="outline-success" className="mr-2" onClick={handleRefreshClick}>Refresh</Button>
              <Button variant="outline-danger" className="mr-2" onClick={handleLogout}>Logout</Button>
              <div style={{ border: '1px solid red', padding: '5px' }}>Total Portfolio: $1000</div>
            </Col>
            </Col>
            <Col xs={4} className="text-center">
              <

            </Col>

          </Row>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Taskbar;
