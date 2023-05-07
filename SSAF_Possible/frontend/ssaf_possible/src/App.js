import './App.css';
import './font.css'
import './Globalstyle.js'
import GlobalStyle from './Globalstyle.js';
import Info from './components/Info';
import LoginPage from './routes/Login';
import {BrowserRouter as Router, Routes, Route, Link, Redirect, redirect} from 'react-router-dom'
import Navheader from './components/Header';
import Article from './routes/Article';


function App() {
  const authenticated = false;
  return (
    <div className="App">
      <GlobalStyle />
    <Router>
    <Navheader className='nav-basic-style'></Navheader>
      <Routes>
        <Route element={<LoginPage/>} path="/login"></Route>
        <Route element={<Info/>} path="/" exact></Route>
        <Route element={<Article/>} path="/article"/>
      </Routes>
    </Router>
    </div>
  );
}


export default App;
