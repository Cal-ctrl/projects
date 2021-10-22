import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'


function Header() {
    return( 
    <Navbar bg="light" expand="lg">
    <Container>
        <Navbar.Brand href="/">Callum McNeil</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="contact">Contact Me</NavDropdown.Item>
            <NavDropdown.Item href="projects">Projects</NavDropdown.Item>
            <NavDropdown.Item href="allergen">Allergy Info</NavDropdown.Item>
            <NavDropdown.Item href="blog">Blog</NavDropdown.Item>
            </NavDropdown>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
    )
}

export default Header;
