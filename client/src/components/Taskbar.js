import React, { useState } from 'react';
import { Navbar, Button, Form, FormControl, Container, Row, Col } from 'react-bootstrap';

const Taskbar = ({ onStockAdd }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

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
        console.log("received data from server:", data);
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
    setSearchQuery(''); // Clear search field
  };

  const handleAddToDashboard = async () => {
    console.log("inside handleAddToDashboard");
    console.log("searchResults:", searchResults);
    try {
      const response = await fetch('http://localhost:3001/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          open: searchResults.open, 
          symbol: searchResults.symbol,
          company_name: searchResults.company_name,
          close: searchResults.close,
          high: searchResults.high,
          low: searchResults.low, 
        }),
      });
      if (response.ok) {
        onStockAdd(searchResults);
        alert('Stock added successfully');
      } else {
        alert('Failed to add stock');
      }
    } catch (error) {
      console.error('Error adding stock to dashboard:', error);
      alert('Error adding stock to dashboard');
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="border-bottom">
      <Navbar.Collapse id="basic-navbar-nav">
        <Container fluid>
          <Row className="align-items-center">
            <Col xs={3}>
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
            <Col xs={1} className="d-flex justify-content-left">
              <Button variant="outline-primary" type="submit" onClick={handleSearchSubmit}>Search</Button>
            </Col>
            <Col xs={2} className="text-center">
              {searchResults && (
                <div style={{ border: '1px solid black', padding: '10px', position: 'relative' }}>
                  <p>{searchResults.symbol} opened at ${searchResults.open}.</p>
                  <Button variant="outline-secondary" style={{ position: 'absolute', top: 0, right: 0 }} onClick={handleAddToDashboard}>+</Button>
                </div>
              )}
            </Col>
            <Col xs={6} className="d-flex justify-content-end">
              <Button variant="outline-success" className="mr-2">Home</Button>
              <Button variant="outline-success" className="mr-2" onClick={handleRefreshClick}>Refresh</Button>
              <Button variant="outline-danger" className="mr-2" onClick={handleLogout}>Logout</Button>
              <div style={{ border: '1px solid red', padding: '5px' }}>Total Portfolio: $1000</div>
            </Col>
          </Row>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  );
              }

export default Taskbar;
