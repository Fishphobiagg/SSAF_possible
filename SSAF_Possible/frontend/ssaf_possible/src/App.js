import './App.css';
import './font.css'
import './Globalstyle.js'
import GlobalStyle from './Globalstyle.js';
import Info from './components/Info';
import LoginPage from './routes/Login';
import {BrowserRouter as Router, Routes, Route, Link, Redirect, redirect} from 'react-router-dom'
import Navheader from './components/Header';
import Article from './routes/Article';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
    <Router>
    <AuthProvider>
    <Navheader></Navheader>
      <Routes>
        <Route Component={LoginPage} path="/login"></Route>
        <Route Component={Info} path="/"></Route>
        <Route Component={Article} path="/article"/>
      </Routes>
    </AuthProvider>
    </Router>
    </div>
  );
}


export default App;
