import React from 'react';

interface IFError {
    message?: any,
    state?: any
}
const Error = ({ message, state }: IFError) => {
    
    return (
        <>
            <div className="alert alert-danger" role="alert">{message}</div>
        </>
    )
}

export default Error