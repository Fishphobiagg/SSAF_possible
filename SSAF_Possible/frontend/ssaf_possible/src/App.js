import './App.css';
import { Button, Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';


function App() {
  return (
    <div className="App">
            <Navbar bg="light" variant="light" fixed='top'>
        <Container>
          <Navbar.Brand href="#home">쌒!가능</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">기술블로그</Nav.Link>
            <Nav.Link href="#features">채용공고</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>

  );
}


export default App;
