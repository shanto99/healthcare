import React from 'react';

interface IFSuccess {
    message?: any
}
const Success = ({ message }: IFSuccess) => {
    return (
        <>
            <div className="alert alert-success" role="alert">{message}</div>
        </>
    )
}

export default Success