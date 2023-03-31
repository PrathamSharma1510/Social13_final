import React from 'react';
import cn from "classnames";
import styles from './GradBorder.module.css';

interface BtnText {
    text: string,
    className: any,
    onClick?: any,
    disable?: boolean,
}

const GradBorder = ({ text, className, disable, onClick }: BtnText) => {
    return (
        <button disabled={disable} className={cn(styles.gradientBorder, className)} onClick={onClick}><span className={styles.btnName}>{text}</span></button>
    )
}

export default GradBorder
