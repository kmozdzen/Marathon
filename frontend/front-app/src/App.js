import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import YourPlan from "./components/yourplan/YourPlan";
import Stats from "./components/stats/Stats";
import Questions from "./components/questions/Questions";
import { ProtectedRoute } from './components/authentication/ProtectedRoute';
import { IsPlan } from "./components/isPlan/isPlan";

function App() {
  return (
    <div>
        <Routes>
            <Route 
                path="/" 
                element={<Home/>}>
            </Route>
            <Route 
                path="/register" 
                element={<Register/>}>
            </Route>
            <Route 
                path="/login" 
                element={<Login/>}>
            </Route>
            <Route 
                path="/yourplan" 
                element={
                            <ProtectedRoute>
                                <IsPlan>
                                    <YourPlan />
                                </IsPlan>
                            </ProtectedRoute>
                        }>
            </Route>
            <Route 
                path="/stats" 
                element={
                            <ProtectedRoute>
                                <Stats />
                            </ProtectedRoute>
                        }>
            </Route>
            <Route 
                path="/questions" 
                element={
                            <ProtectedRoute>
                                <Questions />
                            </ProtectedRoute>
                        }>
            </Route>
        </Routes>
    </div>
  );
}

export default App;
