import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';


const MyNavbar = () => {
  return (
    
    <Navbar className='Navbar'>
      <Container fluid>
        <Navbar.Brand href="#">Huella Animal</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Perros</Nav.Link>
            <Nav.Link href="#action1">Gatos</Nav.Link>
            <Nav.Link href="#action1">Peses</Nav.Link>
            <Nav.Link href="#action1">Pequeñas Mascotas</Nav.Link>
            <Nav.Link href="#action2">Ofertas</Nav.Link>
            
           
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Busca aqui el producto preferido de tu mascota"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success"><i class="fa-solid fa-magnifying-glass"></i></Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;