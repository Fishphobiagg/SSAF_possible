import './App.css';
import {Nav, Navbar, Container } from 'react-bootstrap';
import Article from './routes/Article.js'
import './font.css'
import './Globalstyle.js'
import GlobalStyle from './Globalstyle.js';
import { useState } from 'react';


function App() {
  
  // let [article, articleSet] = useState(false)
  // let [recruitment, recruitmentSet] = useState(false)

  // 변수명 신경쓰기, useState 반환 배열의 두번째 요소는 상태값을 바꿔주는 함수이기 때문에 일반적으로 동사 먼저 기술
  // 보통 함수에는 동사 + 목적어 로 네이밍 컨벤션을 가져감
  // 그리고 JS에서는 마지막에 ; 붙이는거 까먹지 마십쇼 
  const [article, setArticle] = useState(false);
  const [recruitment, setRecruitment] = useState(false);
  const [home, setHome] = useState(true);

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
            }} className='navfont'>쌒!가능</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home" onClick={()=>{
              setArticle(true);
              setRecruitment(false);
              setHome(false);
            }}>기술블로그</Nav.Link>
            <Nav.Link href="#features">채용공고</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      </header>
      {article && <Article/>}
    </div>
  );
}


export default App;
