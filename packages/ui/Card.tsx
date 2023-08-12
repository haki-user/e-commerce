import React from 'react';
import './card.css';

export const Card: React.FC<{  text?: {title: string, textClass?:string, description: string}, img: string, rest?:any }> = ({ text, img, rest={ width:"47vw", height: "31vw"} }) => {
    const {title, textClass, description} = {title:"", textClass:" ", description:"", ...text};
    console.log(rest);
    // boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",

    return (
        
        <div className="card" style={{
                position: "relative",
                boxSizing: "border-box",
                ...rest
            }}>
            <img src={img} className="card-img" alt="..." style={{
                width: "100%",
                height: "100%",
                objectFit: "fill"
            }} />
            <div className={textClass || "card-text"}>
                <h5 className="card-title" style={{
                }}>{title}</h5>
                <p className="card-description" style={{
                }}>{description}</p>
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div>
        </div>
    )
}