
import React from 'react'
import ChatComponent from './chatComponent/ChatComponent'
import ChatSidebox from './chatSidebox/ChatSidebox'
import style from "./Chatbox.module.css"

function Chatbox() {
    return (
        <div className={style.chatbox}>
            <ChatSidebox/>
            <ChatComponent/>
            
        </div>
    )
}

export default Chatbox


