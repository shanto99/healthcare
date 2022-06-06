import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/layouts/Sidebar";
import { userGetRequestAction } from "./redux/user.actions";

const User = () => {
    
    const userStateData = useSelector((state: any) => state.productState);

    const dispatch: any = useDispatch();

    useEffect(() => {
        dispatch(userGetRequestAction());
    }, [])

    return (
        <>
        <div className="row grow">
            <Sidebar />
            <div className="main col-10 h-100 py-3">
                <div className="container">
                    <div className="row">
                       <h1>This is content section</h1>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default User;