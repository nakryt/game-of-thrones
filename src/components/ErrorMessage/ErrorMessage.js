import React from 'react'
import './ErrorMessage.css'
import img from './Error.jpg'

const ErrorMessage = props => {

    return (
        <div className="ErrorMain">
            <img src={img} alt="Error"/>
            <span>
                Something went wrong...
            </span>
        </div>
    )
};

export default ErrorMessage;