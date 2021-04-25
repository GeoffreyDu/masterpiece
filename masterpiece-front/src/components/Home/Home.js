import React from "react";
import labels from "../../config/config"
import './home.css'

// Homepage with little animation
const Home = () =>{
    return(
    <div className="divBackground">
        <div className="title">
            <h1>Famil'Ink</h1>
            <h2><span id="subtitle">{labels.slogan}</span>
                <div className="loading">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </h2>
        </div>
    </div>
    )
}

export default Home;