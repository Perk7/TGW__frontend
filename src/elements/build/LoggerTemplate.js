import React from 'react'

export default function LoggerTemplate(props) {
    return (
        <div style={props.style ?? {}} className='login__form-block__logger'>{props.text}</div>
    )
}
