import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Suspense, lazy } from 'react';
import Login from "../auth/Login";
import PrivateRoute from "./private-route/private.route";
import Preloader from "./preloader/PreloaderComponent";
const Home = lazy(() => import("../pages/Home"));
const Header = lazy(() => import("./layouts/Header"));
const Footer = lazy(() => import("./layouts/Footer"));
const Manufacturer = lazy(() => import("../modules/manufacturer/ManufacturerIndex"));
const ManufacturerCreate = lazy(() => import("../modules/manufacturer/ManufacturerCreate"));
const ManufacturerEdit = lazy(() => import("../modules/manufacturer/ManufacturerEdit"));
const MarketIndex = lazy(() => import("../modules/market/MarketIndex"));
const MarketCreate = lazy(() => import("../modules/market/MarketCreate"));
const MarketEdit = lazy(() => import("../modules/market/MarketEdit"));

const App = () => {
  return (
    <>
        <Suspense fallback={<Preloader />}>
            <Router>
                <Header/>
                    <Switch>
                        <Route exact={true} path="/login" component={Login} />
                        <PrivateRoute exact={true} path="/" Component={Home} />
                        <PrivateRoute exact={true} path="/manufacturer" Component={Manufacturer} />
                        <PrivateRoute exact={true} path="/manufacturers/create" Component={ManufacturerCreate} />
                        <PrivateRoute exact={true} path="/manufacturer/edit/:id" Component={ManufacturerEdit} />
                        <PrivateRoute exact={true} path="/market" Component={MarketIndex} />
                        <PrivateRoute exact={true} path="/market/create" Component={MarketCreate} />
                        <PrivateRoute exact={true} path="/market/edit/:id" Component={MarketEdit} />
                    </Switch>
                <Footer/>  
            </Router>
        </Suspense>
    </>
  );
}

export default App;
