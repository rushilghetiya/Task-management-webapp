import './App.css';
import Home from './Home';
import {useState} from "react"
import Navbar from './components/navbar/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes,Route } from 'react-router-dom';
import Setting from './Setting';
import Share from './Share';
function App() {
  // console.log(isAuth);
  return (
    <>

    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path="/getTask">
        <Route path=":uId" element={<Home  />} />
        
      </Route>
      <Route path="/share">
        <Route path=":uId" element={<Share  />} />
        
      </Route>
      <Route path='setting' element={<Setting/>}/>
    </Routes>



    {/* <Home isAuth={isAuth} /> */}
    <ToastContainer/>
    </>
  );
}

export default App;
