import { useState, useEffect } from "react";
import { useParams, useNavigate, } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "../../axios";
import styles from "./EditProduct.module.css";

export default function EditProduct() {
    
    const { user } = useAuth();
    const navigate = useNavigate();
  
    const { id } = useParams();
  
    const [message, setMessage] = useState("");
  
    const [inputs, setInputs] = useState([]);
    const [fileimage, setPhoto] = useState("");
  
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs((values) => ({ ...values, [name]: value }));
    };
  
    const uploadProduct = async () => {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("user_id", user.id);
      formData.append("name", inputs.name);
      formData.append("price", inputs.price);
      formData.append("description", inputs.description);
      formData.append("image", fileimage);
      const response = await axios.post("/productsupdate/" + id, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message);
      setTimeout(() => {
        navigate("/productlist");
      }, 2000);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await uploadProduct();
    };
  
    useEffect(() => {
      getproduct();
    }, []);
  
    function getproduct() {
      axios.get("/products/" + id).then(function (response) {
        setInputs(response.data.product);
      });
    }

    return (
        <>
        <div className={styles.mainContainer}>
            <div className={styles.content}>
                <h3>Edit Product</h3>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <p className="text-success text-center">{message}</p>
                    <div className="d-flex flex-column">
                    <label className={styles.label}>Name:</label>
                    <input type="text" value={inputs.name || ""} onChange={handleChange} className={styles.inputt} name="name"/>
                    </div>
                    <div className="d-flex flex-column">
                    <label className={styles.label}>Price:</label>
                    <input type="number" value={inputs.price || ""} onChange={handleChange} className={styles.inputt} name="price"/>
                    </div>
                    <div className="d-flex flex-column">
                    <label className={styles.label}>Description:</label>
                    <input type="text" value={inputs.description || ""} onChange={handleChange} className={styles.inputt} name="description"/>
                    </div>
                    <div className="d-flex flex-column">
                    <label className={styles.label}>Image:</label>
                    <img src={`http://127.0.0.1:8000/storage/${inputs.image}`} width={100} height={100} className="mt-1" />
                    <input type="file"  onChange={(e) => setPhoto(e.target.files[0])} className={styles.inputImg}/>
                    </div>
                    <div className="text-center mt-3">
                      <button type="submit" className={styles.btn}>Confirm &#10003;</button>
                    </div>

                </form>
            </div>
        </div>
        </>
    );
}