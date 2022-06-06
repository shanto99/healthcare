import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { logoutAction } from '../../auth/logout/logout.actions';
import { store } from '../../config/redux/store';

const Header = () => {

    const loginStateData = useSelector((state: any) => state.loginState);

    const history = useHistory();

    const logout = () => {
        store.dispatch(logoutAction());
        history.push("/login");
    };

    return (
        <>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top col-12 bg-primary py-3">
            <div className="container">
            <NavLink to="/" className="navbar-brand">Health Care</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul className="navbar-nav ms-auto">
                        <li className="navbar-item">
                            {
                                loginStateData.data.isSuccess == true 
                                ? <NavLink to="/" className="nav-link"
                                onClick={logout}
                                >Logout</NavLink> : 
                                <NavLink to="/login" className="nav-link">Login</NavLink>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </>
    );
}
  
export default Header; 