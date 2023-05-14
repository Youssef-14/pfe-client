import './style/Header.css'
import logo from '../../src/img/logo.png';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { InputGroup, FormControl } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { getUserRole } from "../_services/account.services";


function Header() {
    if (getUserRole() == 'Admin') {
        return (
            <Navbar bg="black" expand="lg">
                <Container fluid>
                    <Link to='/Home'><img src={logo} className="logo" alt="not found" /></Link>

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link >
                                <Link to="/Home" id='h'>Home</Link></Nav.Link>
                            <Nav.Link >
                                <Link to='/DC_VISUALISATION' id='h' >DCvisualization</Link></Nav.Link>
                            <Nav.Link >
                                <Link to='/Reporting' id='h'>Reporting</Link>
                            </Nav.Link>
                            <Nav.Link >
                                <Link to='/AccountsManagement' id='h' >Users management</Link>
                            </Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <InputGroup className="mb-3">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="basic-addon2"
                                />
                                <Button variant="outline-success">
                                    <BsSearch />
                                </Button>
                            </InputGroup>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>)
    } else {
        return (
            <Navbar bg="black" expand="lg">
                <Container fluid>
                    <Link to='/Home'><img src={logo} className="logo" alt="not found" /></Link>

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link >
                                <Link to="/Home" id='h'>Home</Link></Nav.Link>
                            <Nav.Link >
                                <Link to='/DC_VISUALISATION' id='h' >DCvisualization</Link></Nav.Link>
                            <Nav.Link >
                                <Link to='/Reporting' id='h'>Reporting</Link></Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <InputGroup className="mb-3">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="basic-addon2"
                                />
                                <Button variant="outline-success">
                                    <BsSearch />
                                </Button>
                            </InputGroup>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );

    }
}


export default Header;