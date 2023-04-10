import React, { Suspense /*, useContext*/ } from "react";
import { BrowserRouter as Router/*, Navigate*/, Route, Routes } from "react-router-dom";

import { RocketsContextProvider } from "./contexts/RocketsContext";
// import { UserContext } from "./contexts/UserContext";
import Nav from "./components/Navigation/Nav";
import Loader from "./components/UI/Loader";
// import Login from "./components/Login";
// import Register from "./components/Register";

import "./App.css";

const Home = React.lazy(() => import("./pages/Home"));
// const Launches = React.lazy(() => import("./pages/Launches"));
// const LaunchDetail = React.lazy(() => import("./pages/LaunchDetail"));
const Rockets = React.lazy(() => import("./pages/Rockets"));
// const RocketDetail = React.lazy(() => import("./pages/RocketDetail"));

const App = () => {
    const routes = (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rockets" element={<Rockets />} />
            {/* <Route path="/rockets/:rocketId" render={() => <RocketDetail />} />
            <Route path="/launches" exact render={() => <Launches />} />
            <Route path="/launches/:flightNumber" render={() => <LaunchDetail />} /> */}
            {/* <Route>
                <Navigate to="/" />
            </Route> */}
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
