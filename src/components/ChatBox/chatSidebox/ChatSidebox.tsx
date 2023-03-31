import React from 'react'
import style from './ChatSidebox.module.css'
import EmailIcon from '@mui/icons-material/Email';
import { Avatar } from '@mui/material';


function ChatSidebox() {
    return (
        <div className={style.sidebar}>
            <div className={style.header}>
                <div className={style.title}>
                    <h2> My Messages</h2>
                    <EmailIcon id={style.email} />
                </div>
                <input  placeholder="Search messages"/>
            </div>
            <div className={style.body}>
                <div className={style.person}>
                  <Avatar id={style.ava}/>
                  <div className={style.person_message}>
                      <h4>Raghav Vashisht</h4>
                      <p>I want to buy Aish macbook pro...</p>
                  </div>
                </div>
                <div className={style.person}>
                  <Avatar id={style.ava}/>
                  <div className={style.person_message}>
                      <h4>Raghav Vashisht</h4>
                      <p>I want to buy Aish macbook pro...</p>
                  </div>
                </div>
                <div className={style.person}>
                  <Avatar id={style.ava}/>
                  <div className={style.person_message}>
                      <h4>Raghav Vashisht</h4>
                      <p>I want to buy Aish macbook pro...</p>
                  </div>
                </div>
                <div className={style.person}>
                  <Avatar id={style.ava}/>
                  <div className={style.person_message}>
                      <h4>Raghav Vashisht</h4>
                      <p>I want to buy Aish macbook pro...</p>
                  </div>
                </div>
                <div className={style.person}>
                  <Avatar id={style.ava}/>
                  <div className={style.person_message}>
                      <h4>Raghav Vashisht</h4>
                      <p>I want to buy Aish macbook pro...</p>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default ChatSidebox
