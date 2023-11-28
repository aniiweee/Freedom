import React, { useState } from "react";
import { Navigate, Outlet, NavLink, useNavigate} from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./GuestLayout.module.css";
import logo from "../../../image/bullifinchLogo.png";

export default function GuestLayout() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
      navigate('/');
    };
    const [isMobile, setisMobile] = useState(false);
    const { user } = useAuth();
    const toggleActiveClass = () => {
        setisMobile(!isMobile);
    };
    const removeActive = () => {
        setisMobile(false);
    };
    if (user) {
        return <Navigate to="/profile"/>;
    }
    return (
        <>
        <nav className={`${styles.navbar}`}>
            <div className={`${styles.containerLogo}`} onClick={handleLogoClick}>
                <img src={logo} alt="Logo" className={`${styles.logoImg}`}/>
                <h1 className={`${styles.name}`}>Freedom</h1>
            </div>

            <div className={`${styles.menuContainer}`}>
                <ul className={`${styles.menu} ${isMobile ? styles.active : ""}`}>
                    <li onClick={removeActive}>
                        <NavLink to="/login" className={({ isActive }) => isActive ? styles.pushed : styles.navLink}>Login</NavLink>
                    </li>
                    <li onClick={removeActive}>
                        <NavLink to="/register" className={({ isActive }) => isActive ? styles.pushed : styles.navLink}>Register</NavLink>
                    </li>
                </ul>
            </div>
            <div
              className={`${styles.hamburger} ${isMobile ? styles.active : ""}`}
              onClick={toggleActiveClass}>
              <span className={`${styles.bar}`}></span>
              <span className={`${styles.bar}`}></span>
              <span className={`${styles.bar}`}></span>
            </div>
          </nav>
      <Outlet />
        </>
    );
}