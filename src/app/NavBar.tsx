"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

export default function NavBar() {
    const pathname=usePathname()
  return (
    <Navbar
      bg="primary"
      variant="dark"
      sticky="top"
      expand="sm"
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand as={Link} href="/">
          Nextjs 14 Image Gallery
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link as={Link} href="/static" active={pathname==="/static"}>Static</Nav.Link>
            <Nav.Link as={Link} href="/dynamic" active={pathname==="/dynamic"}>Dynamic</Nav.Link>
            <Nav.Link as={Link} href="/isr" active={pathname==="/isr"}>ISR</Nav.Link>
            <NavDropdown title="Topics" id="topics-dropdown">
              <NavDropdown.Item as={Link} href="/topics/temples">Temples</NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/topics/fruits">Fruits</NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/topics/bikes">Bikes</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} href="/search" active={pathname==="/search"}>Search</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
