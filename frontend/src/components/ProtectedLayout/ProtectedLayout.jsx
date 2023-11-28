import { useEffect, useState } from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "../../axios";
import styles from "./ProtectedLayout.module.css";
import logo from "../../../image/bullifinchLogo.png";

export default function ProtectedLayout() {
    const navigate = useNavigate();
    const handleLogoClick = () => {
      navigate('/');
    };
    const [isMobile, setisMobile] = useState(false);
    const { user, setUser } = useAuth();
    const toggleActiveClass = () => {
      setisMobile(!isMobile);
    };
    const removeActive = () => {
      setisMobile(false);
    };
    useEffect(() => {
      (async () => {
        try {
          const resp = await axios.get("/user");
          if (resp.status === 200) {
            setUser(resp.data.data);
          }
        } catch (error) {
          if (error.response.status === 401) {
            localStorage.removeItem("user");
            window.location.href = "/";
          }
        }
      })();
    }, []);
  
    if (!user) {
      return <Navigate to="/" />;
    }
  
    const handleLogout = async () => {
      try {
        const resp = await axios.post("/logout");
        if (resp.status === 200) {
          localStorage.removeItem("user");
          window.location.href = "/";
        }
      } catch (error) {
        console.log(error);
      }
    };

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
                        <NavLink to="/profile" className={({ isActive }) => isActive ? styles.pushed : styles.navLink}>Profile</NavLink>
                    </li>
                    <li onClick={removeActive}>
                        <NavLink to="/about" className={({ isActive }) => isActive ? styles.pushed : styles.navLink}>About Us</NavLink>
                    </li>
                    <li onClick={removeActive}>
                        <NavLink to="/productlist" className={({ isActive }) => isActive ? styles.pushed : styles.navLink}>Product List</NavLink>
                    </li>
                    <li onClick={removeActive}>
                        <NavLink to="/addproduct" className={({ isActive }) => isActive ? styles.pushed : styles.navLink}>Add Product</NavLink>
                    </li>
                    <li>
                        <a onClick={handleLogout} href="#" className={styles.navLink}>Logout</a>
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