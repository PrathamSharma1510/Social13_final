import React, { useState } from 'react';
import InputField from '../../components/inputField/Input';
import ButtonItself from '../../components/loginSignUpBtn/ButtonItself';
import styles from "./AdminLogin.module.css"

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log(email);
    return (
        <div className={styles.body}>
            <form className={styles.form}>
                <img id={styles.img} src="./images/logo.png" alt="logo" />
                <InputField typeOfInput="email" className={styles.input} lableText="LOGIN ID" garyBold={true} onChange={(event: any) => setEmail(event.target.value)} />
                <InputField typeOfInput="password" className={styles.input} lableText="PASSWORD" garyBold={true} onChange={(event: any) => setPassword(event.target.value)} />
                <ButtonItself className={styles.btn} full={false} btnPurpose="Login" arrow={true} onClick={() => console.log(`loggin in`)} />
            </form>
        </div>
    );
};

export default AdminLogin;