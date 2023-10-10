import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import ToDoFinal from "./pages/ToDoFinal";
import LoginPage from "./pages/LoginPage";
//import NoPage from "./pages/NoPage";

const App = () => {
  return (
  
   <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login-page" element={<LoginPage/>} />
        <Route path="/to-do-final" element={<ToDoFinal />} />
        
      </Routes>
    </BrowserRouter>
     
  );
};

export default App;
