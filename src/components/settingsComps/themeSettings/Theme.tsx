import clsx from 'clsx'
import React from 'react'
import styles from './theme.module.css'

const Theme = () => {
    return (
        <>
            <div className={styles.mainDiv}>
                <h2 className={styles.title}>Theme</h2>
                <div className={styles.content}>
                    <p>Please select your favorite Web language:</p>
                  <div>
                    <label  className={clsx('d-flex align-items-center mb-1')}>
                      <input className={styles.readioInput} type="radio" id="html" name="fav_language" value="HTML"/>
                      <span className={styles.readioLables}>Set theme to dark mode</span><br/>
                    </label>
                  </div>
                  <div>
                    <label className={clsx('d-flex align-items-center mb-1')}>
                      <input className={styles.readioInput} type="radio" id="css" name="fav_language" value="CSS"/>
                      <span className={styles.readioLables}>Set theme to light mode</span><br/>
                    </label>
                  </div>
                  <div >
                    <label className={clsx('d-flex align-items-center mb-1')}>
                      <input className={styles.readioInput} type="radio" id="javascript" name="fav_language" value="JavaScript"/>
                      <span className={styles.readioLables}>Change theme automatically</span>
                    </label>
                  </div>
                </div>
            </div>    
        </>
    )       
}

export default Theme
