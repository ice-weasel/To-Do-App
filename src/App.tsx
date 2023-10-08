import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import ToDoFinal from "./pages/ToDoFinal";

const App = () => {
  return (
  
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/to-do-final" element={<ToDoFinal />} />
      </Routes>
    </BrowserRouter>
     
  );
};

export default App;
