import { ToastContainer } from 'react-toastify';
import './App.css';
import Navbar from './components/Navbar'; 
import AddContact from './components/AddContact';
import { Routes, Route } from 'react-router-dom';
import EditContact from './components/EditContact';
import Home from './components/Home';
 
const App = () => {
  return (
    <div className="App">    
      <ToastContainer/>
      <Navbar/>  
      <Routes>
        <Route path="/"  element={<Home/>}></Route>
        <Route path="/add"  element={<AddContact/>}></Route>
        <Route path="/edit/:id"  element={<EditContact/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
