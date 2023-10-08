import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ToDoFinal from './ToDoFinal';



export default function HomePage() {

    return (
        <div>
            <p>This is the home page.</p>
            <p>
                <Link to="/about">Go to the About Page!</Link>
            </p>
            <p>
                <Link to={"./pages/ToDoFinal"}>To Do App</Link>
            </p>
          
        </div>
    );
};


