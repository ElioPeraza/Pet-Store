import { Form, Button, Navbar, Nav, Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const expand = 'lg';

const MyNavbar = () => {
  return (
    <Navbar key={expand} expand={expand} className="Navbar mb-3">
      <Container fluid>
        <Row className="w-100">
          
          <Col xs={12} className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <Navbar.Brand href="#">
                <img
                  src="https://i.ibb.co/hZVLmzm/HA-negativo.png" // Ruta del logo
                  alt="Huella Animal"
                  style={{ width: '100px', height: 'auto' }} // Tamaño ajustable del logo
                />
              </Navbar.Brand>
              <Nav.Link href="#" className="ms-2" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                Huella Animal
              </Nav.Link>
            </div>

            <DropdownButton
              id="dropdown-basic-button"
              title="Menú"
              className="d-lg-none" 
            >
              <Dropdown.Item href="#action1"><i className="fa-solid fa-dog"></i> Perros</Dropdown.Item>
              <Dropdown.Item href="#action2"><i className="fa-solid fa-cat"></i> Gatos</Dropdown.Item>
              <Dropdown.Item href="#action3"><i className="fa-solid fa-fish"></i> Peces</Dropdown.Item>
              <Dropdown.Item href="#action5"><i className="fa-solid fa-percent"></i> Ofertas</Dropdown.Item>
            </DropdownButton>

            {/* Enlaces en la misma fila para pantallas grandes */}
            <Nav className="d-none d-lg-flex">
              <Nav.Link className='Link' href="#action1">
                <i className="fa-solid fa-dog"></i> Perros
              </Nav.Link>
              <Nav.Link className='Link' href="#action2">
                <i className="fa-solid fa-cat"></i> Gatos
              </Nav.Link>
              <Nav.Link className='Link' href="#action3">
                <i className="fa-solid fa-fish"></i> Peces
              </Nav.Link>
              <Nav.Link className='Link' href="#action5">
                <i className="fa-solid fa-percent"></i> Ofertas
              </Nav.Link>
            </Nav>
          </Col>

          {/* Barra de búsqueda en una fila separada */}
          <Col xs={12} className="mt-1">
            <Form className="d-flex justify-content-center">
              <Form.Control
                type="search"
                placeholder="Busca aquí el producto preferido de tu mascota"
                className="me-2"
                aria-label="Search"
                style={{ maxWidth: '700px', width: '100%' }} 
              />
              <Button variant="outline-success">
                <i className="fa-solid fa-magnifying-glass"></i>
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;








