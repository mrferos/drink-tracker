import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Link from "next/link";

export default function App({children}) {
    return (
        <>
            <Navbar bg="primary" variant="dark" expand="md" className="fixed-top">
                <Container>

                    {/* Collapsed Navigation Toggler */}
                    <Navbar.Toggle aria-controls="mobile-navbar-nav" />

                    {/* Navigation Links */}
                    <Navbar.Collapse id="mobile-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">
                                Home
                            </Nav.Link>
                            <Nav.Link href="/sessions">
                                Sessions
                            </Nav.Link>
                            <Nav.Link href="/beverages">
                                Beverages
                            </Nav.Link>
                            <Nav.Link href="/bars">
                                Bars
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <main style={{ paddingTop: '56px', paddingBottom: '20px', paddingLeft: '5px', paddingRight: '5px' }}>
                {children}
            </main>
        </>
    );
};