import React from 'react';
import { LoginCard } from 'ui';

export const Login:React.FC = () => {
    return (
        <div style={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                position: "absolute",
                top: 10,
            }}>
            <LoginCard />
            </div>
        </div>
    )
}