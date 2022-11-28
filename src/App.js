import React from 'react';
import {Routes, Route} from "react-router-dom";
import ProjectContainer from "./pages/project/ProjectContainer";
import TasksContainer from "./pages/tasks/TasksContainer";
import './styles/_media.scss'


const App = () => {
    return (
        <div className="container">
            <Routes>
                <Route path='/' element={<ProjectContainer/>}/>
                <Route path='/tasks/:id' element={<TasksContainer/>}/>
            </Routes>
        </div>
    );
};

export default App;