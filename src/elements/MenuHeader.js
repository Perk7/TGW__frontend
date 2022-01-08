import React from 'react'
import { Link } from "react-router-dom";

export default React.forwardRef(function MenuHeader(props, ref) {
        return (
            <header className='side-header'>
                <Link to={'/home'} className='header__btn_back' ref={ref}>←</Link>
                <h1 className='side-heading'>{props.header}</h1>
            </header>
        )
    })
