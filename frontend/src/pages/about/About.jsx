import styles from "./about.module.css";

export default function About() {
    return (
        <> 
        <div className={styles.mainContainer}>
            <div className={styles.content}>
                <h1 className={styles.title}>Overview</h1>
                <p>Our philosophy revolves around people, sincerity, and the fundamentals. We focus on understanding our customers, <br /> 
                offering optimum solutions, and providing new experiences through ceaseless innovation to help you lead a better life. <br /> 
                <br />We're reaching out to discerning consumers with keen sensibilities - people who continue to explore new activities and <br />
                challenges to experience more and achieve a better life. We've developed our brand image gradually and consistently to <br />communicate, <q>Life’s Good.</q> <br />
                We are contemporary yet authentic, always evolving our fundamental philosophies to the modern arena.</p>
                <hr />
                <h1 className={styles.titl}>History</h1>
                <p>Our history has always been surrounded by our desire to create a happier, better life. <br />
                We began our journey by pioneering new technology, eventually becoming a faster and smarter global brand of the future.
                <br />
                <br />
                We've unveiled many new products, applied new technologies in the form of mobile devices and digital TVs in the 21st century, <br />
                and continued to reinforce our global status.
                </p>
            </div>
        </div>
        </>
    );
}