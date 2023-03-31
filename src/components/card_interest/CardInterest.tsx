import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import Continue from '../continueBtn/Continue';
import "./CardInterest.css"
import SkipButton from '../skipbutton/SkipButton';
import BackButton from  '../backButton/BackButton'
import { Button } from 'react-bootstrap';
import clsx from 'clsx';

interface Content{
     
    id:any,
    name:string,
    classname:string,
    src:any,
    srcclose:any
}


function Card_interest() {
    const  card___content:Content[]=[
        {
            id:1,
            name:"Comedy",
            classname:"Comedy",
            src:"./images/laughteremoji.png",
            srcclose:"./images/close.png"

        },
        {
            id:2,
            name:"Graphic Design",            
            classname:"Graphic_Design",            
            src:"./images/graphic_design.png",
            srcclose:"./images/close.png"

        },
        {
            id:3,
            name:"Music",
            classname:"Music",
            src:"./images/music.png",
            srcclose:"./images/close.png"

        },
        {
            id:4,
            name:"Photography",
            classname:"Photography",
            src:"./images/photography.png",
            srcclose:"./images/close.png"

        },
        {
            id:5,
            name:"YouTube",
            classname:"Youtube",
            src:"./images/youtube.png",
            srcclose:"./images/close.png"

        },
        {
            id:6,
            name:"Beauty",
            classname:"Beauty",
            src:"./images/beauty.png",
            srcclose:"./images/close.png"

        },
        {
            id:7,
            name:"Gaming",
            classname:"Gaming",
            src:"./images/gaming.png",
            srcclose:"./images/close.png"

        },
        {
            id:8,
            name:"Cryptocurrency",
            classname:"Cryptocurrency",
            src:"./images/cryptocurrency.png",
            srcclose:"./images/close.png"

        },
        {
            id:9,
            name:"Technology",
            classname:"Technology",
            src:"./images/technology.png",
            srcclose:"./images/close.png"

        },
        {
            id:10,
            name:"Art",
            classname:"Art",
            src:"./images/art.png",
            srcclose:"./images/close.png"


        },
        {
            id:11,
            name:"Sports",
            classname:"Sports",
            src:"./images/sport.png",
            srcclose:"./images/close.png"

        }
       

    ];

    let [selected, setSelected] = useState<any[]>([])


    const click = ( name : any) => {

        if (!selected.includes(name)) {
            if(selected.length < 5)
                setSelected([...selected, name])
          } else {
             setSelected(selected.filter((index) => index !== name))
          }
    }

    console.log(selected);

   
    return (
        <div className="card_body">
            <div id="back1">
            <Link to="#">
                <i className="bi arrowLeft bi-arrow-left"></i>
            </Link>
            </div>
            <div className="card_title">
             <h2>Tell Us About Your Interests</h2>
            </div>
            <div className="card_subtitle">
                <p>Let's get to know you a little more so we can tune your feed just right. <b>Choose any 5 interests:</b></p>
                </div>
            <div className="card_content">
               
                {card___content.map(data=>{
                    let sel = ''
                    if(selected.includes(data.name)){
                        sel = "borderBlack"
                    }

                    
                    return <Button onClick={() => click(data.name)} key={data.name} id="Interestbtn" type="button" className={clsx(sel === "borderBlack" ? " borderBlack" : "buttonWhole", data.classname)}>
                                { (sel === 'borderBlack') && <img src={data.srcclose} alt=""/>}
                                <img src={data.src} alt=""/>
                                <span className={sel === "borderBlack" ? " textBold" : "textNormal"}>{data.name}</span>
                            </Button>

                })}
            </div>
            <div className="Card_continuebutton">
            <Continue />
            </div>

            <div className="Card_skipbutton">
            <SkipButton />
            </div>
            
        </div>
    )
}

export default Card_interest
