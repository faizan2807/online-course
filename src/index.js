import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import { Register } from './components/Register/register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Login } from './components/Login/login';
import { Dashboard } from './components/Dashobard/dashboard';
import { Add } from './components/add/add';
import { Home } from './components/Home/home';
import { Edit } from './components/edit/edit';
import { Dashlesson } from './components/lesson/lessondash/dash';
import { Addlesson } from './components/lesson/addlesson.jsx/addlesson';
import { Editlesson } from './components/lesson/editlesson/editlesson';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 /* <React.StrictMode>
    <Register />
  </React.StrictMode>*/
<CookiesProvider>
  <BrowserRouter>
  <Routes>
  <Route path='/' element={<Home/>}></Route>
<Route path='/register' element={<Register/>}></Route>
<Route path='/login' element={<Login/>}></Route>
<Route path='/dashboard' element={<Dashboard/>}></Route>
<Route path='/add' element={<Add/>}></Route>
<Route path='/edit' element={<Edit/>}></Route>
<Route path='/addlesson' element={<Addlesson/>}></Route>
<Route path='/course/:CourseId/dashlesson' element={<Dashlesson />}/> 
<Route path='/editlesson'element={<Editlesson />} />









  </Routes>
  </BrowserRouter>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
