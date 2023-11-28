import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./ViewProduct.module.css";

export default function ViewProduct() {
  const { user } = useAuth();
  const { id } = useParams();
  const [products, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const result = await axios.get("/products/" + id);
      setProduct(result.data.product);
    } catch (err) {
      console.log("Something Wrong");
    }
  };

  const clickToBackHandler = () => {
    navigate("/productlist");
  };

  return (
    <>
    <div className={styles.mainContainer}>
        <div className={styles.content}>
            <h3>Product Details</h3>
            <table className={`table mt-5 ${styles.tablee}`}>
                <thead>
                    <tr>
                        <th>S. No</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{products.id}</td>
                    <td>{products.name}</td>
                    <td>{products.description}</td>
                    <td>{products.price}</td>
                    <td>{user.id && (
                        <img src={`http://127.0.0.1:8000/storage/${products.image}`} width={250} height={250}/>
                    )}
                    </td>
                    </tr>
                </tbody>
            </table>
            <div className="mt-5">
                <button className="btn btn-dark text-white" onClick={clickToBackHandler}> Back To List</button>
            </div>
        </div>
    </div>
    </>
  );
};