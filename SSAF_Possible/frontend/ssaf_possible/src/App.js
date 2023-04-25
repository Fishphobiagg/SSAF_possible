import './App.css';
import {Nav, Navbar, Container } from 'react-bootstrap';
import Article from './routes/Article.js'
import './font.css'
import './Globalstyle.js'
import GlobalStyle from './Globalstyle.js';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

function App() {
  
  let [article, articleSet] = useState(false);
  let [recruitment, recruitmentSet] = useState(false);
  let navigate = useNavigate();

  return (
    <div className="App">
      <GlobalStyle />
      <header>
      <Navbar bg="light" variant="light" className='nav sticky-top'>
        <Container>
          <Navbar.Brand href="#home" onClick={()=>{
              articleSet(false);
              recruitmentSet(false);
            }} className='navfont'>쌒!가능</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home" onClick={()=>{
              navigate('/Article')
            }}>기술블로그</Nav.Link>
            <Nav.Link href="#features">채용공고</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      </header>
    </div>

  );
}


export default App;
