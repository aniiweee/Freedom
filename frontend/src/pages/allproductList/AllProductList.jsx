import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./AllProductList.module.css";

export default function AllProductList() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProduct = () => {
      fetch("http://127.0.0.1:8000/api/products")
        .then((res) => res.json())
        .then((response) => {
          setProduct(response.products);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getProduct();
  }, []);

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.content}>
          {product.length > 0 ? (
            product.map((pdata, index) => (
              <div className={`card ${styles.card}`} key={index}>
                <img
                  src={`http://127.0.0.1:8000/storage/${pdata.image}`}
                  className={`card-img-top ${styles.img}`}
                />
                <div className="card-body">
                  <h5 className="card-title">{pdata.name}</h5>
                  <p className="card-text">{pdata.description}</p>
                  <Link to="/login">
                    <div
                      data-tooltip={`$${pdata.price}`}
                      className={styles.button}
                    >
                      <div className={styles.buttonWrapper}>
                        <div className={styles.text}>Buy Now</div>
                        <span className={styles.icon}>
                          <svg
                            viewBox="0 0 16 16"
                            className="bi bi-cart2"
                            fill="currentColor"
                            height="16"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-center">No Product To Show</h1>
          )}
        </div>
      </div>
    </>
  );
}
