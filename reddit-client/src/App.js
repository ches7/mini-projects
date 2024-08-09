import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import SelectForm from './components/SelectForm'
import Wrapper from './components/Wrapper';
import { Detail } from './components/Detail';
import HomePage from './components/HomePage';

function App() {

  return (
    <>
      <Router>
      <div id="app">
        <SelectForm />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/r/:endpoint" element={<Wrapper />} />
          <Route path="/r/:sub/comments/:path/:post" element={<Detail />} />
        </Routes>
      </div>
      </Router>
    </>
  );
};

export default App;
