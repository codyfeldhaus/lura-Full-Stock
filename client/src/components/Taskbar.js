import React from 'react';
import { Navbar, Button, Form, FormControl } from 'react-bootstrap';

const Taskbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="border-bottom">
      <Navbar.Brand href="#home">My App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline className="mr-auto">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form>
        <Button variant="outline-success" className="mr-2">Home</Button>
        <Button variant="outline-success" className="mr-2">Refresh</Button>
        <Button variant="outline-danger" className="mr-2">Logout</Button>
        <div>Total Portfolio: $1000</div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Taskbar;
