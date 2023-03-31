import clsx from 'clsx';
import React, { ButtonHTMLAttributes } from 'react'
import { Button } from 'react-bootstrap'
import './postButton.css';

interface Btn extends ButtonHTMLAttributes<HTMLButtonElement>{
    btnText: string
    small: boolean
}
const PostButton = ({btnText, small}:Btn) => {
    return (
        <div>
            <Button className='postBtn'> <span className='PostbtnText'>{btnText}</span></Button>
        </div>
    )
}

export default PostButton
