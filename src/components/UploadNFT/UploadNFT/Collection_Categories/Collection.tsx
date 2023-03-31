import React from "react";
import styles from "./Collection.module.css";
import { Plus } from "phosphor-react";


const Collection = ({ item }: any) => {
    return (
        <>
            <div className={styles.section}>
                {item.map((x: any, index: number) => (
                    <div className={styles.item} key={index}>
                        <div className={styles.circle} style={{ backgroundColor: x.color }} >
                            <Plus size={15} className={styles.Plus}/>
                        </div>
                        <div className={styles.body}>
                            <span className={styles.Heading}>{x.title}</span>
                        </div>
                    </div>
                ))}

            </div>
        </>
    );
};

export default Collection;