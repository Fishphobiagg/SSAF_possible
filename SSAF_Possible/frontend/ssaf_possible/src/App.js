import './App.css';
import {Nav, Navbar, Container } from 'react-bootstrap';
import Article from './routes/Article.js'
import './font.css'
import './Globalstyle.js'
import GlobalStyle from './Globalstyle.js';
import { useState } from 'react';
import Info from './routes/Info';


function App() {
  

  // 안쓰는 변수들은 왜 남겨두신 건가요?
  const [article, setArticle] = useState(false);
  const [recruitment, setRecruitment] = useState(false);
  const [home, setHome] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [loginModal, setloginModal] = useState(false);
  
  return (
    <div className="App">
      <GlobalStyle />
      <header>
      <Navbar bg="light" variant="light" className='nav sticky-top'>
        <Container>
          <Navbar.Brand href="#home" onClick={()=>{
              setArticle(false);
              setRecruitment(false);
              setHome(true);
            }} className='nav-home'>쌒!가능</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className='nav-style' onClick={()=>{
              setArticle(true);
              setRecruitment(false);
              setHome(false);
            }}>기술블로그</Nav.Link>
            <Nav.Link className='nav-style' >채용공고</Nav.Link>
          </Nav>
          {isLogin? <Nav>로그아웃</Nav>:
          <Nav>로그인</Nav>}
        </Container>
      </Navbar>
      </header>
      {article && <Article/>}
      {home && <Info/>}
    </div>
  );
}


export default App;
