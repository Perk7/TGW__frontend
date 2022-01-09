import React from 'react'

export default React.forwardRef(function FormTemplate(props, ref) {
    return (
        <div className='login__form-block'>
                <form onSubmit={event => {
                    event.preventDefault()
                    props.submitFunction()
                }}>
                    {props.fields}
                    <button className='login__form-block__submit' type='submit' ref={ref ?? null} >{props.submitBtnText}</button>
                </form>
        </div>
    )
})