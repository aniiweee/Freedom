import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "../../axios";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Register.module.css";
import cross from "../../../image/cross.png";
import picture from "../../../image/picture.png";
import buli from "../../../image/bullfinchLog.png";

export default function Register() {

  const navigate = useNavigate();

  const handleCrossClick = () => {
    navigate('/');
  };

  const { setUser, csrfToken } = useAuth();
  const [nameError, setNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [imageError, setImageError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [isShown, setIsSHown] = useState(false);
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, image, password, cpassword } = e.target.elements;
    const body = {
      name: name.value,
      email: email.value,
      image: image.files[0],
      password: password.value,
      password_confirmation: cpassword.value,
    };
    await csrfToken();
    try {
      const resp = await axios.post("/register", body);
      if (resp.status === 200) {
        setUser(resp.data.user);
        return <Navigate to="/profile" />;
      }
    } catch (error) {
      if (error.response.status === 422) {
        if (error.response.data.errors.name) {
          setNameError(error.response.data.errors.name[0]);
        } else {
          setNameError("");
        }
        if (error.response.data.errors.email) {
          setEmailError(error.response.data.errors.email[0]);
        } else {
          setEmailError("");
        }
        if (error.response.data.errors.image) {
          console.log(error.response.data.errors.image);
          setImageError(error.response.data.errors.image[0]);
        } else {
          setImageError("");
        }
        if (error.response.data.errors.password) {
          setPasswordError(error.response.data.errors.password[0]);
        } else {
          setPasswordError("");
        }
      }
    }
  };

  return (
    <>
    <section className={styles.mainContainer}>
      <div className={styles.containerRegister}>
        <div className={styles.cross}>
          <img src={cross} onClick={handleCrossClick}/>
        </div>
        <div className={styles.logimgcont}>
          <img src={buli}  className={styles.logimg} />
        </div>
        <h1 className={styles.createAccount}>Create an account</h1>
        <form action="#" method="post" onSubmit={handleSubmit}>
        <div className={styles.inputHolder}>
          <label htmlFor="image" className={styles.label}>Choose a profile picture
          <img src={picture} className={styles.picture}/>
          </label>
          <input type="file" name="image" id="image" className={styles.inp}/>
          {imageError && <span className={styles.errorTxt}>- {imageError}</span>}
        </div>
        <div className={styles.inputHolder}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input type="text" name="name" id="name" className={styles.input} placeholder="Name Surname" />
          {nameError && <span className={styles.errorTxt}>- {nameError}</span>}
        </div>
        <div className={styles.inputHolder}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input type="email" name="email" id="email" className={styles.input} placeholder="example@email.com" />
          {nameError && <span className={styles.errorTxt}>- {emailError}</span>}
        </div>
        <div className={styles.inputHolder}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input type={isShown ? "text" : "password"} name="password" id="password" className={styles.input} placeholder="Password: 8+ chars, (A-Z), (a-z), (0-9), symbols"/>
          {nameError && <span className={styles.errorTxt}>- {passwordError}</span>}
        </div>
        <div className={styles.inputHolder}>
          <label htmlFor="cpassword" className={styles.label}>Confirm Password</label>
          <input type={isShown ? "text" : "password"} name="cpassword" id="cpassword" className={styles.input} placeholder="Password"/>
        </div>
        <div className={styles.containerBtn}>
        <button type="submit" className={styles.createBtn}>Create</button>
        </div>
        <div className={styles.bottomTxtContainer}>
          <p className={styles.bottomTxt}>Already have an account?
          <Link to="/login" className={styles.signUp}> Login here </Link></p>
        </div>
        <div className={styles.checkBoxContainer}>
          <label htmlFor="checkbox" className={styles.checkBoxTxt}> Show Password?</label>
          <input type="checkbox"  id="checkbox" checked={isShown} onChange={togglePassword} className={styles.checkBox}/>
        </div>
        <div className={styles.line}></div>
      </form>
      </div>
    </section>
    </>
  );
}