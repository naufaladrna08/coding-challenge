import { Routes, Route } from 'react-router-dom'
import Admin from './pages/Admin'
import Home from './pages/Home'
import NavbarComponent from './components/Navbar'

function App() {
  return (
    <div className="App">
      <NavbarComponent />

      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/admin" element={ <Admin /> } />
      </Routes>
    </div>
  );
}

export default App;
