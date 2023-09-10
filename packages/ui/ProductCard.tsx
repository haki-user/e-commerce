import React from 'react';
import './productCard.css';

export const ProductCard: React.FC<{ img:string, name:string, description: string, price:number, rest?:any}> = ({ img, name, description, price, rest}) => {
    return (
        <div className="product-card" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            padding: ".6rem",
            margin: 0,
            width: "18vw",
            height: "32vw",
            overflow: "hidden",
            ...rest
        }}>
            <img src={img} alt="yede" style={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
                minHeight: "80%",
                margin: 0
            }}/>
            <a className="productCard-title"style={{
                width: "100%",
            }}>
                {name}
            </a>
            <p className="productCard-description"style={{
                width: "100%",
            }}>
                {description}
            </p>
            <a className="productCard-price">
                ₹{price}
            </a>
        </div>
    )
}