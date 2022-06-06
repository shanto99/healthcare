import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Suspense, lazy } from 'react';
import Login from "../auth/Login";
import PrivateRoute from "./private-route/private.route";
import Preloader from "./preloader/PreloaderComponent";
import Manufacturer from "../modules/manufacturer/Manufacturer";
const Home = lazy(() => import("../pages/Home"));
const Header = lazy(() => import("./layouts/Header"));
const Footer = lazy(() => import("./layouts/Footer"));

const App = () => {
  return (
    <>
        <Suspense fallback={<Preloader />}>
            <Router>
                <Header/>
                    <Switch>
                        <PrivateRoute exact={true} path="/manufacturer" Component={Manufacturer} />
                        <PrivateRoute exact={true} path="/" Component={Home} />
                        <Route exact={true} path="/login" component={Login} />
                    </Switch>
                <Footer/>  
            </Router>
        </Suspense>
    </>
  );
}

export default App;
