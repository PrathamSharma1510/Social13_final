import clsx from 'clsx'
import React from 'react'
import SwitchCss from './switch.module.css'

const Switch = () => {
    return (
        <div>
            <label className={SwitchCss.switch}>
                <input type="checkbox" />
            <span className={clsx(SwitchCss.slider , SwitchCss.round)}></span>
            </label>

        </div>
    )
}

export default Switch
