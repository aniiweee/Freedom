import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "../../axios";
import { Link } from "react-router-dom";
import styles from "./ProductList.module.css";

export default function ProductList() {
  const { user } = useAuth();
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

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

  const deleteProduct = async (id) => {
    await axios.delete("/productdelete/" + id);
    const newUserData = product.filter((item) => {
      return item.id != id;
    });
    alert("User deleted successfully");
    setProduct(newUserData);
  };

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    const totalPages = Math.ceil(filteredProducts.length / recordsPerPage);
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function changePage(id) {
    setCurrentPage(id);
  }

  const filteredProducts = product.filter((item) => {
    return item.user_id === user.id;
  });

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const totalPages = Math.ceil(filteredProducts.length / recordsPerPage);
  const numbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.content}>

        <div className={styles.group}>
  <svg className={styles.iconn} aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
  <input placeholder="Search" type="search" className={styles.input} onChange={(e) => setSearch(e.target.value)}/>
</div>

          <table className={`table ${styles.table}`}>
            <thead>
              <tr>
                <th scope="col">Sr.No</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts
                .filter((item) => {
                  return search.trim() === "" ? item : item.name.toLowerCase().includes(search.toLowerCase());
                })
                .slice(firstIndex, lastIndex)
                .map((pdata, index) => (
                  <tr key={index + 1 + (currentPage - 1) * recordsPerPage}>
                    <th scope="row">{index + 1 + (currentPage - 1) * recordsPerPage}</th>
                    <td>{pdata.name}</td>
                    <td>{pdata.price}</td>
                    <td>{pdata.description}</td>
                    <td>
                      <img src={`http://127.0.0.1:8000/storage/${pdata.image}`} width={40} height={40} alt="Product" />
                    </td>
                    <td>
                      <Link to={`/view/${pdata.id}/view`} className={styles.viewEdit}>
                        View
                      </Link>
                      <Link to={`/editproduct/${pdata.id}/edit`} className={styles.viewEdit}>
                        Edit
                      </Link>
                     <button className={styles.btn} onClick={() => deleteProduct(pdata.id)}>
                             <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
                              <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
                             </svg>
                            </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="mt-5">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a href="#" className="page-link text-dark" onClick={prePage}>
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {numbers.map((n) => (
                  <li key={n} className="page-item">
                    <a href="#" className="page-link text-dark" onClick={() => changePage(n)} aria-current={currentPage === n ? "page" : ""}>
                      {n}
                    </a>
                  </li>
                ))}
                <li className="page-item">
                  <a href="#" className="page-link text-dark" onClick={nextPage}>
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
