import {Nav, Navbar, Container } from 'react-bootstrap';
import "./Header.css";
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Navheader = () => {
  let {user} = useContext(AuthContext)
    return(
    <header>
  <Navbar bg="light" variant="light" className='nav sticky-top'>
  <Container>
    <Navbar.Brand className='nav-home'>쌒!가능</Navbar.Brand>
    <Nav className="me-auto">
      {!user? <Link to="/login" className='nav-style' >기술블로그</Link> :<Link to="/article" className='nav-style' >기술블로그</Link>}
      <Link to="/recruit" className='nav-style' >채용공고</Link>
    </Nav>
    {user && <p className='nametag'> {user.username} 님</p>}
    {user && <p className='mypage'>마이페이지</p>}
    {user? <Link className='right' to='/logout'>로그아웃</Link>:<Link className='right' to='/login'>로그인</Link>}
  </Container>
</Navbar>
</header>
    )
}


export default Navheader;