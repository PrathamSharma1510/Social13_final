import clsx from 'clsx';
import React, { ButtonHTMLAttributes } from 'react'
import { Button } from 'react-bootstrap';
import './button.css';

interface BtnPurpose extends ButtonHTMLAttributes<HTMLButtonElement>{
    btnPurpose:string
    onClick?: any
    full?:boolean
    className?:string
    arrow?:boolean
}

const ButtonItself = ({btnPurpose, onClick, full, className, arrow}: BtnPurpose) => {
    return (
        <div className={clsx('d-flex justify-content-center', full && 'w-100')}>
            <Button onClick={onClick} type='submit' className={clsx(' buttonItself', className, full&& 'w-100')}>{btnPurpose} {arrow && <i className="bi bi-arrow-right"></i>}</Button>
        </div>
    )
}

export default ButtonItself;

