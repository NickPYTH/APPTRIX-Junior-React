import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { MainPage } from "./Pages/MainPage";
import { AuthPage } from "./Pages/AuthPage";
import { TasksPage } from "./Pages/TasksPage";
import { TimesheetPage } from "./Pages/TimesheetPage";

export const Navigator = ({}) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/tasks/:id" element={<TimesheetPage />} />
            </Routes>
        </BrowserRouter>
    );
};
