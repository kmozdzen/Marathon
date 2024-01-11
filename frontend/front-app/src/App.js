import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import YourPlan from "./components/yourplan/YourPlan";
import Stats from "./components/stats/Stats";
import Questions from "./components/questions/Questions";
import { ProtectedRoute } from './components/authentication/ProtectedRoute';
import { IsPlan } from "./components/isPlan/IsPlan";
import PlanDetails from "./components/planDetails/PlanDetails";
import Profile from "./components/profile/Profile";
import Friends from "./components/friends/Friends";

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
                                    <YourPlan scrollStatus={{stats: false, exercises: false}}/>
                                </IsPlan>
                            </ProtectedRoute>
                        }>
            </Route>
            <Route 
                path="/stats" 
                element={
                            <ProtectedRoute>
                                <IsPlan>
                                    <YourPlan scrollStatus={{stats: true, exercises: false}} /> 
                                </IsPlan>
                            </ProtectedRoute>
                        }>
            </Route>
            <Route 
                path="/plan-details" 
                element={
                            <ProtectedRoute>
                                <IsPlan>
                                    <PlanDetails /> 
                                </IsPlan>
                            </ProtectedRoute>
                        }>
            </Route>
            <Route 
                path="/profile" 
                element={
                            <ProtectedRoute>
                                <IsPlan>
                                    <Profile /> 
                                </IsPlan>
                            </ProtectedRoute>
                        }>
            </Route>
            <Route 
                path="/exercises" 
                element={
                            <ProtectedRoute>
                                <IsPlan>
                                    <YourPlan scrollStatus={{stats: false, exercises: true}} />  
                                </IsPlan>
                            </ProtectedRoute>
                        }>
            </Route>
            <Route 
                path="/friends" 
                element={
                            <ProtectedRoute>
                                <IsPlan>
                                    <Friends /> 
                                </IsPlan>
                            </ProtectedRoute>
                        }>
            </Route>
        </Routes>
    </div>
  );
}

export default App;
