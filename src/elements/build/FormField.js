import React from 'react'
import {offBoard, onBoard} from "../../otherFunctions";

export default React.forwardRef(function FormField(props, ref) {
    return (
        <input className='login__form-block__input' onBlur={offBoard} onFocus={onBoard} autoComplete="off" required
            ref={ref} {...props} />
    )
})
