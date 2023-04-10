import React, { Suspense, useContext } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import { RocketsContextProvider } from "./contexts/RocketsContext";
import { UserContext } from "./contexts/UserContext";
import Nav from "./components/Navigation/Nav";
import Loader from "./components/UI/Loader";
import Login from "./components/Login";
import Register from "./components/Register";

import "./App.css";

const Home = React.lazy(() => import("./pages/Home"));
const Launches = React.lazy(() => import("./pages/Launches"));
const LaunchDetail = React.lazy(() => import("./pages/LaunchDetail"));
const Rockets = React.lazy(() => import("./pages/Rockets"));
const RocketDetail = React.lazy(() => import("./pages/RocketDetail"));

const App = () => {
    const { user } = useContext(UserContext);
    const routes = (
        <Routes>
            {user && <Route path="/" element={<Home />} />}
            <Route path="/rockets" element={<Rockets />} />
            <Route path="/rockets/:rocketId" element={<RocketDetail />} />
            <Route path="/launches" element={<Launches />} />
            <Route path="/launches/:flightNumber" element={<LaunchDetail />} />
            <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
            {!user && (
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                </>
            )}
        </Routes>
    );

    const fallback = (
        <div className="flex w-screen h-screen justify-center items-center ">
            <Loader />
        </div>
    );

    return (
        <RocketsContextProvider>
            <Suspense fallback={fallback}>
                <Router basename={process.env.PUBLIC_URL}>
                    <Nav />
                    {routes}
                </Router>
            </Suspense>
        </RocketsContextProvider>
    );
};

export default App;
