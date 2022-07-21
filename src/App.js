import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Genre from './components/Genre';
import Cart from './components/Cart';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element = {<Home/>}></Route>
            <Route path="/genre" element = {<Genre/>}></Route>
            <Route path="/cart" element = {<Cart/>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
