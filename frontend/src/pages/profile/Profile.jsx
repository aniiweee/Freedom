import styles from "./Profile.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { format } from "date-fns";

export default function Profile() {
    const { user } = useAuth();
    const formattedJoiningDate = format(new Date(user.created_at), "dd MMM yyyy");
    return (
        <> 
        <section className={styles.mainContainer}>
            <div className={styles.profilContainer}>
                <div>
                    <img src={`http://127.0.0.1:8000/storage/${user.image}`}  className={styles.profilImage}/>
                </div>
                <div className={styles.profilTxt}>
                    <h5 className={styles.name}>{user.name}
                    <p className={styles.email}>{user.email} </p>
                    </h5>
                </div>
            </div>
            <div className={styles.date}>
                <p>Joining Date – {formattedJoiningDate}</p>
            </div>
        </section>
        </>
    );
}