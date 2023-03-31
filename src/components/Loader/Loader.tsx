import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from "./Loader.module.css"
const Loader = () => {
    return (
        <div className={styles.loader}>
            <Spinner animation="border" role="status" className={styles.spinner} >
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default Loader;