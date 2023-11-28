import React, { useState } from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Addproduct.module.css";

export default function AddProduct() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [txtname, setName] = useState("");
    const [price, setPrice] = useState("");
    const [txtdescription, setDescription] = useState("");
    const [fileimage, setPhoto] = useState("");
    const [message, setMessage] = useState("");
  
    const uploadProduct = async () => {
      const formData = new FormData();
      formData.append("user_id", user.id);
      formData.append("name", txtname);
      formData.append("price", price);
      formData.append("description", txtdescription);
      formData.append("image", fileimage);
      const responce = await axios.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (responce) {
        setMessage(responce.message);
        setTimeout(() => {
          navigate("/productlist");
        }, 2000);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await uploadProduct();
    };

    return (
      <> 
        <div className={styles.mainContainer}>
            <div className={styles.content}>

                <form onSubmit={handleSubmit} className={styles.form}>
                  <h4>Add Product</h4>
                      <p className="text-danger">{message}</p>
                <div className={styles.coolinput}>
                  <label htmlFor="inline-full-name" className={styles.text}>Product Name:</label>
                  <input type="text" onChange={(e) => setName(e.target.value)}  className={styles.input}/>
                </div>

                <div className={styles.coolinput}>
                  <label className={styles.text}>Price:</label>
                  <input type="number" onChange={(e) => setPrice(e.target.value)}  className={styles.input}/>
                </div>
                
                <div className={styles.coolinput}>
                  <label className={styles.text}>Description:</label>
                  <input type="text" onChange={(e) => setDescription(e.target.value)}  className={styles.input}/>
                </div>

                <div className={styles.coolinput}>
                    <label className={styles.labelTxt}> Product Image </label>
                    <input type="file" className={styles.inputFile} onChange={(e) => setPhoto(e.target.files[0])} />
                </div>
                <button type="submit" className={styles.button}> Add+ </button> 
                </form>
            </div>
        </div>
      </>
  );
}