import {Nav, Navbar, Container } from 'react-bootstrap';
import "./Header.css";
import {Link} from 'react-router-dom';

const Navheader = () => {
  const authenticated = false;

    return(
    <header>
  <Navbar bg="light" variant="light" className='nav sticky-top'>
  <Container>
    <Link to="/"><Navbar.Brand href="#home" className='nav-home'>쌒!가능</Navbar.Brand></Link>
    <Nav className="me-auto">
      {!authenticated? <Link to="/login" className='nav-style' >기술블로그</Link> :<Link to="/article" className='nav-style' >기술블로그</Link>}
      <Link to="/recruit" className='nav-style' >채용공고</Link>
    </Nav>
    <Link className='right' to='/login'>로그인</Link>
  </Container>
</Navbar>
</header>
    )
}


export default Navheader;