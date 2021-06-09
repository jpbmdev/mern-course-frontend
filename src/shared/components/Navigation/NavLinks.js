import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';

import './NavLinks.css';

const NavLinks = (props) => {

    const auth = useContext(AuthContext);

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>ALL USERS</NavLink>
            </li>
            {auth.isLoggedIn &&
                <React.Fragment>
                    <li>
                        <NavLink to={`/${auth.userId}/places`} exact>MY PLACES</NavLink>
                    </li>
                    <li>
                        <NavLink to="/places/new" exact>NEW PLACE</NavLink>
                    </li>
                    <li>
                        <button onClick={auth.logout}>LOGOUT</button>
                    </li>
                </React.Fragment>
            }
            {!auth.isLoggedIn &&
                <li>
                    <NavLink to="/auth" exact>AUTHENTICATE</NavLink>
                </li>
            }
        </ul>
    );
}

export default NavLinks;