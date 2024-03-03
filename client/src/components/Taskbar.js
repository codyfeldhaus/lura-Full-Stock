import React, { useState } from 'react';
import { Navbar, Button, Form, FormControl, Container, Row, Col } from 'react-bootstrap';

const Taskbar = ({ onStockAdd, portfolioTotal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState();
  // const [portfolioTotal, setPortfolioTotal] = useState(0);

  // useEffect(() => {
  //   const total = searchResults.reduce((accumulator, currentValue) => {
  //     return accumulator + currentValue.open;
  //   }, 0);
  //   setPortfolioTotal(total);
  // }, [searchResults])

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
          open: parseFloat(searchResults.open).toFixed(2), 
          symbol: searchResults.symbol,
          close: searchResults.close,
          high: searchResults.high,
          low: searchResults.low, 
          company_name: searchResults.company_name
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
            <Col lg="3">
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
            <Col lg="1" className="d-flex">
              <Button variant="outline-primary" type="submit" onClick={handleSearchSubmit}>Search</Button>
            </Col>
            <Col lg="4" className="text-center">
              {searchResults && (
                // <div style={{ border: '1px solid black', padding: '10px', position: 'relative' }}>
                //   <p>{searchResults.symbol} opened at ${(parseFloat(searchResults.open).toFixed(2))}.</p>
                //   <Button variant="outline-secondary" style={{ position: 'absolute', top: 0, right: 0 }} onClick={handleAddToDashboard}>+</Button>
                // </div>
                <div className="d-flex justify-content-around p-2 border border-dark align-items-center">
                  <h5 className="mb-0">{searchResults.symbol} opened at ${parseFloat(searchResults.open).toFixed(2)}.</h5>
                  <Button variant="outline-secondary" onClick={handleAddToDashboard}>+</Button>
                </div>
              )}
            </Col>
            <Col lg="4" className="d-flex justify-content-between">
              <Button variant="outline-success" className="mx-2">Home</Button>
              <Button variant="outline-success" className="mx-2" onClick={handleRefreshClick}>Refresh</Button>
              <Button variant="outline-danger" className="mx-2" onClick={handleLogout}>Logout</Button>
              <div style={{ border: '1px solid red', padding: '5px' }}>Total Portfolio: ${portfolioTotal || "999"}</div>
            </Col>
          </Row>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  );
              }

export default Taskbar;
