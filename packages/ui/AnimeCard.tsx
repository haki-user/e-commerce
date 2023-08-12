// card contains image, on image we show product name, price, and add to cart button
// write code here to make card
import React from 'react';

export const AnimeCard:React.FC<{img: string, title: string, description: string, rest?: any}> = ({ img, title, description, rest})  => {
    return (
        // card contains image, on image we show product name, price, and add to cart button, write code here to make card, fix the css for title and description to be on top of image and not below it
        <div className="card" style={{width: "max-content",
        position: "relative",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        ...rest}}>
            <img src={img} className="card-img" alt="..." style={{
                minWidth: "max-content",
                height: 250,
                objectFit:  "contain",

            }}/>
            <div className="card-text" style={{
                color: "black",
                position: "absolute",
                bottom: "0",
                boxSizing: "border-box",
                backgroundImage: "linear-gradient(to top, rgba(255,255,255,0.8), rgba(255,255,255,0))",
                width: "100%",
            }}>
                <h5 className="card-title" style={{

                }}>{title}</h5>
                <p className="card-text" style={{
                }}>{description}</p>
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div>
        </div>    
    );
}