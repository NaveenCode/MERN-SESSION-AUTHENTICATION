import axios from 'axios';
import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {

    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:5001/users/logout');
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href='/login' >Login</Nav.Link>
                        <Nav.Link href='/login' onClick={handleLogout} >Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation
