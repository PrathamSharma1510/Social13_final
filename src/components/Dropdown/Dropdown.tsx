import clsx from 'clsx';
import { CaretDown } from 'phosphor-react';
import React, { useState } from 'react';
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Dropdown.module.css"

const Dropdown = ({ className, value, setValue, options, height }: any) => {
    const [visible, setVisible] = useState(false);
    const handleClick=(value:any)=>{
        setValue(value);
        setVisible(false);
    }

    return (
        <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
            <div className={clsx(styles.dropdown, className, { [styles.active]: visible })}>
                <div className={styles.head} style={{height:height}} onClick={() => setVisible(!visible)}>
                    <div className={styles.selection}>{value}</div>
                    <div className={styles.arrow}>
                        <CaretDown size={18} id={styles.down}/>
                    </div>
                </div>
                <div className={styles.body}>
                    {options.map((x:any,index:number)=>(
                        <div className={clsx(styles.option, {[styles.selectioned]:x=== value})} onClick={()=>handleClick(x)} key={index}>{x}</div>
                    ))}
                </div>
            </div>
        </OutsideClickHandler>
    );
};

export default Dropdown;