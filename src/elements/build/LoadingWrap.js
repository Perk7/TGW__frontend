import React from 'react';
import LoadingScreen from 'react-loading-screen';

export default function LoadingWrap(props) {
    return (
        <LoadingScreen
            loading={props.loading}
            bgColor='#000'
            spinnerColor='#FFF'
            textColor='#FFF'
            text={props.text} >
            {props.children}
        </LoadingScreen>
    )
}
