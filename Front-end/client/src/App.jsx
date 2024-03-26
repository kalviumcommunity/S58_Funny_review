import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RestaurantPage from './components/RestaurantPage';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={Home}/>
        <Route path='/login' Component={Login}/>
        <Route path='restaurant/:id' Component={RestaurantPage}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
