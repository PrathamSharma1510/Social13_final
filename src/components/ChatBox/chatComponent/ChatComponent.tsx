import React, { useState } from 'react'
import { Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import style from "./ChatComponent.module.css"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import GifBoxIcon from '@mui/icons-material/GifBox';
import { Checks, Money, Link } from 'phosphor-react';
interface Event{
    e:any;
}
function ChatComponent() {
    const [input, SetInput]= useState("");
    console.log(input);
    const sendMessage=(e:Event)=>{
       
    };
    return (
        <div className={style.chat}>
            <div className={style.header}>
                <div className={style.account_info}>
                    < Avatar id={style.ava} />
                    <div className={style.account_info_name}>
                        <h3> Pratham Sharma</h3>
                        <p>@prathamsharma</p>
                    </div>

                </div>

                <MoreVertIcon id={style.vert} />
            </div>
            <div className={style.body}>
                <div className={style.Message} >
                    <div className={style.Received}>
                        <div className={style.receive}>
                            <p>Hi Ankesh!UI kitna Bana?</p>
                        </div>
                    </div>

                    <div className={style.Sentmessage}>
                        <div className={style.sent}>
                            <p>2 pages hogaye feed ke bhej do front end ko</p>
                        </div>

                        <Checks size={32} id={style.checks}/>
                    </div>
                    <div className={style.Emojis}>
                        <div className={style.sentEmos}>
                        <Money size={32} id={style.money} />
                        <Money size={32} id={style.money} />
                        <Money size={32} id={style.money} />
                       </div>
                        <div className={style.time}>
                            <p>3:54 pm</p>

                        </div>
                    </div>

                </div>
                <div className={style.Input}>
                    <input placeholder="Start a conversation..." type="text"  value={input} onChange={e=>SetInput(e.target.value)}/>
                    <AddPhotoAlternateIcon id={style.photo} />
                    <GifBoxIcon id={style.gif} />
                    <Link size={32} id={style.link} />
                </div>


            </div>
        </div>
    )
}

export default ChatComponent
