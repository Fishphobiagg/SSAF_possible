import './App.css';
import {Nav, Navbar, Container } from 'react-bootstrap';
import Article from './routes/Article.js'
import './font.css'
import './Globalstyle.js'
import GlobalStyle from './Globalstyle.js';
import { useState } from 'react';
import Info from './routes/Info';


function App() {
  
  // let [article, articleSet] = useState(false)
  // let [recruitment, recruitmentSet] = useState(false)

  // 변수명 신경쓰기, useState 반환 배열의 두번째 요소는 상태값을 바꿔주는 함수이기 때문에 일반적으로 동사 먼저 기술
  // 보통 함수에는 동사 + 목적어 로 네이밍 컨벤션을 가져감
  // 그리고 JS에서는 마지막에 ; 붙이는거 까먹지 마십쇼 
  const [article, setArticle] = useState(false);
  const [recruitment, setRecruitment] = useState(false);
  const [home, setHome] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [loginModal, setloginModal] = useState(false);
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const logoutReqeust = () =>{
    fetch('http://127.0.0.1:8000/accounts/logout', {
      method:'POST',
      credentials: 'include',
    }).then(
      setIsLogin(false)
    )
  }
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  
  const requestLogin = (id, password) => {
    console.log(id, password)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken') },
      body: JSON.stringify({ username: id, password: password })
    };
  
    fetch('http://127.0.0.1:8000/accounts/login', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Login success:', data);
        // 로그인 성공시 처리할 코드 작성
        setIsLogin(true);
      })
      .catch(error => {
        console.error('Login error:', error);
        // 로그인 실패시 처리할 코드 작성
      });
  }


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
          {isLogin==false? <Nav className='login right' onClick={()=>{setloginModal(true);}}>로그인</Nav>:<Nav className='logout right' onClick={logoutReqeust()}>로그아웃</Nav>}
          {loginModal?     
          <div className='loginform'>
      <div className="id_pw_wrap">
        <input type="text" placeholder='아이디' onChange={e=>{setId(e.target.value)}}/>
        <input type="password" placeholder='비밀번호' onChange={e=>setPassword(e.target.value)}/>
      </div>
      <div className="btn_login_wrap">
        <button className="loginbtn" onClick={()=>requestLogin(id, password)}><span className='btntext'>가자</span></button>
      </div>
    </div>:null}
        </Container>
      </Navbar>
      </header>
      {article && <Article/>}
      {home && <Info/>}
    </div>
  );
}


export default App;
