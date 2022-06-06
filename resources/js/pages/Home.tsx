import React from "react";
import Sidebar from "../components/layouts/Sidebar";

const Home = () => {
    
    return (
        <div className="row grow">
            <Sidebar />
            <div className="main col-10 h-100 py-3">
                <div className="container">
                    <div className="row">
                       <h1>Welcome to dashboard!</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;