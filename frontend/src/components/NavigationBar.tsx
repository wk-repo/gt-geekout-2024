import { Navbar, Nav, NavItem } from "@govtechsg/sgds-react/Nav";
import logo from "../icons/logo-sgds.svg";

const NavigationBar = () => {
  return (
    <Navbar>
      <Nav>
        <Navbar.Brand as="img" src={logo} alt="main logo" />
        <NavItem>
          <Nav.Link className="nav-item" href="/">
            Home
          </Nav.Link>
        </NavItem>
        <NavItem className="nav-item">
          <Nav.Link eventKey="link1" href="/todo">
            To do list
          </Nav.Link>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
