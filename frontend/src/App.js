import React, { Suspense, useContext } from "react";
import { BrowserRouter as Router, Navigate, Route, Switch /*, Redirect*/ } from "react-router-dom";

import { RocketsContextProvider } from "./contexts/RocketsContext";
import { UserContext } from "./contexts/UserContext";
import Nav from "./components/Navigation/Nav";
import Loader from "./components/UI/Loader";
import Login from "./components/Login";
import Register from "./components/Register";

const Home = React.lazy(() => import("./pages/Home"));
const Launches = React.lazy(() => import("./pages/Launches"));
const LaunchDetail = React.lazy(() => import("./pages/LaunchDetail"));
const Rockets = React.lazy(() => import("./pages/Rockets"));
const RocketDetail = React.lazy(() => import("./pages/RocketDetail"));

const App = () => {
    const { user } = useContext(UserContext);
    const routes = (
        <Switch>
            {user && <Route path="/" exact render={() => <Home />} />}
            {user && <Route path="/rockets" exact render={() => <Rockets />} />}
            {user && <Route path="/rockets/:rocketId" render={() => <RocketDetail />} />}
            {user && <Route path="/launches" exact render={() => <Launches />} />}
            {user && <Route path="/launches/:flightNumber" render={() => <LaunchDetail />} />}
            {!user && (
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                </>
            )}
            {/* <Route>
                <Redirect to="/" />
            </Route> */}
            <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Switch>
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
