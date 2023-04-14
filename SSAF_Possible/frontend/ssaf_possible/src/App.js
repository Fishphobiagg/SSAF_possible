import './App.css';
import { Button, Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import Article from './routes/Article.js'
import './font.css'

function App() {
    const url = 'http://127.0.0.1:8000/api/techblog/articles/';
    fetch(url)
    .then((res) => res.json())
    .then(data => console.log(data))
  return (
    <div className="App">
      <div>
      <Navbar bg="light" variant="light" >
        <Container>
          <Navbar.Brand href="#home" className='navfont'>쌒!가능</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">기술블로그</Nav.Link>
            <Nav.Link href="#features">채용공고</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      </div>
       <div className='category pc'>태그 들어갈 공간</div>
      <div className='col col-main'>아티클 들어갈 공간</div>
    </div>

  );
}


export default App;
