import './App.css';
import { Button, Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import Article from './routes/Article.js'

function App() {
  const url = 'http://127.0.0.1:8000/api/techblog/articles/';
  fetch(url).then((res:)=>resizeBy.json()).then(data=>console.log(src))
  return (
    <div className="App">
      <div>
      <Navbar bg="light" variant="light" fixed='top'>
        <Container>
          <Navbar.Brand href="#home" className='navfont'>쌒!가능</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">기술블로그</Nav.Link>
            <Nav.Link href="#features">채용공고</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      </div>
      <Article>1234s</Article>
    </div>

  );
}


export default App;
