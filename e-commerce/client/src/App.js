import logo from './logo.svg';
import './App.css';

import Home from './routes/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Product from './routes/Product';
import Register from './routes/Register';
import Login from './routes/Login';
import Account from './routes/Account';
import UpdateUser from './routes/UpdateUser';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Cart from './routes/Cart';
import Orders from './routes/Orders';

function App() {

  const { user } = useSelector(state => state.userStore);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route exact path='/account' element={user ? <Account/> : <Navigate to='/login' />} />
          <Route exact path='/cart' element={user ? <Cart/> : <Navigate to='/login' />} />
          <Route exact path='/orders' element={user ? <Orders/> : <Navigate to='/login' />} />
          <Route path="/account/update" element={<UpdateUser />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
