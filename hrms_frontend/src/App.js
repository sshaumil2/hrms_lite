import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./adminpanel.css";
import Router from "./Router/Router";
import { useButtonHoverEffect } from "./helper/useButtonHoverEffect";
import { ToastContainer } from 'react-toastify';


function App() {
  useButtonHoverEffect();

  return (
    <div className="App">
      <ToastContainer/>
      <Router />
    </div>
  )
}

export default App;
